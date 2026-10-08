/*
 * SAYT ÜZRƏ ORTAQ NAVİQASİYA MƏNTİQİ
 * ================================================================
 * Bu fayl SITE_COUNTRIES massivini (countries-data.js) oxuyaraq:
 *   1) Header-dəki "Ölkə seç" açılan siyahısını (listbox + axtarış),
 *   2) Səhifələrdəki tam "İnteraktiv Xəritələr" siyahısını (listbox + axtarış)
 * qurur. Hər hansı bir ölkə countries-data.js-ə əlavə olunanda,
 * bu fayla toxunmadan hər iki yer avtomatik yenilənir.
 *
 * Əlavə olaraq SITE_MENU massivindən (countries-data.js):
 *   3) Yuxarı əsas menyunu (açılan alt menyularla) bütün səhifələrdə qurur,
 *   4) Ana səhifədəki bölmə kartlarını (#homeSections) qurur,
 *   5) Öz başlığı olmayan tam ekran səhifələrdə (simulyator, tapmaca)
 *      kiçik üzən menyu düyməsi göstərir (window.SITE_MINI = true).
 *
 * Hər səhifə aşağıdakı iki qlobal dəyişəni özündə təyin etməlidir:
 *   window.SITE_BASE      – bu səhifədən sayt kökünə qədər olan yol
 *                            (index.html üçün "", countries/ altı üçün "../")
 *   window.CURRENT_COUNTRY – bu səhifənin ölkə id-si (index.html üçün null)
 */

(function () {

    const BASE = window.SITE_BASE || "";
    const CURRENT = window.CURRENT_COUNTRY || null;

    /* ---------------------------------------------------------
       0) GECƏ / GÜNDÜZ REJİMİ
    --------------------------------------------------------- */

    const THEME_KEY = "geoatlas-theme";

    function getStoredTheme() {
        try {
            return localStorage.getItem(THEME_KEY);
        } catch (e) {
            return null;
        }
    }

    function storeTheme(theme) {
        try {
            localStorage.setItem(THEME_KEY, theme);
        } catch (e) {
            /* localStorage əlçatan deyilsə (məs. private mode), sakitcə keç */
        }
    }

    function applyTheme(theme) {
        document.documentElement.setAttribute("data-theme", theme);
        const btn = document.getElementById("themeToggle");
        if (btn) {
            btn.textContent = theme === "light" ? "🌙" : "☀️";
            btn.setAttribute(
                "aria-label",
                theme === "light" ? "Gecə rejiminə keç" : "Gündüz rejiminə keç"
            );
        }
    }

    function buildThemeToggle() {

        const mount = document.querySelector(".header-right");
        if (!mount) return;

        const current = document.documentElement.getAttribute("data-theme") || "light";

        const btn = document.createElement("button");
        btn.type = "button";
        btn.id = "themeToggle";
        btn.className = "theme-toggle";
        btn.textContent = current === "light" ? "🌙" : "☀️";
        btn.setAttribute(
            "aria-label",
            current === "light" ? "Gecə rejiminə keç" : "Gündüz rejiminə keç"
        );

        btn.addEventListener("click", function () {
            const now = document.documentElement.getAttribute("data-theme") || "light";
            const next = now === "light" ? "dark" : "light";
            applyTheme(next);
            storeTheme(next);
        });

        mount.insertBefore(btn, mount.firstChild);

    }

    function resolveUrl(country) {
        if (country.status !== "ready") return "#";
        return BASE + country.url;
    }

    function matches(country, query) {
        if (!query) return true;
        return country.name.toLowerCase().includes(query.toLowerCase());
    }

    /* ---------------------------------------------------------
       1) HEADER "ÖLKƏ SEÇ" AÇILAN SİYAHISI (compact switcher)
    --------------------------------------------------------- */

    function buildSwitcher() {

        const mount = document.getElementById("countrySwitcher");
        if (!mount) return;

        mount.innerHTML = `
            <div class="switcher" id="switcher">
                <button type="button" class="switcher-btn" id="switcherBtn">
                    <span>🌍 Ölkə seç</span>
                    <span class="chev">▾</span>
                </button>
                <div class="switcher-panel">
                    <div class="switcher-search">
                        <input type="text" id="switcherSearch" placeholder="Ölkə axtar..." autocomplete="off">
                    </div>
                    <div class="switcher-list" id="switcherList"></div>
                </div>
            </div>
        `;

        const switcherEl = document.getElementById("switcher");
        const btn = document.getElementById("switcherBtn");
        const searchInput = document.getElementById("switcherSearch");
        const list = document.getElementById("switcherList");

        function renderList(query) {

            const items = SITE_COUNTRIES.filter(c => matches(c, query));

            if (items.length === 0) {
                list.innerHTML = `<div class="switcher-empty">Nəticə tapılmadı</div>`;
                return;
            }

            list.innerHTML = items.map(c => {
                const isCurrent = c.id === CURRENT;
                const isReady = c.status === "ready";
                const badge = isCurrent ? "Baxılır" : (isReady ? "Hazır" : "Tezliklə");
                const cls = [
                    "switcher-item",
                    isCurrent ? "current" : "",
                    (!isReady && !isCurrent) ? "is-disabled" : ""
                ].join(" ").trim();

                return `
                    <a class="${cls}" href="${resolveUrl(c)}">
                        <span class="flag">${c.flag}</span>
                        <span class="meta">
                            <strong>${c.name}</strong>
                            <small>${c.regions ? c.regions + " ərazi" : "Hazırlanır"}</small>
                        </span>
                        <span class="badge">${badge}</span>
                    </a>
                `;
            }).join("");
        }

        renderList("");

        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            document.querySelectorAll(".switcher.open").forEach(el => {
                if (el !== switcherEl) el.classList.remove("open");
            });
            switcherEl.classList.toggle("open");
            if (switcherEl.classList.contains("open")) {
                searchInput.focus();
            }
        });

        searchInput.addEventListener("input", function () {
            renderList(this.value.trim());
        });

        searchInput.addEventListener("click", (e) => e.stopPropagation());

        document.addEventListener("click", () => {
            switcherEl.classList.remove("open");
        });
    }

    /* ---------------------------------------------------------
       1b) HEADER "XƏRİTƏLƏR" AÇILAN SİYAHISI (SITE_MAPS)
    --------------------------------------------------------- */

    function buildMapsMenu() {

        const mount = document.getElementById("mapsSwitcher");
        if (!mount || typeof SITE_MAPS === "undefined") return;

        mount.innerHTML = `
            <div class="switcher" id="mapsMenu">
                <button type="button" class="switcher-btn" id="mapsMenuBtn">
                    <span>🗺️ Xəritələr</span>
                    <span class="chev">▾</span>
                </button>
                <div class="switcher-panel">
                    <div class="switcher-search">
                        <input type="text" id="mapsMenuSearch" placeholder="Xəritə axtar..." autocomplete="off">
                    </div>
                    <div class="switcher-list" id="mapsMenuList"></div>
                </div>
            </div>
        `;

        const menuEl = document.getElementById("mapsMenu");
        const btn = document.getElementById("mapsMenuBtn");
        const searchInput = document.getElementById("mapsMenuSearch");
        const list = document.getElementById("mapsMenuList");

        function renderList(query) {

            const q = (query || "").toLowerCase();
            const items = SITE_MAPS.filter(m => !q || m.name.toLowerCase().includes(q));

            if (items.length === 0) {
                list.innerHTML = `<div class="switcher-empty">Nəticə tapılmadı</div>`;
                return;
            }

            list.innerHTML = items.map(m => {
                const isReady = m.status === "ready";
                const href = isReady ? BASE + m.url : "#";
                return `
                    <a class="switcher-item ${isReady ? "" : "is-disabled"}" href="${href}">
                        <span class="flag">${m.icon}</span>
                        <span class="meta">
                            <strong>${m.name}</strong>
                            <small>${m.desc || ""}</small>
                        </span>
                        <span class="badge">${isReady ? "Hazır" : "Tezliklə"}</span>
                    </a>
                `;
            }).join("");
        }

        renderList("");

        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            /* digər açıq menyuları bağla */
            document.querySelectorAll(".switcher.open").forEach(el => {
                if (el !== menuEl) el.classList.remove("open");
            });
            menuEl.classList.toggle("open");
            if (menuEl.classList.contains("open")) searchInput.focus();
        });

        searchInput.addEventListener("input", function () {
            renderList(this.value.trim());
        });

        searchInput.addEventListener("click", (e) => e.stopPropagation());

        document.addEventListener("click", () => {
            menuEl.classList.remove("open");
        });
    }

    /* ---------------------------------------------------------
       2) TAM SİYAHI (listbox) — ana səhifə və "digər ölkələr"
    --------------------------------------------------------- */

    function buildFullListbox() {

        const mount = document.getElementById("countryListbox");
        if (!mount) return;

        mount.innerHTML = `
            <div class="listbox-search-wrap">
                <input type="text" id="listboxSearch" placeholder="🔎 Ölkə axtar..." autocomplete="off">
            </div>
            <div class="listbox" id="listboxItems" style="margin-top:16px;"></div>
        `;

        const searchInput = document.getElementById("listboxSearch");
        const items = document.getElementById("listboxItems");

        function renderRows(query) {

            const rows = SITE_COUNTRIES.filter(c => matches(c, query));

            if (rows.length === 0) {
                items.innerHTML = `<div class="listbox-empty">Uyğun ölkə tapılmadı</div>`;
                return;
            }

            items.innerHTML = rows.map(c => {
                const isCurrent = c.id === CURRENT;
                const isReady = c.status === "ready";
                const badge = isCurrent ? "Baxılır" : (isReady ? "Hazırdır" : "Tezliklə");
                const cls = [
                    "listbox-row",
                    isCurrent ? "current" : "",
                    (!isReady && !isCurrent) ? "is-disabled" : ""
                ].join(" ").trim();

                return `
                    <a class="${cls}" href="${resolveUrl(c)}">
                        <span class="flag">${c.flag}</span>
                        <span class="meta">
                            <strong>${c.name}</strong>
                            <small>${c.regions ? c.regions + " inzibati ərazi" : "Xəritə hazırlanır"}</small>
                        </span>
                        <span class="badge">${badge}</span>
                        <span class="arrow">→</span>
                    </a>
                `;
            }).join("");
        }

        renderRows("");

        searchInput.addEventListener("input", function () {
            renderRows(this.value.trim());
        });
    }

    /* ---------------------------------------------------------
       3) BREADCRUMB (cari ölkəyə görə avtomatik qurulur)
    --------------------------------------------------------- */

    function buildBreadcrumb() {

        const mount = document.getElementById("breadcrumb");
        if (!mount) return;

        const country = SITE_COUNTRIES.find(c => c.id === CURRENT);

        let html = `<a href="${BASE}index.html">Ana səhifə</a>`;
        html += `<span class="sep">/</span>`;

        if (country) {
            html += `<a href="${BASE}index.html#xeriteler">İnteraktiv Xəritələr</a>`;
            html += `<span class="sep">/</span>`;
            html += `<span class="current">${country.name}</span>`;
        } else {
            html += `<span class="current">İnteraktiv Xəritələr</span>`;
        }

        mount.innerHTML = html;
    }

    /* ---------------------------------------------------------
       4) NAV LİNKLƏRİNDƏ CARİ SƏHİFƏNİ İŞARƏLƏ
    --------------------------------------------------------- */

    function markCurrentNav() {
        /* "İnteraktiv Xəritələr" yalnız konkret bir ölkə xəritəsinə
           baxılarkən (CURRENT təyin olunubsa) aktiv göstərilir — ana
           səhifədə bu keçid sadəcə həmin səhifə daxilində bir bölməyə
           keçiddir, ona görə "seçili" kimi işarələnməməlidir. */
        document.querySelectorAll(".nav-links a[data-nav]").forEach(a => {
            const isMaps = a.dataset.nav === "maps";
            if (isMaps && CURRENT) a.classList.add("current");
        });
    }


    /* ---------------------------------------------------------
       5) ƏSAS MENYU (SITE_MENU) — açılan alt menyularla
    --------------------------------------------------------- */

    function esc(str) {
        return String(str == null ? "" : str)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;");
    }

    function normPath(p) {
        return p.replace(/\/index\.html$/, "/").replace(/\/+$/, "/");
    }

    function samePage(url) {
        try {
            const target = new URL(BASE + String(url).split("#")[0], window.location.href);
            return normPath(target.pathname) === normPath(window.location.pathname);
        } catch (e) {
            return false;
        }
    }

    function isReady(item) {
        return !item.status || item.status === "ready";
    }

    /* Bölmənin alt siyahısı: [{title?, rows:[{name, icon, desc, url, ready, current}]}] */
    function getSectionGroups(section) {

        if (section.source === "maps") {
            const groups = [];
            if (typeof SITE_COUNTRIES !== "undefined") {
                groups.push({
                    title: "Ölkə xəritələri",
                    rows: SITE_COUNTRIES.map(c => ({
                        name: c.name,
                        icon: c.flag,
                        desc: c.regions ? c.regions + " inzibati ərazi" : "Hazırlanır",
                        url: c.url,
                        ready: c.status === "ready",
                        current: c.id === CURRENT
                    }))
                });
            }
            if (typeof SITE_MAPS !== "undefined") {
                groups.push({
                    title: "Mövzu xəritələri",
                    rows: SITE_MAPS.map(m => ({
                        name: m.name,
                        icon: m.icon,
                        desc: m.desc || "",
                        url: m.url,
                        ready: m.status === "ready",
                        current: samePage(m.url)
                    }))
                });
            }
            return groups;
        }

        if (section.items && section.items.length) {
            return [{
                rows: section.items.map(it => ({
                    name: it.name,
                    icon: it.icon || "",
                    desc: it.desc || "",
                    url: it.url,
                    ready: isReady(it),
                    current: samePage(it.url)
                }))
            }];
        }

        return [];
    }

    function sectionIsCurrent(section) {
        if (section.id === "home") {
            return !CURRENT && samePage("index.html") && !window.SITE_MINI;
        }
        if (section.source === "maps") {
            if (CURRENT) return true;
            return getSectionGroups(section).some(g => g.rows.some(r => r.current));
        }
        if (section.items && section.items.some(it => samePage(it.url))) return true;
        if (section.url.indexOf("#") === -1 && samePage(section.url)) return true;
        return false;
    }

    function panelRowHtml(r) {
        const cls = ["nav-dd-item", r.current ? "current" : "", r.ready ? "" : "is-disabled"].join(" ").trim();
        const href = r.ready ? esc(BASE + r.url) : "#";
        const badge = r.current ? "Baxılır" : (r.ready ? "" : "Tezliklə");
        return `
            <a class="${cls}" href="${href}">
                <span class="nav-dd-ico">${esc(r.icon)}</span>
                <span class="nav-dd-meta">
                    <strong>${esc(r.name)}</strong>
                    ${r.desc ? `<small>${esc(r.desc)}</small>` : ""}
                </span>
                ${badge ? `<span class="nav-dd-badge">${badge}</span>` : ""}
            </a>`;
    }

    function buildMainNav() {

        if (typeof SITE_MENU === "undefined") return;

        const nav = document.querySelector("header .nav-links");
        if (!nav) return;

        /* Mobil menyu düyməsi hər səhifədə olsun (əvvəl yalnız ana səhifədə idi) */
        const header = nav.closest("header");
        if (header && !document.getElementById("mobileMenuToggle")) {
            const cb = document.createElement("input");
            cb.type = "checkbox";
            cb.id = "mobileMenuToggle";
            cb.className = "mobile-menu-toggle";
            const lb = document.createElement("label");
            lb.setAttribute("for", "mobileMenuToggle");
            lb.className = "mobile-menu-btn";
            lb.setAttribute("aria-label", "Menyunu aç/bağla");
            lb.textContent = "☰";
            header.insertBefore(cb, nav);
            header.insertBefore(lb, nav);
        }

        const html = SITE_MENU.map(section => {

            const current = sectionIsCurrent(section);
            const groups = getSectionGroups(section);

            if (!groups.length) {
                return `<a class="nav-top ${current ? "current" : ""}" href="${esc(BASE + section.url)}">${esc(section.label)}</a>`;
            }

            const wide = groups.length > 1 ? " nav-dd-wide" : "";

            const panel = groups.map(g => `
                <div class="nav-dd-group">
                    ${g.title ? `<div class="nav-dd-title">${esc(g.title)}</div>` : ""}
                    ${g.rows.map(panelRowHtml).join("")}
                </div>`).join("");

            return `
                <div class="nav-dd${wide}" data-id="${esc(section.id)}">
                    <div class="nav-dd-head">
                        <a class="nav-top ${current ? "current" : ""}" href="${esc(BASE + section.url)}">${esc(section.label)}</a>
                        <button type="button" class="nav-dd-toggle" aria-label="${esc(section.label)} alt menyusunu aç" aria-expanded="false">▾</button>
                    </div>
                    <div class="nav-dd-panel">${panel}</div>
                </div>`;
        }).join("");

        const ext = (typeof SITE_EXTERNAL !== "undefined" && SITE_EXTERNAL)
            ? `<a href="${esc(SITE_EXTERNAL.url)}" target="_blank" rel="noopener noreferrer" class="youtube-btn">▶ ${esc(SITE_EXTERNAL.label)}</a>`
            : "";

        nav.innerHTML = html + ext;

        /* Açma/bağlama davranışı */
        const dds = Array.from(nav.querySelectorAll(".nav-dd"));

        function closeAll(except) {
            dds.forEach(dd => {
                if (dd !== except) {
                    dd.classList.remove("open");
                    const t = dd.querySelector(".nav-dd-toggle");
                    if (t) t.setAttribute("aria-expanded", "false");
                }
            });
        }

        /* Geniş panel ekranın sağından çıxırsa, sola çək */
        function clampPanel(dd) {
            const panel = dd.querySelector(".nav-dd-panel");
            if (!panel) return;
            panel.style.left = "";
            if (window.innerWidth <= 900) return;
            const r = panel.getBoundingClientRect();
            if (r.width === 0) return;
            const over = r.right - (window.innerWidth - 12);
            if (over > 0) panel.style.left = (-over) + "px";
        }

        dds.forEach(dd => {
            const toggle = dd.querySelector(".nav-dd-toggle");
            toggle.addEventListener("click", function (e) {
                e.stopPropagation();
                const willOpen = !dd.classList.contains("open");
                closeAll(dd);
                dd.classList.toggle("open", willOpen);
                toggle.setAttribute("aria-expanded", willOpen ? "true" : "false");
                if (willOpen) clampPanel(dd);
            });
            dd.addEventListener("mouseenter", function () {
                window.requestAnimationFrame(function () { clampPanel(dd); });
            });
            dd.addEventListener("focusin", function () {
                window.requestAnimationFrame(function () { clampPanel(dd); });
            });
        });

        document.addEventListener("click", function (e) {
            if (!nav.contains(e.target)) closeAll(null);
        });

        document.addEventListener("keydown", function (e) {
            if (e.key === "Escape") closeAll(null);
        });
    }

    /* ---------------------------------------------------------
       6) ANA SƏHİFƏDƏ BÖLMƏ KARTLARI (#homeSections)
    --------------------------------------------------------- */

    function buildHomeSections() {

        const mount = document.getElementById("homeSections");
        if (!mount || typeof SITE_MENU === "undefined") return;

        const blocks = SITE_MENU.map(section => {

            const groups = getSectionGroups(section);
            if (!groups.length) return "";

            let rows;
            if (section.source === "maps") {
                /* Ölkə xəritələri aşağıdakı axtarışlı siyahıda var — burada yalnız mövzu xəritələri */
                const thematic = groups.find(g => g.title === "Mövzu xəritələri");
                rows = thematic ? thematic.rows : [];
                const countryCount = (typeof SITE_COUNTRIES !== "undefined")
                    ? SITE_COUNTRIES.filter(c => c.status === "ready").length : 0;
                rows = [{
                    name: "Ölkə xəritələri",
                    icon: "🌍",
                    desc: countryCount + " ölkənin inzibati bölgüsü",
                    url: "index.html#xeriteler",
                    ready: true,
                    current: false
                }].concat(rows);
            } else {
                rows = groups[0].rows;
            }

            const cards = rows.map(r => {
                const cls = ["home-card", r.ready ? "" : "is-disabled"].join(" ").trim();
                const href = r.ready ? esc(BASE + r.url) : "#";
                return `
                    <a class="${cls}" href="${href}">
                        <span class="home-card-ico">${esc(r.icon)}</span>
                        <strong>${esc(r.name)}</strong>
                        <small>${esc(r.desc)}</small>
                        ${r.ready ? "" : `<span class="home-card-badge">Tezliklə</span>`}
                    </a>`;
            }).join("");

            return `
                <section class="home-block" id="sec-${esc(section.id)}">
                    <div class="home-block-head">
                        <div>
                            <h2>${esc(section.icon || "")} ${esc(section.label)}</h2>
                            ${section.desc ? `<p>${esc(section.desc)}</p>` : ""}
                        </div>
                        <a class="home-block-more" href="${esc(BASE + section.url)}">Hamısı →</a>
                    </div>
                    <div class="home-card-grid">${cards}</div>
                </section>`;
        }).join("");

        mount.innerHTML = blocks;
    }

    /* ---------------------------------------------------------
       7) KİÇİK ÜZƏN MENYU — öz başlığı olmayan tam ekran səhifələr üçün
    --------------------------------------------------------- */

    function buildMiniNav() {

        if (!window.SITE_MINI || typeof SITE_MENU === "undefined") return;
        if (document.getElementById("geoMiniNav")) return;

        const css = `
            #geoMiniNav{position:fixed;left:12px;bottom:12px;z-index:2147483000;font:13px/1.35 system-ui,-apple-system,"Segoe UI",sans-serif;color:#1b2430}
            #geoMiniNav *{box-sizing:border-box}
            #geoMiniNav .gm-btn{touch-action:none;user-select:none;-webkit-user-select:none;display:flex;align-items:center;gap:6px;height:38px;padding:0 13px;border-radius:999px;border:1px solid rgba(120,130,150,.35);background:rgba(255,255,255,.92);color:#1b2430;font:600 13px system-ui,sans-serif;cursor:pointer;box-shadow:0 4px 14px rgba(0,0,0,.18);backdrop-filter:blur(8px)}
            #geoMiniNav .gm-panel{display:none;position:absolute;left:0;bottom:46px;width:min(320px,calc(100vw - 24px));max-height:min(70vh,520px);overflow-y:auto;padding:8px;border-radius:16px;border:1px solid rgba(120,130,150,.3);background:#fff;box-shadow:0 18px 40px rgba(0,0,0,.28)}
            #geoMiniNav.open .gm-panel{display:block}
            #geoMiniNav.gm-down .gm-panel{bottom:auto;top:46px}
            #geoMiniNav.gm-rt .gm-panel{left:auto;right:0}
            @media(max-width:700px){
                #geoMiniNav{left:auto;right:10px;top:10px;bottom:auto}
                #geoMiniNav .gm-btn{width:38px;padding:0;justify-content:center;font-size:16px;opacity:.85}
                #geoMiniNav .gm-label{display:none}
            }
            #geoMiniNav .gm-sec{margin-bottom:4px}
            #geoMiniNav .gm-head,#geoMiniNav .gm-title{display:block;padding:8px 10px 4px;font-weight:700;font-size:11px;letter-spacing:.6px;text-transform:uppercase;color:#6b7686;text-decoration:none}
            #geoMiniNav .gm-link{display:flex;gap:9px;align-items:center;padding:8px 10px;border-radius:10px;color:#1b2430;text-decoration:none}
            #geoMiniNav .gm-link:hover{background:rgba(37,99,235,.09)}
            #geoMiniNav .gm-link.current{background:rgba(37,99,235,.15);font-weight:600}
            #geoMiniNav .gm-link.is-disabled{opacity:.4;pointer-events:none}
            #geoMiniNav .gm-home{font-weight:700}
            @media (prefers-color-scheme:dark){
                :root:not([data-theme="light"]) #geoMiniNav .gm-btn{background:rgba(27,34,43,.94);color:#e8edf3;border-color:rgba(255,255,255,.18)}
                :root:not([data-theme="light"]) #geoMiniNav .gm-panel{background:#1b222b;border-color:rgba(255,255,255,.14)}
                :root:not([data-theme="light"]) #geoMiniNav .gm-link{color:#e8edf3}
                :root:not([data-theme="light"]) #geoMiniNav .gm-head,:root:not([data-theme="light"]) #geoMiniNav .gm-title{color:#8b97a7}
            }
            :root[data-theme="dark"] #geoMiniNav .gm-btn{background:rgba(27,34,43,.94);color:#e8edf3;border-color:rgba(255,255,255,.18)}
            :root[data-theme="dark"] #geoMiniNav .gm-panel{background:#1b222b;border-color:rgba(255,255,255,.14)}
            :root[data-theme="dark"] #geoMiniNav .gm-link{color:#e8edf3}
            :root[data-theme="dark"] #geoMiniNav .gm-head,:root[data-theme="dark"] #geoMiniNav .gm-title{color:#8b97a7}
        `;

        const style = document.createElement("style");
        style.textContent = css;
        document.head.appendChild(style);

        const sections = SITE_MENU.map(section => {
            if (section.id === "home") {
                return `<div class="gm-sec"><a class="gm-link gm-home" href="${esc(BASE + section.url)}">🌍 GeoAtlas — ana səhifə</a></div>`;
            }
            const groups = getSectionGroups(section);
            if (!groups.length) {
                return `<div class="gm-sec"><a class="gm-link" href="${esc(BASE + section.url)}">${esc(section.label)}</a></div>`;
            }
            return `<div class="gm-sec"><a class="gm-head" href="${esc(BASE + section.url)}">${esc(section.label)}</a>` +
                groups.map(g => (g.title ? `<div class="gm-title">${esc(g.title)}</div>` : "") +
                    g.rows.map(r => `
                        <a class="gm-link ${r.current ? "current" : ""} ${r.ready ? "" : "is-disabled"}" href="${r.ready ? esc(BASE + r.url) : "#"}">
                            <span>${esc(r.icon)}</span><span>${esc(r.name)}</span>
                        </a>`).join("")
                ).join("") + `</div>`;
        }).join("");

        const box = document.createElement("div");
        box.id = "geoMiniNav";
        box.innerHTML = `
            <button type="button" class="gm-btn" aria-label="Sayt menyusu" aria-expanded="false">☰<span class="gm-label"> Menyu</span></button>
            <div class="gm-panel">${sections}</div>`;
        document.body.appendChild(box);

        const btn = box.querySelector(".gm-btn");

        /* Panelin açılma tərəfi düymənin ekrandakı yerinə görə seçilir */
        function placePanel() {
            const r = box.getBoundingClientRect();
            box.classList.toggle("gm-down", r.top + r.height / 2 < window.innerHeight / 2);
            box.classList.toggle("gm-rt", r.left + r.width / 2 > window.innerWidth / 2);
        }

        function setOpen(open) {
            if (open) placePanel();
            box.classList.toggle("open", open);
            btn.setAttribute("aria-expanded", open ? "true" : "false");
        }

        /* Düyməni sürüşdürmək olar (məs. simulyatorun idarə panelini örtürsə) */
        let startX = 0, startY = 0, baseL = 0, baseT = 0, moved = false, dragging = false;

        btn.addEventListener("pointerdown", function (e) {
            dragging = true;
            moved = false;
            startX = e.clientX;
            startY = e.clientY;
            const r = box.getBoundingClientRect();
            baseL = r.left;
            baseT = r.top;
            try { btn.setPointerCapture(e.pointerId); } catch (err) { /* sakitcə keç */ }
        });

        btn.addEventListener("pointermove", function (e) {
            if (!dragging) return;
            const dx = e.clientX - startX;
            const dy = e.clientY - startY;
            if (!moved && Math.abs(dx) + Math.abs(dy) < 8) return;
            moved = true;
            setOpen(false);
            const w = box.offsetWidth, h = box.offsetHeight;
            const left = Math.min(Math.max(4, baseL + dx), window.innerWidth - w - 4);
            const top = Math.min(Math.max(4, baseT + dy), window.innerHeight - h - 4);
            box.style.left = left + "px";
            box.style.top = top + "px";
            box.style.right = "auto";
            box.style.bottom = "auto";
        });

        function endDrag() { dragging = false; }
        btn.addEventListener("pointerup", endDrag);
        btn.addEventListener("pointercancel", endDrag);

        btn.addEventListener("click", function (e) {
            e.stopPropagation();
            if (moved) { moved = false; return; }
            setOpen(!box.classList.contains("open"));
        });

        document.addEventListener("click", function (e) {
            if (!box.contains(e.target)) setOpen(false);
        });
    }

    document.addEventListener("DOMContentLoaded", function () {
        buildThemeToggle();
        /* Köhnə ayrıca "Xəritələr" və "Ölkə seç" düymələri artıq əsas menyunun
           içindədir (buildMainNav). Funksiyalar saxlanılıb, istənilsə yenidən
           aktiv etmək olar: buildMapsMenu(); buildSwitcher(); */
        buildMainNav();
        buildHomeSections();
        buildFullListbox();
        buildBreadcrumb();
        markCurrentNav();
        buildMiniNav();
    });

})();