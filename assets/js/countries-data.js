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


/*
 * ƏSAS MENYU (ana naviqasiya)
 * ================================================================
 * Saytın yuxarı menyusu və ana səhifədəki bölmə kartları bu massivdən
 * qurulur. Hər səhifədə ayrıca menyu yazmaq lazım deyil — yeni oyun,
 * simulyator və ya test əlavə etmək üçün sadəcə uyğun bölmənin
 * "items" siyahısına bir obyekt əlavə et.
 *
 * Bölmə sahələri:
 *   id     – unikal id
 *   label  – menyuda görünən ad
 *   icon   – emoji (ana səhifə kartlarında)
 *   url    – bölmənin ana səhifəsi (sayt kökündən yol)
 *   desc   – ana səhifədəki bölmə başlığının altında qısa izah
 *   items  – alt səhifələr: { name, icon, desc, url, status }
 *   source – "maps" yazılıbsa, alt menyu SITE_COUNTRIES və SITE_MAPS-dan
 *            avtomatik qurulur (items yazmaq lazım deyil)
 *
 * Alt səhifə sahələri:
 *   name   – ad
 *   icon   – emoji
 *   desc   – qısa izah
 *   url    – sayt kökündən yol
 *   status – "ready" | "soon"  (boş buraxılsa "ready" sayılır)
 */

const SITE_MENU = [
    {
        id: "home",
        label: "Ana səhifə",
        url: "index.html"
    },
    {
        id: "maps",
        label: "Xəritələr",
        icon: "🗺️",
        url: "index.html#xeriteler",
        desc: "Ölkələrin inzibati xəritələri və mövzu xəritələri",
        source: "maps"
    },
    {
        id: "games",
        label: "Oyunlar",
        icon: "🎮",
        url: "oyunlar/oyunlar.html",
        desc: "Əylənərək öyrən: xəritə tapmacaları, çarx və milyonçu",
        items: [
            { name: "Spin the Wheel", icon: "🎡", desc: "Çarxı fırlat, sualı cavablandır", url: "oyunlar/carx.html" },
            { name: "Azərbaycan xəritə oyunu", icon: "🇦🇿", desc: "Rayonları xəritədə tap", url: "oyunlar/tapmaca.html" },
            { name: "Avropa xəritə oyunu", icon: "🌍", desc: "Avropa ölkələri", url: "oyunlar/avropa-tapmaca.html" },
            { name: "Asiya xəritə oyunu", icon: "🌏", desc: "Asiya ölkələri", url: "oyunlar/asiya-tapmaca.html" },
            { name: "Afrika xəritə oyunu", icon: "🌍", desc: "Afrika ölkələri", url: "oyunlar/afrika-tapmaca.html" },
            { name: "Amerika xəritə oyunu", icon: "🌎", desc: "Amerika ölkələri", url: "oyunlar/america-tapmaca.html" },
            { name: "Milyonçu", icon: "💰", desc: "Coğrafiya sualları ilə milyonçu", url: "oyunlar/milyoncu.html" }
        ]
    },
    {
        id: "sims",
        label: "Simulyatorlar",
        icon: "🪐",
        url: "index.html#sec-sims",
        desc: "Üç ölçülü simulyasiyalarla hadisələri izlə",
        items: [
            { name: "Fəsillərin yaranması", icon: "🍂", desc: "Günəşin hərəkəti və fəsillərin səbəbi", url: "simulyasiya/fesiller.html" },
            { name: "Günəş sistemi", icon: "🪐", desc: "Planetlərin və peyklərin hərəkəti", url: "simulyasiya/gunes-sistemi.html" },
            { name: "Günəş və Ay tutulmaları", icon: "🌘", desc: "Tutulmaların necə baş verdiyi", url: "simulyasiya/gunes-ay-tutulmasi.html" }
        ]
    },
    {
        id: "tests",
        label: "Testlər",
        icon: "📝",
        url: "testler/testler.html",
        desc: "Sınaq və qiymətləndirmə testləri",
        items: [
            { name: "7-ci sinif I yarımil (BSQ)", icon: "📗", desc: "Böyük summativ qiymətləndirmə", url: "testler/bsq.html" },
            { name: "Müəllimlərin işə qəbulu (MİQ)", icon: "🎓", desc: "Coğrafiya müəllimliyi üzrə sınaq", url: "testler/miq.html" }
        ]
    },
    {
        id: "about",
        label: "Haqqımızda",
        url: "haqqimizda/haqqimizda.html"
    }
];

/* Menyunun sağındakı xarici keçid */
const SITE_EXTERNAL = {
    label: "YouTube",
    url: "https://www.youtube.com/@COĞRAFİYAHT"
};
