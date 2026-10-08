# GeoAtlas — İnteraktiv Coğrafiya Platforması

Bu, ölkələrin inzibati xəritələrini interaktiv şəkildə göstərən statik saytdır.
Sadəcə HTML/CSS/JS ilə qurulub — server tələb etmir, birbaşa **GitHub Pages**
üzərindən yayımlana bilər.

## 📁 Qovluq strukturu

```
geoatlas-site/
├── index.html                        → Ana səhifə (ölkə siyahısı və axtarış)
├── README.md                         → Bu fayl
├── countries/
│   └── azerbaijan.html               → Azərbaycan xəritə səhifəsi
│       (hər yeni ölkə üçün bura eyni adda YENİ bir .html faylı əlavə olunur)
└── assets/
    ├── css/
    │   └── style.css                 → Bütün sayt üçün ORTAQ stil faylı
    └── js/
        ├── countries-data.js         → ⭐ ÖLKƏ REYESTRİ (əsas idarəetmə nöqtəsi)
        ├── site.js                   → Ortaq naviqasiya məntiqi (listbox, axtarış,
        │                                header-dəki "ölkə seç" menyusu, breadcrumb)
        └── azerbaijan-regions.js     → Yalnız Azərbaycan səhifəsinə aid rayon
                                         məlumatları və xəritə davranışı
```

## 🚀 GitHub-da yerləşdirmə (GitHub Pages)

1. Bu qovluğun bütün məzmununu reponun kök qovluğuna (root) qoy — yəni
   `index.html` faylı reponun ən üstündə olmalıdır, alt qovluqda yox.
2. GitHub-da **Settings → Pages** bölməsinə keç.
3. "Source" olaraq `main` (və ya `master`) branch-ini və `/ (root)` qovluğunu seç.
4. Bir neçə dəqiqə sonra sayt `https://istifadeci-adi.github.io/repo-adi/`
   ünvanında əlçatan olacaq.

> Qeyd: Fayllar arasındakı bütün keçidlər nisbi (`../`, `assets/...`) yollarla
> yazılıb, ona görə sayt istənilən alt-yolda (məs. `repo-adi.github.io/...`)
> problemsiz işləyəcək.

## ➕ Yeni ölkə xəritəsi necə əlavə olunur?

Saytın əsas fikri budur: **bir faylı redaktə et, hər yerdə görün.**

1. **Xəritə faylını hazırla.** SimpleMaps (və ya bənzər mənbədən) ölkənin
   SVG faylını al, sərhədləri (`<path>` elementlərini) `countries/<ölkə>.html`
   faylına, mövcud `countries/azerbaijan.html` strukturuna bənzər şəkildə yerləşdir.

2. **Ərazi məlumatlarını yaz.** `assets/js/<ölkə>-regions.js` adlı yeni fayl
   yarat və içində `regions` obyektini (hər ərazi üçün ad, mərkəz, sahə,
   əhali, təsvir, teqlər) və xəritə klik/axtarış məntiqini yerləşdir —
   `azerbaijan-regions.js` faylı nümunə kimi istifadə edilə bilər.

3. **Reyestrə əlavə et.** `assets/js/countries-data.js` faylını aç və
   `SITE_COUNTRIES` massivinə bir sətir əlavə et:

   ```js
   {
       id: "georgia",
       name: "Gürcüstan",
       flag: "🇬🇪",
       url: "countries/georgia.html",
       regions: 76,
       status: "ready"   // hazır olduqda "soon"-dan "ready"-ə dəyiş
   }
   ```

Bu qədər. Addım 3-ü etdiyin an:

- Ana səhifədəki **axtarışlı siyahı** (listbox) yeni ölkəni göstərəcək,
- Hər səhifənin başlığındakı **"🌍 Ölkə seç"** açılan menyusu yenilənəcək,
- Hər xəritə səhifəsinin aşağısındakı **"Digər ölkələr"** siyahısı da
  avtomatik yenilənəcək,

çünki bütün bu üç element eyni `countries-data.js` massivindən oxuyur —
başqa heç bir fayla toxunmaq lazım deyil.

## 🧭 Əsas menyu (açılan alt menyularla)

Yuxarı menyu və ana səhifədəki bölmə kartları **bir yerdən** idarə olunur:
`assets/js/countries-data.js` faylındakı `SITE_MENU` massivi.

| Bölmə | Alt menyunun mənbəyi |
|---|---|
| Xəritələr | `SITE_COUNTRIES` (ölkə xəritələri) + `SITE_MAPS` (mövzu xəritələri) |
| Oyunlar | `SITE_MENU` → `games.items` |
| Simulyatorlar | `SITE_MENU` → `sims.items` |
| Testlər | `SITE_MENU` → `tests.items` |

Yeni oyun / simulyator / test əlavə etmək üçün uyğun `items` siyahısına bir obyekt
əlavə et — həm yuxarı menyuda, həm ana səhifə kartlarında, həm də menyusuz tam ekran
səhifələrdəki kiçik üzən menyuda avtomatik görünəcək.

Menyunu `site.js` qurur, ona görə hər səhifədə `<nav class="nav-links">` elementi
(içi boş ola bilər) və `countries-data.js` + `site.js` skriptləri olmalıdır.

**Öz başlığı olmayan tam ekran səhifələr** (simulyatorlar, tapmaca oyunları, milyonçu,
mövzu xəritələri) səhifənin sonunda bu 3 sətri saxlayır və kiçik "☰ Menyu" düyməsi
göstərir (düyməni sürüşdürmək olar):

```html
<script>window.SITE_BASE="../";window.CURRENT_COUNTRY=null;window.SITE_MINI=true;</script>
<script src="../assets/js/countries-data.js"></script>
<script src="../assets/js/site.js"></script>
```

## 🧩 Texniki qeydlər

- Xarici kitabxana yoxdur — sadə HTML/CSS/vanil JS.
- `window.SITE_BASE` və `window.CURRENT_COUNTRY` hər səhifədə əl ilə təyin
  olunur (bax: hər `.html` faylının aşağısındakı `<script>` bloku) ki,
  `site.js` linkləri düzgün qura bilsin və cari ölkəni siyahıda işarələsin.
- `status: "soon"` olan ölkələr siyahıda görünür, amma üzərinə klikləmək
  mümkün deyil (boz rəngdə, "Tezliklə" nişanı ilə).
