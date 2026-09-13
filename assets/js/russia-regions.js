

/* =========================================
   FEDERAL SUBYEKT MƏLUMATLARI
========================================= */

const regions = {
    RUAL:{name:"Altay Respublikası",center:"Qorno-Altaysk",area:"92 900 km²",population:"~220 000",region:"Sibir federal dairə",description:"Altay dağlarında, dağ gölləri və turizmi ilə tanınan Sibir respublikası.",tags:["Altay dağları", "Dağ gölləri", "Ekoturizm"]},
    RUPSK:{name:"Pskov vilayəti",center:"Pskov",area:"55 400 km²",population:"~610 000",region:"Şimal-Qərb federal dairə",description:"Estoniya və Latviyaya sərhəd, qədim rus qalaları ilə tanınan sərhəd vilayəti.",tags:["Qədim qalalar", "Baltikyanı sərhəd", "Tarixi mərkəz"]},
    RUKDA:{name:"Krasnodar diyarı",center:"Krasnodar",area:"75 500 km²",population:"~5,8 milyon",region:"Cənub federal dairə",description:"Qara dəniz sahilində, Soçi kurortu və məhsuldar torpaqları olan Rusiyanın \"cənub səbətidir\".",tags:["Soçi kurortu", "Qara dəniz sahili", "Aqrar zəngin torpaq"]},
    RUKC:{name:"Qaraçay-Çərkəz Respublikası",center:"Çerkessk",area:"14 300 km²",population:"~470 000",region:"Şimali Qafqaz federal dairə",description:"Qafqaz dağlarında, qış turizmi və dağ landşaftı ilə tanınan respublika.",tags:["Dağ turizmi", "Qafqaz dağları", "Qaraçay-çərkəz xalqları"]},
    RUKB:{name:"Kabarda-Balkar Respublikası",center:"Nalçik",area:"12 500 km²",population:"~870 000",region:"Şimali Qafqaz federal dairə",description:"Elbrus dağının ətəyində, alpinizm turizmi ilə tanınan Qafqaz respublikası.",tags:["Elbrus dağı", "Alpinizm", "Kabarda-balkar xalqları"]},
    RUSE:{name:"Şimali Osetiya Respublikası",center:"Vladiqafqaz",area:"8 000 km²",population:"~690 000",region:"Şimali Qafqaz federal dairə",description:"Qafqaz Hərbi Yolunun keçdiyi, osetin xalqının milli respublikası.",tags:["Qafqaz Hərbi Yolu", "Osetin xalqı", "Dağlıq təbiət"]},
    RUIN:{name:"İnquşetiya Respublikası",center:"Magas",area:"3 600 km²",population:"~510 000",region:"Şimali Qafqaz federal dairə",description:"Rusiyanın ən kiçik federal subyekti, dağlıq Qafqaz relyefli inquş respublikası.",tags:["Ən kiçik subyekt", "İnquş xalqı", "Dağlıq relyef"]},
    RUCE:{name:"Çeçenistan Respublikası",center:"Qroznı",area:"16 200 km²",population:"~1,5 milyon",region:"Şimali Qafqaz federal dairə",description:"Qafqaz dağlarında, müasir Qroznı şəhəri ilə yenidən qurulan respublika.",tags:["Qroznı şəhəri", "Qafqaz dağları", "Çeçen xalqı"]},
    RUDA:{name:"Dağıstan Respublikası",center:"Maxaçqala",area:"50 300 km²",population:"~3,2 milyon",region:"Şimali Qafqaz federal dairə",description:"Xəzər dənizi sahilində, Qafqazın ən çoxmillətli respublikası.",tags:["Xəzər sahili", "Çoxmillətlilik", "Qafqaz dağları"]},
    RUMUR:{name:"Murmansk vilayəti",center:"Murmansk",area:"144 900 km²",population:"~680 000",region:"Şimal-Qərb federal dairə",description:"Şimal Buzlu Okean sahilində, ilbuzsuz limanı olan Arktika vilayəti.",tags:["Arktika dairəsi", "İlbuzsuz liman", "Kola yarımadası"]},
    RUKR:{name:"Kareliya",center:"Petrozavodsk",area:"180 500 km²",population:"~530 000",region:"Şimal-Qərb federal dairə",description:"Finlandiya sərhədində, minlərlə gölü olan meşəli respublika.",tags:["Minlərlə göl", "Finlandiya sərhədi", "Kizhi abidəsi"]},
    RULEN:{name:"Leninqrad vilayəti",center:"Sankt-Peterburq",area:"83 900 km²",population:"~1,9 milyon",region:"Şimal-Qərb federal dairə",description:"Sankt-Peterburqu əhatə edən, Baltik dənizi liman infrastrukturuna malik vilayət.",tags:["Baltik limanları", "Peterburq ətrafı", "Meşəli landşaft"]},
    RUKGD:{name:"Kalininqrad vilayəti",center:"Kalininqrad",area:"15 100 km²",population:"~1,0 milyon",region:"Şimal-Qərb federal dairə",description:"Baltikyanı ərazidə, Avropa ölkələri ilə əhatələnmiş eksklav vilayət.",tags:["Eksklav ərazi", "Balt dənizi sahili", "Kəhrəba yataqları"]},
    RUSMO:{name:"Smolensk vilayəti",center:"Smolensk",area:"49 800 km²",population:"~900 000",region:"Mərkəzi federal dairə",description:"Belarus sərhədində, Napoleon və İkinci Dünya müharibəsi tarixi olan qədim şəhər.",tags:["Qədim qala", "Belarus sərhədi", "Müharibə tarixi"]},
    RUBRY:{name:"Bryansk vilayəti",center:"Bryansk",area:"34 900 km²",population:"~1,1 milyon",region:"Mərkəzi federal dairə",description:"Ukrayna və Belarus sərhədində, sıx meşəli \"üç sərhəd\" vilayəti.",tags:["Üç sərhəd bölgəsi", "Sıx meşələr", "Partizan tarixi"]},
    RUKRS:{name:"Kursk vilayəti",center:"Kursk",area:"29 800 km²",population:"~1,0 milyon",region:"Mərkəzi federal dairə",description:"İkinci Dünya müharibəsinin ən böyük tank döyüşü baş vermiş vilayət.",tags:["Kursk döyüşü", "Dəmir filizi", "Qara torpaq"]},
    RUBEL:{name:"Belqorod vilayəti",center:"Belqorod",area:"27 100 km²",population:"~1,5 milyon",region:"Mərkəzi federal dairə",description:"Ukrayna sərhədində, dəmir filizi ehtiyatları və qara torpaqları ilə tanınan vilayət.",tags:["Dəmir filizi", "Qara torpaq", "Ukrayna sərhədi"]},
    RUVOR:{name:"Voronej vilayəti",center:"Voronej",area:"52 200 km²",population:"~2,3 milyon",region:"Mərkəzi federal dairə",description:"Qara torpaq zonasında, kənd təsərrüfatı və maşınqayırma ilə tanınan iri vilayət.",tags:["Qara torpaq", "Kənd təsərrüfatı", "Sənaye mərkəzi"]},
    RUROS:{name:"Rostov vilayəti",center:"Rostov-na-Donu",area:"100 800 km²",population:"~4,2 milyon",region:"Cənub federal dairə",description:"Don çayı sahilində, cənub Rusiyanın iri sənaye və nəqliyyat mərkəzi.",tags:["Don çayı", "Kazak mədəniyyəti", "Nəqliyyat qovşağı"]},
    RUBU:{name:"Buryatiya Respublikası",center:"Ulan-Ude",area:"351 300 km²",population:"~980 000",region:"Sibir federal dairə",description:"Baykal gölünün şərqində, buddist irsi ilə tanınan Sibir respublikası.",tags:["Baykal gölü", "Buddizm mərkəzi", "Buryat xalqı"]},
    RUTY:{name:"Tıva Respublikası",center:"Kızıl",area:"168 600 km²",population:"~330 000",region:"Sibir federal dairə",description:"Monqolustan sərhədində, köçəri maldarlıq ənənələri qorunan dağlıq respublika.",tags:["Monqolustan sərhədi", "Köçəri maldarlıq", "Dağlıq relyef"]},
    RUZAB:{name:"Zabaykalye diyarı",center:"Çita",area:"431 500 km²",population:"~1,0 milyon",region:"Uzaq Şərq federal dairə",description:"Monqolustan və Çin sərhədində, mədənçilik və heyvandarlıqla tanınan diyar.",tags:["Monqolustan sərhədi", "Mədənçilik", "Çöl landşaftı"]},
    RUAMU:{name:"Amur vilayəti",center:"Blaqoveşşensk",area:"361 900 km²",population:"~750 000",region:"Uzaq Şərq federal dairə",description:"Çin sərhədində, Amur çayı sahilində, kosmodrom (Vostoçnı) yerləşən vilayət.",tags:["Vostoçnı kosmodromu", "Çin sərhədi", "Amur çayı"]},
    RUYEV:{name:"Yəhudi muxtar vilayəti",center:"Birobican",area:"36 300 km²",population:"~150 000",region:"Uzaq Şərq federal dairə",description:"Sovet dövründə yəhudilər üçün yaradılmış, Amur çayı sahilində kiçik vilayət.",tags:["Yəhudi mədəniyyəti tarixi", "Amur çayı", "Kiçik əhali"]},
    RUKHA:{name:"Xabarovsk diyarı",center:"Xabarovsk",area:"787 600 km²",population:"~1,3 milyon",region:"Uzaq Şərq federal dairə",description:"Amur çayı sahilində, Uzaq Şərqin əsas sənaye və nəqliyyat mərkəzi.",tags:["Amur çayı", "Uzaq Şərq mərkəzi", "Sənaye"]},
    RUPRI:{name:"Primorye diyarı",center:"Vladivostok",area:"164 700 km²",population:"~1,8 milyon",region:"Uzaq Şərq federal dairə",description:"Sakit okean sahilində, Vladivostok limanı ilə tanınan Uzaq Şərq diyarı.",tags:["Vladivostok limanı", "Sakit okean sahili", "Balıqçılıq"]},
    RUTYU:{name:"Tümen vilayəti",center:"Tümen",area:"160 100 km²",population:"~1,6 milyon",region:"Ural federal dairə",description:"Qərbi Sibirin neft-qaz sənayesinin inzibati mərkəzi sayılan vilayət.",tags:["Neft-qaz mərkəzi", "Termal sular", "Sibir qapısı"]},
    RUKGN:{name:"Kurqan vilayəti",center:"Kurqan",area:"71 500 km²",population:"~800 000",region:"Ural federal dairə",description:"Qərbi Sibir düzənliyində, kənd təsərrüfatı ilə tanınan Ural vilayəti.",tags:["Qərbi Sibir düzənliyi", "Kənd təsərrüfatı", "Az sənayeli"]},
    RUOMS:{name:"Omsk vilayəti",center:"Omsk",area:"141 100 km²",population:"~1,9 milyon",region:"Sibir federal dairə",description:"İrtış çayı sahilində, Sibirin sənaye və nəqliyyat mərkəzlərindən biri.",tags:["İrtış çayı", "Sənaye mərkəzi", "Sibir dəmiryolu"]},
    RUNVS:{name:"Novosibirsk vilayəti",center:"Novosibirsk",area:"177 800 km²",population:"~2,8 milyon",region:"Sibir federal dairə",description:"Ob çayı sahilində, Sibirin ən böyük şəhəri və elm mərkəzi (Akademqorodok).",tags:["Akademqorodok", "Ob çayı", "Sibirin ən böyük şəhəri"]},
    RUCHE:{name:"Çelyabinsk vilayəti",center:"Çelyabinsk",area:"88 500 km²",population:"~3,4 milyon",region:"Ural federal dairə",description:"Ural dağlarının şərq ətəyində, tank və metallurgiya istehsalı ilə tanınan sənaye mərkəzi.",tags:["Metallurgiya", "Tank sənayesi tarixi", "Ural ətəyi"]},
    RUALT:{name:"Altay diyarı",center:"Barnaul",area:"168 000 km²",population:"~2,1 milyon",region:"Sibir federal dairə",description:"Qərbi Sibirdə, məhsuldar çöl torpaqları olan aqrar diyar.",tags:["Çöl torpaqları", "Kənd təsərrüfatı", "Altay dağları yaxınlığı"]},
    RUORE:{name:"Orenburq vilayəti",center:"Orenburq",area:"123 700 km²",population:"~1,9 milyon",region:"Volqa federal dairə",description:"Ural dağlarının cənubunda, Avropa ilə Asiyanı ayıran sərhəd üzərindəki vilayət.",tags:["Avropa-Asiya sərhədi", "Qazaxıstan sərhədi", "Neft-qaz yataqları"]},
    RUSAR:{name:"Saratov vilayəti",center:"Saratov",area:"101 200 km²",population:"~2,3 milyon",region:"Volqa federal dairə",description:"Volqa çayı sahilində, Qaqarinin eniş yeri olan geniş kənd təsərrüfatı vilayəti.",tags:["Qaqarinin eniş yeri", "Volqa sahili", "Taxılçılıq"]},
    RUAST:{name:"Astraxan vilayəti",center:"Astraxan",area:"49 000 km²",population:"~950 000",region:"Cənub federal dairə",description:"Volqa çayının Xəzər dənizinə töküldüyü deltada, balıqçılıq ilə tanınan vilayət.",tags:["Volqa deltası", "Balıqçılıq", "Xəzər dənizi"]},
    RUVGG:{name:"Volqoqrad vilayəti",center:"Volqoqrad",area:"112 900 km²",population:"~2,4 milyon",region:"Cənub federal dairə",description:"İkinci Dünya müharibəsinin Stalinqrad döyüşü ilə tanınan Volqa sahili vilayəti.",tags:["Stalinqrad döyüşü", "Volqa sahili", "Sənaye mərkəzi"]},
    RUMAG:{name:"Maqadan vilayəti",center:"Maqadan",area:"462 500 km²",population:"~135 000",region:"Uzaq Şərq federal dairə",description:"Oxot dənizi sahilində, qızıl mədənləri ilə tanınan uzaq şimal-şərq vilayəti.",tags:["Qızıl mədənləri", "Oxot dənizi", "Sərt iqlim"]},
    RUSAK:{name:"Saxalin vilayəti",center:"Yujno-Saxalinsk",area:"87 100 km²",population:"~480 000",region:"Uzaq Şərq federal dairə",description:"Saxalin adasında, neft-qaz yataqları və balıqçılıqla tanınan ada vilayəti.",tags:["Ada vilayəti", "Neft-qaz yataqları", "Balıqçılıq"]},
    RUCHU:{name:"Çukot muxtar dairəsi",center:"Anadır",area:"721 500 km²",population:"~50 000",region:"Uzaq Şərq federal dairə",description:"Rusiyanın ən şərq nöqtəsində, Beringov boğazına baxan ən az əhalili Arktika bölgəsi.",tags:["Ən şərq nöqtəsi", "Arktika iqlimi", "Çukçi xalqı"]},
    RUYAN:{name:"Yamalo-Nenets muxtar dairəsi",center:"Salexard",area:"769 300 km²",population:"~540 000",region:"Ural federal dairə",description:"Arktika dairəsində, təbii qaz ehtiyatlarının böyük hissəsinin yerləşdiyi bölgə.",tags:["Təbii qaz ehtiyatları", "Arktika dairəsi", "Nenets xalqı"]},
    RUNEN:{name:"Nenets muxtar dairəsi",center:"Nariyan-Mar",area:"176 700 km²",population:"~44 000",region:"Şimal-Qərb federal dairə",description:"Şimal Buzlu Okean sahilində, neft-qaz yataqları olan az əhalili tundra bölgəsi.",tags:["Tundra landşaftı", "Neft-qaz yataqları", "Ən az əhalili"]},
    RUSA:{name:"Saxa (Yakutiya) Respublikası",center:"Yakutsk",area:"3 083 500 km²",population:"~1,0 milyon",region:"Uzaq Şərq federal dairə",description:"Rusiyanın ən geniş subyekti, dünyanın ən soyuq yaşayış məntəqələrindən birinə malikdir.",tags:["Ən geniş ərazi", "Ən soyuq iqlim", "Almaz mədənləri"]},
    RUSPE:{name:"Sankt-Peterburq",center:"Sankt-Peterburq",area:"1 439 km²",population:"~5,4 milyon",region:"Şimal-Qərb federal dairə",description:"Rusiyanın \"şimal paytaxtı\", Baltik dənizi sahilində mədəni-tarixi mərkəz.",tags:["Şimal paytaxtı", "Ermitaj muzeyi", "Baltik sahili"]},
    RUARK:{name:"Arxangelsk vilayəti",center:"Arxangelsk",area:"589 900 km²",population:"~1,0 milyon",region:"Şimal-Qərb federal dairə",description:"Ağ dəniz sahilində, Rusiyanın tarixi ilk mühüm dəniz limanı.",tags:["Ağ dəniz", "Tarixi liman", "Solovetski adaları"]},
    RUKYA:{name:"Krasnoyarsk diyarı",center:"Krasnoyarsk",area:"2 366 800 km²",population:"~2,9 milyon",region:"Sibir federal dairə",description:"Yenisey çayı sahilində, Rusiyanın ən geniş ərazili subyektlərindən biri.",tags:["Yenisey çayı", "Ən geniş ərazi", "Norilsk metallurgiyası"]},
    RUKL:{name:"Kalmıkiya Respublikası",center:"Elista",area:"74 700 km²",population:"~270 000",region:"Cənub federal dairə",description:"Avropada yeganə buddist respublikası, çöl və səhra landşaftı ilə tanınır.",tags:["Buddizm mərkəzi", "Çöl landşaftı", "Kalmık xalqı"]},
    RUKAM:{name:"Kamçatka diyarı",center:"Petropavlovsk-Kamçatski",area:"464 300 km²",population:"~290 000",region:"Uzaq Şərq federal dairə",description:"Vulkanları və qeyzerləri ilə tanınan, Sakit okean sahilindəki yarımada diyarı.",tags:["Vulkanlar", "Qeyzerlər vadisi", "Sakit okean sahili"]},
    RUBA:{name:"Başqırdıstan Respublikası",center:"Ufa",area:"142 900 km²",population:"~4,0 milyon",region:"Volqa federal dairə",description:"Ural ətəyində, neft sənayesi və başqırd mədəniyyəti ilə tanınan iri respublika.",tags:["Neft sənayesi", "Başqırd mədəniyyəti", "Ural ətəyi"]},
    RUSVE:{name:"Sverdlovsk vilayəti",center:"Yekaterinburq",area:"194 800 km²",population:"~4,3 milyon",region:"Ural federal dairə",description:"Ural dağlarının Avropa-Asiya sərhədində, ağır sənaye və metallurgiya mərkəzi.",tags:["Avropa-Asiya sərhədi", "Metallurgiya", "Yekaterinburq"]},
    RUKHM:{name:"Xantı-Mansi muxtar dairəsi",center:"Xantı-Mansisk",area:"534 800 km²",population:"~1,7 milyon",region:"Ural federal dairə",description:"Rusiyanın əsas neft hasilatı bölgəsi, geniş tayqa və bataqlıqlarla örtülü.",tags:["Əsas neft bölgəsi", "Tayqa meşələri", "Xantı və Mansi xalqları"]},
    RULIP:{name:"Lipetsk vilayəti",center:"Lipetsk",area:"24 100 km²",population:"~1,1 milyon",region:"Mərkəzi federal dairə",description:"Metallurgiya sənayesi ilə tanınan, qara torpaqlı mərkəzi vilayət.",tags:["Metallurgiya", "Qara torpaq", "Sənaye mərkəzi"]},
    RUTAM:{name:"Tambov vilayəti",center:"Tambov",area:"34 500 km²",population:"~990 000",region:"Mərkəzi federal dairə",description:"Qara torpaq zonasında, taxılçılıq və şəkər çuğunduru ilə tanınan aqrar vilayət.",tags:["Qara torpaq", "Taxılçılıq", "Aqrar vilayət"]},
    RUTOM:{name:"Tomsk vilayəti",center:"Tomsk",area:"314 400 km²",population:"~1,1 milyon",region:"Sibir federal dairə",description:"Tom çayı sahilində, universitet şəhəri kimi tanınan neft-qaz zəngin vilayət.",tags:["Universitet şəhəri", "Neft-qaz yataqları", "Tayqa meşələri"]},
    RUTA:{name:"Tatarıstan Respublikası",center:"Kazan",area:"67 800 km²",population:"~4,0 milyon",region:"Volqa federal dairə",description:"Volqa-Kama qovşağında, tatar mədəniyyəti və neft sənayesi ilə tanınan güclü respublika.",tags:["Kazan Kremli", "Neft sənayesi", "Tatar mədəniyyəti"]},
    RUULY:{name:"Ulyanovsk vilayəti",center:"Ulyanovsk",area:"37 200 km²",population:"~1,2 milyon",region:"Volqa federal dairə",description:"Lenin doğulan şəhər, təyyarə istehsalı sənayesi ilə tanınan Volqayanı vilayət.",tags:["Lenin muzeyi", "Təyyarə sənayesi", "Volqa sahili"]},
    RUPNZ:{name:"Penza vilayəti",center:"Penza",area:"43 400 km²",population:"~1,3 milyon",region:"Volqa federal dairə",description:"Qara torpaq zonasında, ədəbi irsi ilə tanınan Volqayanı vilayət.",tags:["Qara torpaq", "Ədəbi irs", "Aqrar sənaye"]},
    RUKEM:{name:"Kemerovo vilayəti",center:"Kemerovo",area:"95 700 km²",population:"~2,6 milyon",region:"Sibir federal dairə",description:"Kuznetsk kömür hövzəsi (Kuzbass) yerləşən, Rusiyanın əsas kömür mədəni bölgəsi.",tags:["Kuzbass kömür hövzəsi", "Mədənçilik", "Ağır sənaye"]},
    RUORL:{name:"Orel vilayəti",center:"Orel",area:"24 700 km²",population:"~700 000",region:"Mərkəzi federal dairə",description:"Turgenev və Bunin kimi yazıçıların vətəni sayılan ədəbi vilayət.",tags:["Ədəbi irs", "Qara torpaq", "Kənd təsərrüfatı"]},
    RUIRK:{name:"İrkutsk vilayəti",center:"İrkutsk",area:"774 800 km²",population:"~2,3 milyon",region:"Sibir federal dairə",description:"Baykal gölünün şimal-qərbində, meşə sənayesi ilə tanınan geniş Sibir vilayəti.",tags:["Baykal gölü", "Meşə sənayesi", "Sibir dəmiryolu"]},
    RUKK:{name:"Xakasiya Respublikası",center:"Abakan",area:"61 600 km²",population:"~530 000",region:"Sibir federal dairə",description:"Sayan dağları ətəyində, hidroenergetika (Sayano-Şuşenskaya) ilə tanınan respublika.",tags:["Sayano-Şuşenskaya SES", "Sayan dağları", "Xakas xalqı"]},
    RUMO:{name:"Mordoviya Respublikası",center:"Saransk",area:"26 200 km²",population:"~780 000",region:"Volqa federal dairə",description:"Mordva xalqının yaşadığı, sənaye və kənd təsərrüfatı olan Volqayanı respublika.",tags:["Mordva xalqı", "Futbol arenası", "Aqrar sənaye"]},
    RUKLU:{name:"Kaluqa vilayəti",center:"Kaluqa",area:"29 800 km²",population:"~1,0 milyon",region:"Mərkəzi federal dairə",description:"Moskvanın cənubunda, avtomobil sənayesi ilə sürətlə inkişaf edən vilayət.",tags:["Avtomobil sənayesi", "Moskva yaxınlığı", "Sənaye zonaları"]},
    RUKOS:{name:"Kostroma vilayəti",center:"Kostroma",area:"60 200 km²",population:"~560 000",region:"Mərkəzi federal dairə",description:"Volqa sahilində, Romanovlar sülaləsinin kökü sayılan tarixi vilayət.",tags:["Romanovlar tarixi", "Volqa sahili", "Taxta sənayesi"]},
    RUYAR:{name:"Yaroslavl vilayəti",center:"Yaroslavl",area:"36 200 km²",population:"~1,2 milyon",region:"Mərkəzi federal dairə",description:"Volqa çayı sahilində, \"Qızıl üzük\" turizm marşrutunun mühüm şəhəri.",tags:["Qızıl üzük marşrutu", "Volqa sahili", "Tarixi arxitektura"]},
    RUVLA:{name:"Vladimir vilayəti",center:"Vladimir",area:"29 000 km²",population:"~1,3 milyon",region:"Mərkəzi federal dairə",description:"Qızıl üzük marşrutunda, qədim rus memarlığı incilərinə malik tarixi vilayət.",tags:["Qızıl üzük marşrutu", "Qədim memarlıq", "UNESCO abidələri"]},
    RURYA:{name:"Ryazan vilayəti",center:"Ryazan",area:"39 600 km²",population:"~1,0 milyon",region:"Mərkəzi federal dairə",description:"Oka çayı sahilində, kənd təsərrüfatı ilə tanınan mərkəzi vilayət.",tags:["Oka çayı", "Kənd təsərrüfatı", "Tarixi mərkəz"]},
    RUIVA:{name:"İvanovo vilayəti",center:"İvanovo",area:"21 400 km²",population:"~935 000",region:"Mərkəzi federal dairə",description:"Toxuculuq sənayesi ilə tanınan, \"Rusiyanın Manchesteri\" adlanan vilayət.",tags:["Toxuculuq sənayesi", "Sənaye mərkəzi", "Kiçik ərazi"]},
    RUNIZ:{name:"Nijni Novqorod vilayəti",center:"Nijni Novqorod",area:"76 600 km²",population:"~3,1 milyon",region:"Volqa federal dairə",description:"Volqa və Oka çaylarının qovuşduğu yerdə, iri sənaye mərkəzi olan vilayət.",tags:["Volqa-Oka qovşağı", "Avtomobil sənayesi", "Sərgi tarixi"]},
    RUTUL:{name:"Tula vilayəti",center:"Tula",area:"25 700 km²",population:"~1,4 milyon",region:"Mərkəzi federal dairə",description:"Silah istehsalı və mətbəx sənəti (Tula pryaniki) ilə tanınan sənaye vilayəti.",tags:["Silah sənayesi", "Tula pryaniki", "Yasnaya Polyana"]},
    RUCU:{name:"Çuvaşiya Respublikası",center:"Çeboksarı",area:"18 300 km²",population:"~1,2 milyon",region:"Volqa federal dairə",description:"Volqa sahilində, çuvaş xalqının milli respublikası.",tags:["Çuvaş xalqı", "Volqa sahili", "Maşınqayırma"]},
    RUVLG:{name:"Vologda vilayəti",center:"Vologda",area:"144 500 km²",population:"~1,1 milyon",region:"Şimal-Qərb federal dairə",description:"Şimal Dvina hövzəsində, dantel toxuculuğu və taxta sənayesi ilə tanınan vilayət.",tags:["Dantel toxuculuğu", "Taxta sənayesi", "Şimal təbiəti"]},
    RUNGR:{name:"Novqorod vilayəti",center:"Veliki Novqorod",area:"54 500 km²",population:"~580 000",region:"Şimal-Qərb federal dairə",description:"Qədim Rus dövlətçiliyinin beşiyi sayılan tarixi vilayət.",tags:["Qədim Rus dövlətçiliyi", "UNESCO abidələri", "Tarixi mərkəz"]},
    RUTVE:{name:"Tver vilayəti",center:"Tver",area:"84 200 km²",population:"~1,2 milyon",region:"Mərkəzi federal dairə",description:"Volqa çayının başlanğıcında yerləşən, meşəli-göllü mərkəzi vilayət.",tags:["Volqanın başlanğıcı", "Meşəli-göllü landşaft", "Moskva-Peterburq yolu"]},
    RUMOW:{name:"Moskva vilayəti",center:"Krasnoqorsk",area:"44 300 km²",population:"~8,5 milyon",region:"Mərkəzi federal dairə",description:"Paytaxtı əhatə edən, sıx sənayeləşmiş və ən çox əhalisi olan vilayət.",tags:["Paytaxt ətrafı", "Sıx sənaye", "Ən çox əhalili vilayət"]},
    RUMOS:{name:"Moskva",center:"Moskva",area:"2 511 km²",population:"~13,1 milyon",region:"Mərkəzi federal dairə",description:"Rusiyanın paytaxtı və ən böyük şəhəri, ölkənin siyasi-iqtisadi mərkəzi.",tags:["Paytaxt", "Ən böyük əhali", "Kreml"]},
    RUME:{name:"Mari El Respublikası",center:"Yoşkar-Ola",area:"23 200 km²",population:"~670 000",region:"Volqa federal dairə",description:"Volqa sahilində, mari xalqının milli respublikası.",tags:["Mari xalqı", "Volqa sahili", "Meşəli landşaft"]},
    RUKIR:{name:"Kirov vilayəti",center:"Kirov",area:"120 400 km²",population:"~1,2 milyon",region:"Volqa federal dairə",description:"Vyatka çayı sahilində, meşə sənayesi ilə tanınan geniş vilayət.",tags:["Vyatka çayı", "Meşə sənayesi", "Dımkovo oyuncaqları"]},
    RUUD:{name:"Udmurtiya Respublikası",center:"İjevsk",area:"42 100 km²",population:"~1,5 milyon",region:"Volqa federal dairə",description:"Kalaşnikov silahının vətəni sayılan, meşəli Ural ətəyi respublikası.",tags:["Kalaşnikov muzeyi", "Silah sənayesi", "Ural ətəyi"]},
    RUKO:{name:"Komi Respublikası",center:"Sıktıvkar",area:"416 800 km²",population:"~770 000",region:"Şimal-Qərb federal dairə",description:"Ural dağlarının şimalında, meşə və neft-qaz ehtiyatları olan geniş respublika.",tags:["Neft-qaz ehtiyatları", "Tayqa meşələri", "Ural dağları"]},
    RUPER:{name:"Perm diyarı",center:"Perm",area:"160 200 km²",population:"~2,5 milyon",region:"Volqa federal dairə",description:"Ural dağlarının qərb ətəyində, kimya sənayesi ilə tanınan geniş diyar.",tags:["Ural dağları", "Kimya sənayesi", "Şor yataqları"]},
    RUSAM:{name:"Samara vilayəti",center:"Samara",area:"53 600 km²",population:"~3,1 milyon",region:"Volqa federal dairə",description:"Volqa çayı üzərində, kosmos və avtomobil sənayesi ilə tanınan iri vilayət.",tags:["Kosmos sənayesi", "Volqa çayı", "AvtoVAZ zavodu"]},
    RUSTA:{name:"Stavropol diyarı",center:"Stavropol",area:"66 200 km²",population:"~2,8 milyon",region:"Şimali Qafqaz federal dairə",description:"Qafqazqabağı düzənlikdə, mineral bulaqları (Kislovodsk) ilə tanınan diyar.",tags:["Mineral bulaqlar", "Kislovodsk kurortu", "Aqrar torpaqlar"]},
    RUAD:{name:"Adıgeya Respublikası",center:"Maykop",area:"7 800 km²",population:"~500 000",region:"Cənub federal dairə",description:"Qafqaz dağlarının ətəyində, adıgey xalqının milli respublikası.",tags:["Adıgey xalqı", "Qafqaz ətəyi", "Kiçik respublika"]}
};

/* =========================================
   ELEMENTLƏR
========================================= */

const paths =
document.querySelectorAll("#russiaMap path");

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
