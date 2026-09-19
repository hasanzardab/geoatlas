

/* =========================================
   VİLAYƏT MƏLUMATLARI
========================================= */

const regions = {
    TR75:{name:"Ardahan",center:"Ardahan",area:"5 576 km²",population:"~95 000",region:"Şərqi Anadolu",description:"Gürcüstan sərhədində, soyuq iqlimi və mal-qara yayla təsərrüfatı ilə tanınan vilayət.",tags:["Gürcüstan sərhədi", "Yayla heyvandarlığı", "Soyuq iqlim"]},
    TR08:{name:"Artvin",center:"Artvin",area:"7 367 km²",population:"~165 000",region:"Qara dəniz",description:"Çoruh çayı vadisində, sıx meşələri və dağçılıq turizmi ilə tanınan bölgə.",tags:["Çoruh çayı", "Dağçılıq turizmi", "Sıx meşələr"]},
    TR73:{name:"Şırnak",center:"Şırnak",area:"7 172 km²",population:"~555 000",region:"Cənub-Şərqi Anadolu",description:"İraq və Suriya sərhədində, dağlıq relyefli cənub-şərq vilayəti.",tags:["Üçlü sərhəd", "Dağlıq relyef", "Cudi dağı"]},
    TR30:{name:"Hakkari",center:"Hakkari",area:"7 121 km²",population:"~280 000",region:"Şərqi Anadolu",description:"İraq sərhədində, Türkiyənin ən dağlıq və yüksək vilayətlərindən biri.",tags:["Yüksək dağlıq", "İraq sərhədi", "Cilo dağları"]},
    TR76:{name:"İğdır",center:"İğdır",area:"3 587 km²",population:"~200 000",region:"Şərqi Anadolu",description:"Araz çayı vadisində, İran, Ermənistan və Naxçıvanla sərhədi olan bölgə.",tags:["Araz çayı vadisi", "Naxçıvan sərhədi", "Meyvəçilik"]},
    TR04:{name:"Ağrı",center:"Ağrı",area:"11 376 km²",population:"~520 000",region:"Şərqi Anadolu",description:"Türkiyənin ən yüksək zirvəsi Ağrı dağının ətəyində yerləşən sərhəd vilayəti.",tags:["Ağrı dağı", "İran sərhədi", "Yüksək yayla"]},
    TR65:{name:"Van",center:"Van",area:"19 069 km²",population:"~1,1 milyon",region:"Şərqi Anadolu",description:"Van gölü sahilində, kədi cinsi və qədim Urartu irsi ilə tanınan şəhər.",tags:["Van gölü", "Van pişiyi", "Urartu irsi"]},
    TR39:{name:"Kırklareli",center:"Kırklareli",area:"6 550 km²",population:"~370 000",region:"Marmara",description:"Bolqarıstan sərhədində, meşələri və şərabçılığı ilə tanınan sakit bölgə.",tags:["Bolqarıstan sərhədi", "Şərabçılıq", "Meşələr"]},
    TR22:{name:"Edirne",center:"Edirne",area:"6 145 km²",population:"~410 000",region:"Marmara",description:"Bolqarıstan və Yunanıstan sərhədində, Osmanlı paytaxtı olmuş tarixi şəhər.",tags:["Keçmiş Osmanlı paytaxtı", "Selimiyə məscidi", "Üç sərhəd bölgəsi"]},
    TR36:{name:"Qars",center:"Qars",area:"9 587 km²",population:"~285 000",region:"Şərqi Anadolu",description:"Ani xarabalıqları və Rusiya dövrü memarlığı ilə tanınan yüksək yayla şəhəri.",tags:["Ani xarabalıqları", "Yüksək yayla", "Qafqaz irsi"]},
    TR47:{name:"Mardin",center:"Mardin",area:"8 891 km²",population:"~870 000",region:"Cənub-Şərqi Anadolu",description:"Sarı daş memarlığı və Mesopotamiya ovalığına baxan mənzərəsi ilə tanınan qədim şəhər.",tags:["Sarı daş memarlığı", "Mesopotamiya mənzərəsi", "Çoxmillətli tarix"]},
    TR63:{name:"Şanlıurfa",center:"Şanlıurfa",area:"18 584 km²",population:"~2,1 milyon",region:"Cənub-Şərqi Anadolu",description:"Peyğəmbərlər şəhəri adlanan, Göbəklitəpə abidəsi ilə tanınan qədim yaşayış yeri.",tags:["Göbəklitəpə", "Peyğəmbərlər şəhəri", "Qədim tarix"]},
    TR79:{name:"Kilis",center:"Kilis",area:"1 412 km²",population:"~145 000",region:"Cənub-Şərqi Anadolu",description:"Suriya sərhədində, Türkiyənin ən kiçik vilayəti, zeytunçuluqla tanınır.",tags:["Ən kiçik vilayət", "Suriya sərhədi", "Zeytunçuluq"]},
    TR27:{name:"Qazi Anteb",center:"Qazi Anteb",area:"6 844 km²",population:"~2,1 milyon",region:"Cənub-Şərqi Anadolu",description:"Suriya sərhədinə yaxın, baklava və mətbəxi ilə məşhur qədim ticarət şəhəri.",tags:["Baklava mətbəxi", "Qədim ticarət yolu", "Suriya sərhədi"]},
    TR31:{name:"Hatay",center:"Antakya",area:"5 524 km²",population:"~1,66 milyon",region:"Akdeniz",description:"Suriya sərhədində, qədim Antakya şəhəri və zəngin mətbəxi ilə tanınan bölgə.",tags:["Qədim Antakya", "Zəngin mətbəx", "Suriya sərhədi"]},
    TR34:{name:"İstanbul",center:"İstanbul",area:"5 461 km²",population:"~15,9 milyon",region:"Marmara",description:"Türkiyənin ən böyük şəhəri və iqtisadi mərkəzi, Bosfor boğazının hər iki sahilində yerləşir.",tags:["Bosfor boğazı", "İqtisadi mərkəz", "Tarixi paytaxt"]},
    TR59:{name:"Tekirdağ",center:"Tekirdağ",area:"6 218 km²",population:"~1,1 milyon",region:"Marmara",description:"Marmara dənizi sahilində, şərabçılıq və sənaye ilə tanınan bölgə.",tags:["Şərabçılıq", "Marmara sahili", "Sənaye"]},
    TR17:{name:"Çanakkale",center:"Çanakkale",area:"9 737 km²",population:"~560 000",region:"Marmara",description:"Dardanel boğazı sahilində, Birinci Dünya müharibəsi tarixi ilə tanınan şəhər.",tags:["Dardanel boğazı", "Qallipoli döyüşləri", "Troya yaxınlığı"]},
    TR53:{name:"Rize",center:"Rize",area:"3 792 km²",population:"~345 000",region:"Qara dəniz",description:"Türkiyənin əsas çay istehsalı mərkəzi, yaşıl dağ landşaftı ilə tanınır.",tags:["Çay plantasiyaları", "Yaşıl dağlar", "Qara dəniz sahili"]},
    TR61:{name:"Trabzon",center:"Trabzon",area:"4 664 km²",population:"~810 000",region:"Qara dəniz",description:"Qara dəniz sahilində, Sümela monastırı və çay bağları ilə tanınan tarixi liman.",tags:["Sümela monastırı", "Çayçılıq", "Qara dəniz limanı"]},
    TR28:{name:"Giresun",center:"Giresun",area:"6 934 km²",population:"~445 000",region:"Qara dəniz",description:"Fındıq istehsalı ilə tanınan, dağlıq Qara dəniz sahili şəhəri.",tags:["Fındıq istehsalı", "Dağlıq sahil", "Qara dəniz"]},
    TR52:{name:"Ordu",center:"Ordu",area:"5 954 km²",population:"~760 000",region:"Qara dəniz",description:"Fındıq bağları və Qara dəniz sahili ilə tanınan bölgə.",tags:["Fındıqçılıq", "Qara dəniz sahili", "Yaylalar"]},
    TR55:{name:"Samsun",center:"Samsun",area:"9 725 km²",population:"~1,4 milyon",region:"Qara dəniz",description:"Qara dəniz sahilində, Atatürkün Milli Mücadiləyə başladığı tarixi liman şəhəri.",tags:["Qara dəniz sahili", "Tarixi liman", "Fındıqçılıq"]},
    TR57:{name:"Sinop",center:"Sinop",area:"5 445 km²",population:"~215 000",region:"Qara dəniz",description:"Qara dənizin ən şimal nöqtəsində yerləşən yarımada şəhəri.",tags:["Şimal ucqarı", "Yarımada", "Balıqçılıq"]},
    TR37:{name:"Kastamonu",center:"Kastamonu",area:"13 108 km²",population:"~375 000",region:"Qara dəniz",description:"Meşəli dağlar arasında, Osmanlı memarlığı qorunmuş tarixi şəhər.",tags:["Meşəli dağlar", "Osmanlı memarlığı", "Ağac emalı"]},
    TR74:{name:"Bartın",center:"Bartın",area:"2 143 km²",population:"~200 000",region:"Qara dəniz",description:"Kiçik, meşəlik Qara dəniz sahili vilayəti, gəmiqayırma tarixi ilə tanınır.",tags:["Gəmiqayırma tarixi", "Meşələr", "Kiçik sahil şəhəri"]},
    TR67:{name:"Zonguldak",center:"Zonguldak",area:"3 342 km²",population:"~590 000",region:"Qara dəniz",description:"Türkiyənin əsas daş kömür hövzəsi, mədənçilik tarixi ilə tanınır.",tags:["Daş kömür mədənləri", "Mədənçilik tarixi", "Qara dəniz sahili"]},
    TR81:{name:"Düzce",center:"Düzce",area:"2 492 km²",population:"~400 000",region:"Qara dəniz",description:"Meşəli dağlar əhatəsində, kənd təsərrüfatı ilə tanınan kiçik vilayət.",tags:["Meşəlik ərazi", "Kənd təsərrüfatı", "Dağətəyi"]},
    TR54:{name:"Sakarya",center:"Adapazarı",area:"4 895 km²",population:"~1,08 milyon",region:"Marmara",description:"Sakarya çayı vadisində, sənaye və meşəlik landşaftı ilə tanınan bölgə.",tags:["Sakarya çayı", "Sənaye", "Meşəlik landşaft"]},
    TR41:{name:"Kocaeli",center:"İzmit",area:"3 505 km²",population:"~2,0 milyon",region:"Marmara",description:"İstanbul yaxınlığında yerləşən, Türkiyənin əsas ağır sənaye mərkəzlərindən biri.",tags:["Ağır sənaye", "İzmit körfəzi", "Marmara sahili"]},
    TR77:{name:"Yalova",center:"Yalova",area:"847 km²",population:"~270 000",region:"Marmara",description:"Marmara dənizi sahilində, termal sular və kiçik ərazisi ilə tanınan vilayət.",tags:["Termal sular", "Kiçik ərazi", "Marmara sahili"]},
    TR16:{name:"Bursa",center:"Bursa",area:"10 813 km²",population:"~3,2 milyon",region:"Marmara",description:"Osmanlı imperiyasının ilk paytaxtı, sənaye və avtomobil istehsalı mərkəzi.",tags:["Osmanlı ilk paytaxtı", "Sənaye mərkəzi", "Uludağ"]},
    TR10:{name:"Balıkesir",center:"Balıkesir",area:"14 583 km²",population:"~1,25 milyon",region:"Marmara",description:"Ege və Marmara dənizləri arasında, zeytunçuluq və termal turizmlə tanınan bölgə.",tags:["Zeytunçuluq", "Termal sular", "İki dəniz arası"]},
    TR35:{name:"İzmir",center:"İzmir",area:"11 973 km²",population:"~4,4 milyon",region:"Ege",description:"Egey dənizi sahilində yerləşən, Türkiyənin üçüncü böyük şəhəri və mühüm liman.",tags:["Egey sahili", "Liman şəhəri", "Üzümçülük"]},
    TR09:{name:"Aydın",center:"Aydın",area:"8 007 km²",population:"~1,15 milyon",region:"Ege",description:"Böyük Menderes vadisində, əncir və zeytun bağları ilə tanınan bölgə, Efes yaxınlığında.",tags:["Əncir istehsalı", "Efes yaxınlığı", "Böyük Menderes vadisi"]},
    TR48:{name:"Muğla",center:"Muğla",area:"12 654 km²",population:"~1,05 milyon",region:"Ege",description:"Bodrum və Marmaris kimi məşhur kurortları olan Egey sahili vilayəti.",tags:["Bodrum kurortu", "Marmaris", "Egey sahili turizmi"]},
    TR07:{name:"Antalya",center:"Antalya",area:"20 177 km²",population:"~2,7 milyon",region:"Akdeniz",description:"Aralıq dənizi sahilində Türkiyənin əsas turizm mərkəzi.",tags:["Turizm mərkəzi", "Aralıq dənizi sahili", "Kurort şəhəri"]},
    TR33:{name:"Mersin",center:"Mersin",area:"15 853 km²",population:"~1,9 milyon",region:"Akdeniz",description:"Aralıq dənizi sahilində, mühüm liman və sitrus bağları ilə tanınan şəhər.",tags:["Aralıq dənizi limanı", "Sitrus bağları", "Liman şəhəri"]},
    TR01:{name:"Adana",center:"Adana",area:"13 844 km²",population:"~2,3 milyon",region:"Akdeniz",description:"Çukurova ovalığında, pambıqçılıq və sənaye ilə tanınan cənub şəhəri.",tags:["Çukurova ovalığı", "Pambıqçılıq", "Kəbab mətbəxi"]},
    TR14:{name:"Bolu",center:"Bolu",area:"8 313 km²",population:"~320 000",region:"Qara dəniz",description:"Meşəli dağlar və Abant gölü ilə tanınan, İstanbul-Ankara yolu üzərindəki bölgə.",tags:["Abant gölü", "Meşəli dağlar", "Yol qovşağı"]},
    TR06:{name:"Ankara",center:"Ankara",area:"25 632 km²",population:"~5,7 milyon",region:"İç Anadolu",description:"Türkiyənin paytaxtı, Anadolu yaylasının mərkəzində yerləşən inzibati mərkəz.",tags:["Paytaxt", "Anadolu yaylası", "İnzibati mərkəz"]},
    TR11:{name:"Bilecik",center:"Bilecik",area:"4 302 km²",population:"~225 000",region:"Marmara",description:"Osmanlı sülaləsinin kökü sayılan Söğüt qəsəbəsinin yerləşdiyi bölgə.",tags:["Osmanlı kökləri", "Söğüt qəsəbəsi", "Kiçik sənaye"]},
    TR26:{name:"Eskişehir",center:"Eskişehir",area:"13 960 km²",population:"~900 000",region:"İç Anadolu",description:"Universitet şəhəri kimi tanınan, Porsuk çayı sahilindəki müasir mərkəz.",tags:["Universitet şəhəri", "Porsuk çayı", "Lületaşı"]},
    TR18:{name:"Çankırı",center:"Çankırı",area:"7 490 km²",population:"~190 000",region:"İç Anadolu",description:"Duz yataqları və bozqır landşaftı ilə tanınan İç Anadolu vilayəti.",tags:["Duz yataqları", "Bozqır landşaftı", "Az əhalili"]},
    TR78:{name:"Karabük",center:"Karabük",area:"4 142 km²",population:"~250 000",region:"Qara dəniz",description:"Türkiyənin ilk böyük dəmir-polad zavodunun yerləşdiyi sənaye şəhəri.",tags:["Dəmir-polad zavodu", "Safranbolu yaxınlığı", "Sənaye tarixi"]},
    TR60:{name:"Tokat",center:"Tokat",area:"9 958 km²",population:"~600 000",region:"Qara dəniz",description:"Yaşil İrmaq vadisində, tarixi bazarları ilə tanınan Anadolu şəhəri.",tags:["Yaşil İrmaq vadisi", "Tarixi bazar", "Kənd təsərrüfatı"]},
    TR58:{name:"Sivas",center:"Sivas",area:"28 175 km²",population:"~630 000",region:"İç Anadolu",description:"Anadolunun geniş ərazili vilayətlərindən biri, Səlcuqlu memarlığı ilə tanınır.",tags:["Səlcuqlu memarlığı", "Geniş ərazi", "Dəmir-polad sənayesi"]},
    TR19:{name:"Çorum",center:"Çorum",area:"12 386 km²",population:"~520 000",region:"Qara dəniz",description:"Hitit paytaxtı Hattuşaşın yaxınlığında yerləşən tarixi əhəmiyyətli vilayət.",tags:["Hattuşaş qədim şəhəri", "Hitit irsi", "Leblebiçilik"]},
    TR05:{name:"Amasya",center:"Amasya",area:"5 690 km²",population:"~330 000",region:"Qara dəniz",description:"Yaşil İrmaq sahilində, qaya məzarları və Osmanlı memarlığı ilə tanınan şəhər.",tags:["Qaya məzarları", "Yaşil İrmaq", "Osmanlı memarlığı"]},
    TR43:{name:"Kütahya",center:"Kütahya",area:"11 634 km²",population:"~575 000",region:"Ege",description:"Çini məmulatları istehsalı ilə əsrlərdir tanınan şəhər.",tags:["Çini məmulatları", "Termal sular", "Sənətkarlıq"]},
    TR42:{name:"Konya",center:"Konya",area:"38 873 km²",population:"~2,3 milyon",region:"İç Anadolu",description:"Anadolunun ən geniş ərazili vilayəti, Mövlana və Səlcuqlu irsi ilə tanınır.",tags:["Mövlana türbəsi", "Səlcuqlu irsi", "Ən böyük ərazi"]},
    TR70:{name:"Karaman",center:"Karaman",area:"8 662 km²",population:"~260 000",region:"İç Anadolu",description:"Qaramanoğulları bəyliyinin paytaxtı olmuş tarixi Anadolu şəhəri.",tags:["Qaramanoğulları irsi", "Bozqır landşaft", "Kənd təsərrüfatı"]},
    TR51:{name:"Niğde",center:"Niğde",area:"7 312 km²",population:"~365 000",region:"İç Anadolu",description:"Kappadokiya bölgəsinin cənub qapısı sayılan, dağlıq İç Anadolu vilayəti.",tags:["Kappadokiya yaxınlığı", "Dağlıq relyef", "Kartof istehsalı"]},
    TR38:{name:"Kayseri",center:"Kayseri",area:"16 917 km²",population:"~1,4 milyon",region:"İç Anadolu",description:"Erciyes dağının ətəyində, sənaye və qış turizmi ilə tanınan tarixi şəhər.",tags:["Erciyes dağı", "Sənaye mərkəzi", "Qış turizmi"]},
    TR32:{name:"Isparta",center:"Isparta",area:"8 946 km²",population:"~445 000",region:"Ege",description:"Qızılgül istehsalı və ətir sənayesi ilə dünyada tanınan şəhər.",tags:["Qızılgül istehsalı", "Ətir sənayesi", "Göllər bölgəsi"]},
    TR45:{name:"Manisa",center:"Manisa",area:"13 810 km²",population:"~1,45 milyon",region:"Ege",description:"Üzüm və zeytun bağları ilə tanınan, Sipylus dağı ətəyindəki tarixi şəhər.",tags:["Üzümçülük", "Sipylus dağı", "Kənd təsərrüfatı"]},
    TR20:{name:"Denizli",center:"Denizli",area:"11 868 km²",population:"~1,1 milyon",region:"Ege",description:"Pambıq qalası (Pamukkale) travertinləri ilə dünyada tanınan şəhər.",tags:["Pamukkale travertinləri", "Toxuculuq", "Termal sular"]},
    TR15:{name:"Burdur",center:"Burdur",area:"6 887 km²",population:"~260 000",region:"Ege",description:"Göllər bölgəsində yerləşən, aqrar təsərrüfatla tanınan sakit vilayət.",tags:["Göllər bölgəsi", "Aqrar təsərrüfat", "Termal sular"]},
    TR68:{name:"Aksaray",center:"Aksaray",area:"7 626 km²",population:"~435 000",region:"İç Anadolu",description:"Kappadokiya yaxınlığında, tarixi karvansaraylar ilə tanınan bölgə.",tags:["Karvansaraylar", "Kappadokiya yaxınlığı", "Kartof təsərrüfatı"]},
    TR50:{name:"Nevşehir",center:"Nevşehir",area:"5 385 km²",population:"~310 000",region:"İç Anadolu",description:"Kappadokiyanın pəri bacaları və yeraltı şəhərləri ilə dünyaca məşhur mərkəzi.",tags:["Pəri bacaları", "Yeraltı şəhərlər", "İstiqal turizmi"]},
    TR66:{name:"Yozgat",center:"Yozgat",area:"13 782 km²",population:"~410 000",region:"İç Anadolu",description:"Anadolu yaylasında, meşəli Çamlıq milli parkı ilə tanınan bölgə.",tags:["Çamlıq milli parkı", "Yayla iqlimi", "Heyvandarlıq"]},
    TR40:{name:"Kırşehir",center:"Kırşehir",area:"6 434 km²",population:"~235 000",region:"İç Anadolu",description:"Əhi təşkilatının mərkəzi olmuş, sənətkarlıq tarixi ilə tanınan şəhər.",tags:["Əhi təşkilatı tarixi", "Sənətkarlıq", "Bozqır landşaft"]},
    TR64:{name:"Uşak",center:"Uşak",area:"5 341 km²",population:"~370 000",region:"Ege",description:"Xalçaçılıq və toxuculuq sənayesi ilə tanınan Ege vilayəti.",tags:["Xalçaçılıq", "Toxuculuq sənayesi", "Kiçik vilayət"]},
    TR24:{name:"Ərzincan",center:"Ərzincan",area:"11 815 km²",population:"~230 000",region:"Şərqi Anadolu",description:"Fərat çayı vadisində, zəlzələ tarixi və məhsuldar ovalığı ilə tanınan bölgə.",tags:["Fərat vadisi", "Məhsuldar ovalıq", "Zəlzələ tarixi"]},
    TR62:{name:"Tunceli",center:"Tunceli",area:"7 774 km²",population:"~85 000",region:"Şərqi Anadolu",description:"Munzur dağları milli parkı ilə tanınan, az əhalili dağlıq vilayət.",tags:["Munzur milli parkı", "Dağlıq relyef", "Az əhalili"]},
    TR03:{name:"Əfyonqarahisar",center:"Əfyonqarahisar",area:"14 016 km²",population:"~730 000",region:"Ege",description:"Mərmər hasilatı və termal sularla tanınan qala şəhəri.",tags:["Mərmər hasilatı", "Termal sular", "Qala qayası"]},
    TR71:{name:"Kırıkkale",center:"Kırıkkale",area:"4 365 km²",population:"~280 000",region:"İç Anadolu",description:"Hərbi sənaye müəssisələri ilə tanınan, Ankaraya yaxın kiçik vilayət.",tags:["Hərbi sənaye", "Ankara yaxınlığı", "Sənaye şəhəri"]},
    TR46:{name:"Qəhrəmanmaraş",center:"Qəhrəmanmaraş",area:"14 327 km²",population:"~1,1 milyon",region:"Akdeniz",description:"Dondurması ilə məşhur, Əhir dağının ətəyində yerləşən tarixi şəhər.",tags:["Maraş dondurması", "Əhir dağı", "İstiqlal mücadiləsi tarixi"]},
    TR49:{name:"Muş",center:"Muş",area:"8 196 km²",population:"~410 000",region:"Şərqi Anadolu",description:"Muş ovasında, heyvandarlıq və taxılçılıqla tanınan yüksək dağ vilayəti.",tags:["Muş ovası", "Heyvandarlıq", "Yüksək yayla"]},
    TR25:{name:"Ərzurum",center:"Ərzurum",area:"25 066 km²",population:"~760 000",region:"Şərqi Anadolu",description:"Yüksək yayla iqlimi və qış idman mərkəzləri ilə tanınan şərq vilayəti.",tags:["Palandöken qış mərkəzi", "Yüksək yayla", "Səlcuqlu abidələri"]},
    TR44:{name:"Malatya",center:"Malatya",area:"12 313 km²",population:"~800 000",region:"Şərqi Anadolu",description:"Ərik istehsalı ilə dünyada tanınan Fərat çayı hövzəsindəki şəhər.",tags:["Quru ərik istehsalı", "Fərat çayı hövzəsi", "Meyvəçilik"]},
    TR23:{name:"Elazığ",center:"Elazığ",area:"9 153 km²",population:"~590 000",region:"Şərqi Anadolu",description:"Fərat çayı üzərindəki Keban su anbarı ilə tanınan şərq vilayəti.",tags:["Keban su anbarı", "Fərat çayı", "Ərik bağları"]},
    TR13:{name:"Bitlis",center:"Bitlis",area:"6 707 km²",population:"~345 000",region:"Şərqi Anadolu",description:"Van gölü yaxınlığında, dağlıq relyefi ilə tanınan tarixi şəhər.",tags:["Van gölü yaxınlığı", "Dağlıq relyef", "Tarixi qala"]},
    TR12:{name:"Bingöl",center:"Bingöl",area:"8 152 km²",population:"~280 000",region:"Şərqi Anadolu",description:"Min gölləri yaylası ilə tanınan yüksək dağlıq şərq vilayəti.",tags:["Min göllər yaylası", "Yüksək dağlıq", "Heyvandarlıq"]},
    TR80:{name:"Osmaniye",center:"Osmaniye",area:"3 767 km²",population:"~555 000",region:"Akdeniz",description:"Çukurova ovalığının şərq ucunda, kənd təsərrüfatı ilə tanınan gənc vilayət.",tags:["Çukurova ovalığı", "Kənd təsərrüfatı", "Gənc vilayət"]},
    TR02:{name:"Adıyaman",center:"Adıyaman",area:"7 337 km²",population:"~635 000",region:"Cənub-Şərqi Anadolu",description:"Nemrud dağındakı nəhəng heykəllər ilə dünya səviyyəsində tanınan bölgə.",tags:["Nemrud dağı heykəlləri", "UNESCO obyekti", "Fərat vadisi"]},
    TR21:{name:"Diyarbakır",center:"Diyarbakır",area:"15 355 km²",population:"~1,8 milyon",region:"Cənub-Şərqi Anadolu",description:"Dəclə çayı sahilində, qədim bazalt divarları ilə tanınan tarixi mərkəz.",tags:["Qədim şəhər divarları", "Dəclə çayı", "Qarpızçılıq"]},
    TR72:{name:"Batman",center:"Batman",area:"4 694 km²",population:"~620 000",region:"Cənub-Şərqi Anadolu",description:"Neft hasilatı ilə tanınan, Dəclə çayı yaxınlığındakı gənc şəhər.",tags:["Neft hasilatı", "Dəclə çayı yaxınlığı", "Sənaye"]},
    TR56:{name:"Siirt",center:"Siirt",area:"5 406 km²",population:"~330 000",region:"Cənub-Şərqi Anadolu",description:"Dəclə çayı hövzəsində, fıstıq və pərde pendiri ilə tanınan bölgə.",tags:["Dəclə hövzəsi", "Fıstıq istehsalı", "Ənənəvi pendir"]},
    TR69:{name:"Bayburt",center:"Bayburt",area:"3 652 km²",population:"~85 000",region:"Qara dəniz",description:"Türkiyənin ən az əhalisi olan vilayətlərindən biri, tarixi qalası ilə tanınır.",tags:["Bayburt qalası", "Ən az əhalili", "Yayla heyvandarlığı"]},
    TR29:{name:"Gümüşhane",center:"Gümüşhane",area:"6 575 km²",population:"~150 000",region:"Qara dəniz",description:"Tarixi gümüş mədənləri adını verən, dağlıq Qara dəniz vilayəti.",tags:["Gümüş mədənləri tarixi", "Dağlıq relyef", "Az əhalili"]}
};

/* =========================================
   ELEMENTLƏR
========================================= */

const paths =
document.querySelectorAll("#turkeyMap path");

const regionName =
document.getElementById("regionName");

const description =
document.getElementById("regionDescription");

const center =
document.getElementById("center");

const area =
document.getElementById("area");

const population =
document.getElementById("population");

const region =
document.getElementById("region");

const tags =
document.getElementById("tags");

const search =
document.getElementById("search");

const searchResults =
document.getElementById("searchResults");

const tooltip =
document.getElementById("tooltip");

const mapArea =
document.querySelector(".map-area");


/* =========================================
   ƏRAZİNİ GÖSTƏR
========================================= */

function showRegion(id){

    const data = regions[id];

    if(!data) return;

    paths.forEach(path=>{
        path.classList.remove("active");
    });

    const selected =
    document.getElementById(id);

    if(selected){
        selected.classList.add("active");
    }

    regionName.textContent =
    data.name;

    description.textContent =
    data.description;

    center.textContent =
    data.center;

    area.textContent =
    data.area;

    population.textContent =
    data.population;

    region.textContent =
    data.region;

    tags.innerHTML =
    data.tags.map(tag =>
        `<span class="tag">${tag}</span>`
    ).join("");

}


/* =========================================
   XƏRİTƏ KLİKLƏRİ VƏ TOOLTIP
========================================= */

paths.forEach(path=>{

    path.addEventListener("click",()=>{

        showRegion(path.id);

    });

    path.addEventListener("mousemove",(e)=>{

        const rect =
        mapArea.getBoundingClientRect();

        tooltip.style.left =
        (e.clientX - rect.left) + "px";

        tooltip.style.top =
        (e.clientY - rect.top) + "px";

        tooltip.textContent =
        path.dataset.name;

        tooltip.classList.add("show");

    });

    path.addEventListener("mouseleave",()=>{

        tooltip.classList.remove("show");

    });

});


/* =========================================
   AXTARIŞ
========================================= */

function clearHighlights(){

    paths.forEach(path=>{
        path.classList.remove("matched");
    });

}

function renderSearchResults(value){

    const matches =
    Object.keys(regions).filter(id=>{
        return regions[id].name
        .toLowerCase()
        .includes(value);
    });

    if(!value || matches.length === 0){

        searchResults.classList.remove("show");
        searchResults.innerHTML = "";
        return;

    }

    searchResults.innerHTML =
    matches.slice(0,12).map(id=>{
        return `<div class="search-result-item" data-id="${id}">${regions[id].name}</div>`;
    }).join("");

    searchResults.classList.add("show");

    searchResults
    .querySelectorAll(".search-result-item")
    .forEach(item=>{

        item.addEventListener("click",()=>{

            const id =
            item.dataset.id;

            showRegion(id);

            search.value =
            regions[id].name;

            searchResults.classList.remove("show");

            clearHighlights();

        });

    });

}

search.addEventListener("input",function(){

    const value =
    this.value
    .toLowerCase()
    .trim();

    clearHighlights();

    paths.forEach(path=>{

        const name =
        path.dataset.name.toLowerCase();

        if(value && name.includes(value)){

            path.classList.add("matched");

        }

    });

    renderSearchResults(value);

});

document.addEventListener("click",(e)=>{

    if(!e.target.closest(".search-wrap")){

        searchResults.classList.remove("show");

    }

});
