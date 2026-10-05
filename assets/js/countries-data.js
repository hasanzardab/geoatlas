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
        regions: 12,
        status: "ready"
    },
    {
        id: "turkey",
        name: "Türkiyə",
        flag: "🇹🇷",
        url: "countries/turkey.html",
        regions: 81,
        status: "ready"
    },
    {
        id: "iran",
        name: "İran",
        flag: "🇮🇷",
        url: "countries/iran.html",
        regions: 31,
        status: "ready"
    },
    {
        id: "russia",
        name: "Rusiya",
        flag: "🇷🇺",
        url: "countries/russia.html",
        regions: 83,
        status: "ready"
    }
];


/*
 * XƏRİTƏ SİYAHISI (mövzu xəritələri)
 * ================================================================
 * Ana səhifənin başlığındakı sağ küncdə "🗺️ Xəritələr" açılan siyahısı
 * bu massivdən qurulur. Yeni xəritə əlavə etmək üçün sadəcə YENİ BİR
 * OBYEKT əlavə et. Xəritə faylları "countries" qovluğunda saxlanılır.
 *
 * Sahələr:
 *   id      – unikal id
 *   name    – ekranda görünən ad
 *   icon    – emoji
 *   desc    – qısa izah (siyahıda ad altında görünür)
 *   url     – sayt kökündən yol, məs: "countries/anamorfoz.html"
 *   status  – "ready" | "soon"
 */

const SITE_MAPS = [
    {
        id: "anamorfoz",
        name: "Anamorfoz xəritə",
        icon: "📊",
        desc: "Sənaye, əhali, kənd təsərrüfatı, məşğulluq",
        url: "countries/az-iqtisadi-anamorfoz.html",
        status: "ready"
    },
    {
        id: "faydali-qazinti",
        name: "Faydalı qazıntı xəritəsi",
        icon: "⛏️",
        desc: "Rayonlar üzrə yataqlar",
        url: "countries/az-faydali-qazinti.html",
        status: "ready"
    }
    /* Yeni xəritə üçün nümunə (vergülü yadda saxla):
    ,{
        id: "iqlim",
        name: "İqlim xəritəsi",
        icon: "🌦️",
        desc: "İqlim tipləri",
        url: "countries/iqlim.html",
        status: "soon"
    }
    */
];
