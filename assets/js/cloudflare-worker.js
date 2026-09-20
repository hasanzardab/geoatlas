/**
 * GeoAtlas — Sayt Statistikası Worker
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
