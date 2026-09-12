/*
 * ÖLKƏ REYESTRİ
 * ================================================================
 * Saytdakı bütün ölkə xəritələrinin siyahısı bu fayldan idarə olunur.
 *
 * Yeni ölkə xəritəsi hazır olduqda, sadəcə bu massivə YENİ BİR OBYEKT
 * əlavə et — həm ana səhifədəki siyahı (listbox), həm hər səhifənin
 * başlığındakı "ölkə dəyişdir" menyusu avtomatik yenilənəcək.
 *
 * Sahələr:
 *   id      – unikal id (kiçik hərflə, boşluqsuz)
 *   name    – ekranda görünən ad (Azərbaycan əlifbası ilə)
 *   flag    – bayraq emoji
 *   url     – sayt kökündən (repo root) etibarən yol, məs: "countries/azerbaijan.html"
 *   regions – inzibati ərazi sayı (məlum deyilsə null)
 *   status  – "ready"  → xəritə hazırdır, klikləmək olar
 *             "soon"   → hələ hazır deyil, siyahıda görünür amma klik olunmur
 */

const SITE_COUNTRIES = [
    {
        id: "azerbaijan",
        name: "Azərbaycan",
        flag: "🇦🇿",
        url: "countries/azerbaijan.html",
        regions: 77,
        status: "ready"
    },
    {
        id: "georgia",
        name: "Gürcüstan",
        flag: "🇬🇪",
        url: "countries/georgia.html",
        regions: null,
        status: "soon"
    },
    {
        id: "turkey",
        name: "Türkiyə",
        flag: "🇹🇷",
        url: "countries/turkey.html",
        regions: 81,
        status: "soon"
    },
    {
        id: "iran",
        name: "İran",
        flag: "🇮🇷",
        url: "countries/iran.html",
        regions: null,
        status: "soon"
    },
    {
        id: "russia",
        name: "Rusiya",
        flag: "🇷🇺",
        url: "countries/russia.html",
        regions: null,
        status: "soon"
    }
];
