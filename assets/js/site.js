/*
 * SAYT ÜZRƏ ORTAQ NAVİQASİYA MƏNTİQİ
 * ================================================================
 * Bu fayl SITE_COUNTRIES massivini (countries-data.js) oxuyaraq:
 *   1) Header-dəki "Ölkə seç" açılan siyahısını (listbox + axtarış),
 *   2) Səhifələrdəki tam "İnteraktiv Xəritələr" siyahısını (listbox + axtarış)
 * qurur. Hər hansı bir ölkə countries-data.js-ə əlavə olunanda,
 * bu fayla toxunmadan hər iki yer avtomatik yenilənir.
 *
 * Hər səhifə aşağıdakı iki qlobal dəyişəni özündə təyin etməlidir:
 *   window.SITE_BASE      – bu səhifədən sayt kökünə qədər olan yol
 *                            (index.html üçün "", countries/ altı üçün "../")
 *   window.CURRENT_COUNTRY – bu səhifənin ölkə id-si (index.html üçün null)
 */

(function () {

    const BASE = window.SITE_BASE || "";
    const CURRENT = window.CURRENT_COUNTRY || null;

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
            html += `<a href="${BASE}index.html#xeritelor">İnteraktiv Xəritələr</a>`;
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
        document.querySelectorAll(".nav-links a[data-nav]").forEach(a => {
            const isMaps = a.dataset.nav === "maps";
            if (isMaps) a.classList.add("current");
        });
    }

    document.addEventListener("DOMContentLoaded", function () {
        buildSwitcher();
        buildFullListbox();
        buildBreadcrumb();
        markCurrentNav();
    });

})();
