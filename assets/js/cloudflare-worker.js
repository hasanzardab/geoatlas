/**
 * cografiya.org — Sayt Statistikası Worker
 * ================================================================
 * Bu Worker sizin Cloudflare Web Analytics (RUM) məlumatınızı
 * GraphQL Analytics API vasitəsilə çəkir və saytınıza JSON kimi
 * qaytarır. API tokeni yalnız Worker-in "secret"lərində saxlanılır,
 * heç vaxt brauzerə göndərilmir — ona görə təhlükəsizdir.
 *
 * TƏLƏB OLUNAN SECRET/ENV DƏYİŞƏNLƏRİ (aşağıdakı README-yə bax):
 *   CF_API_TOKEN    – "Account Analytics: Read" icazəli API tokeni
 *   CF_ACCOUNT_TAG  – Cloudflare Hesab ID-niz
 *   CF_SITE_TAG     – Web Analytics saytının "Site tag" dəyəri
 *   ALLOWED_ORIGIN  – (məcburi deyil) yalnız bu domenə CORS icazəsi,
 *                      default "*" (hər yerdən açıla bilər)
 *
 * TEST SAYĞACI (KV):
 *   TEST_STATS      – KV namespace binding (Workers → Settings → Variables
 *                      → KV Namespace Bindings bölməsində əlavə edin)
 *
 *   Endpointlər:
 *     POST /track?test=sinaq1&action=start
 *     POST /track?test=sinaq1&action=complete&score=8&total=10&passed=1
 *     GET  /track            → bütün testlər üzrə cəmi ədədlər (JSON)
 */

const GRAPHQL_ENDPOINT = "https://api.cloudflare.com/client/v4/graphql";

// Nəticə neçə saniyə keşdə saxlansın (API-ni hər ziyarətdə vurmamaq üçün)
const CACHE_SECONDS = 300; // 5 dəqiqə

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders(env) });
    }

    // Test sayğacı endpoint-i (analytics keşindən ayrı saxlanılır,
    // çünki bu, canlı say olmalıdır, 5 dəqiqəlik keşdə yox)
    if (url.pathname === "/track") {
      return handleTrack(request, env);
    }

    // Keşi yoxla
    const cache = caches.default;
    const cacheKey = new Request(url.toString(), request);
    const cached = await cache.match(cacheKey);
    if (cached) return cached;

    try {
      const days = clampDays(url.searchParams.get("days"));
      const { since, until } = dateRange(days);

      const query = `
        query GetSiteStats($accountTag: string!, $siteTag: string!, $since: Date!, $until: Date!) {
          viewer {
            accounts(filter: { accountTag: $accountTag }) {
              rumPageloadEventsAdaptiveGroups(
                filter: { siteTag: $siteTag, date_geq: $since, date_leq: $until, bot: 0 }
                limit: 1
              ) {
                count
                sum { visits }
              }
            }
          }
        }
      `;

      const variables = {
        accountTag: env.CF_ACCOUNT_TAG,
        siteTag: env.CF_SITE_TAG,
        since,
        until,
      };

      const apiRes = await fetch(GRAPHQL_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${env.CF_API_TOKEN}`,
        },
        body: JSON.stringify({ query, variables }),
      });

      const json = await apiRes.json();

      if (json.errors && json.errors.length) {
        return jsonResponse({ error: json.errors[0].message }, 502, env);
      }

      const groups =
        json?.data?.viewer?.accounts?.[0]?.rumPageloadEventsAdaptiveGroups || [];

      const pageviews = groups.reduce((sum, g) => sum + (g.count || 0), 0);
      const visits = groups.reduce((sum, g) => sum + (g.sum?.visits || 0), 0);

      const payload = {
        pageviews,
        visits,
        rangeDays: days,
        since,
        until,
        updatedAt: new Date().toISOString(),
      };

      const response = jsonResponse(payload, 200, env, CACHE_SECONDS);
      ctx.waitUntil(cache.put(cacheKey, response.clone()));
      return response;
    } catch (err) {
      return jsonResponse({ error: String(err) }, 500, env);
    }
  },
};

// Bilinən test id-ləri — GET cavabında bütün siyahının həmişə görünməsi üçün.
// Yeni test əlavə etsəniz, bura da testId-ni əlavə edin (məcburi deyil,
// olmasa belə POST /track o testi avtomatik yaradacaq).
const KNOWN_TESTS = [
  "sinaq1", "sinaq2", "sinaq3", "sinaq4",
  "sinaq5", "sinaq6", "sinaq7", "sinaq8",
  "ksq", "bsq", "miq",
];

async function handleTrack(request, env) {
  if (!env.TEST_STATS) {
    return jsonResponse(
      { error: "TEST_STATS KV namespace bağlı deyil. Worker Settings → Bindings-dən əlavə edin." },
      500,
      env
    );
  }

  const url = new URL(request.url);

  if (request.method === "POST") {
    const testId = (url.searchParams.get("test") || "").trim();
    const action = (url.searchParams.get("action") || "").trim(); // "start" | "complete"

    if (!testId || !["start", "complete"].includes(action)) {
      return jsonResponse({ error: "test və ya action parametri yanlışdır" }, 400, env);
    }

    const key = `${action}:${testId}`;
    const current = parseInt(await env.TEST_STATS.get(key), 10) || 0;
    await env.TEST_STATS.put(key, String(current + 1));

    // "complete" hadisəsində keçid/kəsilmə sayını da ayrıca saxlayaq
    if (action === "complete") {
      const passed = url.searchParams.get("passed") === "1";
      const passKey = `${passed ? "passed" : "failed"}:${testId}`;
      const passCurrent = parseInt(await env.TEST_STATS.get(passKey), 10) || 0;
      await env.TEST_STATS.put(passKey, String(passCurrent + 1));
    }

    return jsonResponse({ ok: true, test: testId, action, count: current + 1 }, 200, env);
  }

  if (request.method === "GET") {
    // Bütün açarları oxu (test sayı az olduğu üçün tam siyahı çəkmək kifayətdir)
    const list = await env.TEST_STATS.list();
    const raw = {};
    for (const k of list.keys) {
      raw[k.name] = parseInt(await env.TEST_STATS.get(k.name), 10) || 0;
    }

    const testIds = new Set(KNOWN_TESTS);
    Object.keys(raw).forEach((k) => testIds.add(k.split(":")[1]));

    const perTest = {};
    let totalStarted = 0;
    let totalCompleted = 0;
    let totalPassed = 0;
    let totalFailed = 0;

    testIds.forEach((id) => {
      const started = raw[`start:${id}`] || 0;
      const completed = raw[`complete:${id}`] || 0;
      const passed = raw[`passed:${id}`] || 0;
      const failed = raw[`failed:${id}`] || 0;

      perTest[id] = { started, completed, passed, failed };

      totalStarted += started;
      totalCompleted += completed;
      totalPassed += passed;
      totalFailed += failed;
    });

    return jsonResponse(
      {
        totals: {
          started: totalStarted,
          completed: totalCompleted,
          passed: totalPassed,
          failed: totalFailed,
        },
        perTest,
        updatedAt: new Date().toISOString(),
      },
      200,
      env,
      60 // 60 saniyə keş — hər səhifə açılışında KV-yə yüklənməsin
    );
  }

  return jsonResponse({ error: "Dəstəklənməyən metod" }, 405, env);
}

function clampDays(raw) {
  const n = parseInt(raw, 10);
  if (!n || n < 1) return 30;
  return Math.min(n, 90); // RUM datası uzun müddət saxlanmır, 90 gündən çox mənasızdır
}

function dateRange(days) {
  const until = new Date();
  const since = new Date();
  since.setDate(since.getDate() - days);
  const fmt = (d) => d.toISOString().slice(0, 10); // YYYY-MM-DD
  return { since: fmt(since), until: fmt(until) };
}

function corsHeaders(env) {
  return {
    "Access-Control-Allow-Origin": env.ALLOWED_ORIGIN || "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

function jsonResponse(data, status, env, cacheSeconds) {
  const headers = {
    "Content-Type": "application/json",
    ...corsHeaders(env),
  };
  if (cacheSeconds) {
    headers["Cache-Control"] = `public, max-age=${cacheSeconds}`;
  }
  return new Response(JSON.stringify(data), { status, headers });
}
