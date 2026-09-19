

/* =========================================
   RAYON MƏLUMATLARI
========================================= */

const regions = {
    AZQAZ:{name:"Qazax",center:"Qazax şəhəri",area:"1 571 km²",population:"~90 000",region:"Gəncə-Qazax",description:"Gürcüstan və Ermənistanla sərhəddə yerləşən, qədim tarixi və Kür çayı sahili ilə tanınan aqrar rayon.",tags:["Kür çayı", "Sərhəd bölgəsi", "Qədim tarix", "Kənd təsərrüfatı"]},
    AZAGA:{name:"Ağstafa",center:"Ağstafa şəhəri",area:"705 km²",population:"~72 000",region:"Gəncə-Qazax",description:"Gürcüstan sərhədində, Tərtər düzündə yerləşən, dəmiryol qovşağı kimi tanınan rayon.",tags:["Dəmiryol qovşağı", "Tərəkəmə düzü", "Sərhəd ticarəti"]},
    AZTOV:{name:"Tovuz",center:"Tovuz şəhəri",area:"1 050 km²",population:"~130 000",region:"Gəncə-Qazax",description:"Gürcüstan və Ermənistanla həmsərhəd, üzümçülük və şərabçılıqla məşhur bölgə.",tags:["Üzümçülük", "Böyük Qafqaz ətəkləri", "Sərhəd rayonu"]},
    AZGAD:{name:"Gədəbəy",center:"Gədəbəy şəhəri",area:"1 275 km²",population:"~64 000",region:"Gəncə-Qazax",description:"XIX əsrdən mis-kükürd yataqları ilə tanınan, dağlıq meşəli ərazi.",tags:["Mis-kükürd mədənləri", "Dağlıq relyef", "Meşələr"]},
    AZDAS:{name:"Daşkəsən",center:"Daşkəsən şəhəri",area:"1 005 km²",population:"~62 000",region:"Gəncə-Qazax",description:"Dəmir filizi yataqları və Kiçik Qafqazın sərin iqlimli dağ qəsəbələri ilə tanınır.",tags:["Dəmir filizi", "Dağ iqlimi", "Kiçik Qafqaz"]},
    AZKAL:{name:"Kəlbəcər",center:"Kəlbəcər şəhəri",area:"1 936 km²",population:"bərpa olunur",region:"Kəlbəcər-Laçın",description:"Böyük Qafqazın cənub yamaclarında, İstisu mineral bulaqları və dağ gölləri ilə tanınan ərazi.",tags:["İstisu bulaqları", "Dağ gölləri", "Yüksək dağlıq"]},
    AZLAC:{name:"Laçın",center:"Laçın şəhəri",area:"1 875 km²",population:"bərpa olunur",region:"Kəlbəcər-Laçın",description:"Sıx meşələri və dağ keçidləri ilə tanınan, Qarabağı Ermənistanla birləşdirən dəhlizin adını daşıyan rayon.",tags:["Meşələr", "Dağ keçidi", "Laçın dəhlizi"]},
    AZQBI:{name:"Qubadlı",center:"Qubadlı şəhəri",area:"802 km²",population:"bərpa olunur",region:"Kəlbəcər-Laçın",description:"Bərpa dövründə yenidən qurulan, Bərgüşad çayı vadisində yerləşən aqrar rayon.",tags:["Bərgüşad çayı", "Bərpa ərazisi", "Aqrar təsərrüfat"]},
    AZZAN:{name:"Zəngilan",center:"Zəngilan şəhəri",area:"707 km²",population:"bərpa olunur",region:"Kəlbəcər-Laçın",description:"Ermənistan və İranla sərhəddə, nadir  ağdaş çinarı meşə qoruğu ilə tanınan rayon.",tags:["Çinar meşə qoruğu", "Araz çayı", "Sərhəd rayonu"]},
    AZSAR:{name:"Şərur",center:"Şərur şəhəri",area:"815 km²",population:"~113 000",region:"Naxçıvan MR",description:"Araz çayı düzənliyində, Naxçıvanın ən böyük əkinçilik rayonlarından biri.",tags:["Araz düzənliyi", "Taxılçılıq", "Naxçıvan MR"]},
    AZSAD:{name:"Sədərək",center:"Sədərək şəhəri",area:"154 km²",population:"~15 000",region:"Naxçıvan MR",description:"Türkiyə ilə sərhədi olan, Naxçıvanın ən kiçik ərazili rayonu.",tags:["Türkiyə sərhədi", "Kiçik rayon", "Araz çayı"]},
    AZKAN:{name:"Kəngərli",center:"Şahtaxtı",area:"697 km²",population:"~52 000",region:"Naxçıvan MR",description:"2004-cü ildə yaradılmış, Araz çayı sahilində yerləşən Naxçıvan rayonlarından biri.",tags:["Araz çayı", "Yeni rayon", "Bostançılıq"]},
    AZBAB:{name:"Babək",center:"Babək şəhəri",area:"662 km²",population:"~90 000",region:"Naxçıvan MR",description:"Naxçıvan şəhərinin ətrafını əhatə edən, tarixi Əshabi-Kəhf ziyarətgahı yerləşən rayon.",tags:["Əshabi-Kəhf", "Duz mağaraları", "Naxçıvan ətrafı"]},
    AZSAH:{name:"Şahbuz",center:"Şahbuz şəhəri",area:"567 km²",population:"~28 000",region:"Naxçıvan MR",description:"Naxçıvanın dağlıq şimal hissəsində, Batabat gölü və dağ iqlimi ilə tanınan rayon.",tags:["Batabat gölü", "Dağ iqlimi", "Milli park"]},
    AZCUL:{name:"Culfa",center:"Culfa şəhəri",area:"1 002 km²",population:"~40 000",region:"Naxçıvan MR",description:"Araz çayı sahilində, tarixi İpək Yolu üzərində yerləşən sərhəd rayonu.",tags:["İpək yolu", "Araz çayı", "Tarixi abidələr"]},
    AZORD:{name:"Ordubad",center:"Ordubad şəhəri",area:"1 005 km²",population:"~46 000",region:"Naxçıvan MR",description:"Zəngəzur dağları ətəyində, meyvəçiliyi (əsasən ərik) ilə məşhur qədim şəhər-rayon.",tags:["Meyvəçilik", "Zəngəzur dağları", "Qədim memarlıq"]},
    AZBAL:{name:"Balakən",center:"Balakən şəhəri",area:"550 km²",population:"~90 000",region:"Şəki-Zaqatala",description:"Gürcüstanla sərhəddə, sıx meşələri və Katex çayı ilə tanınan bölgə.",tags:["Katex çayı", "Meşələr", "Gürcüstan sərhədi"]},
    AZZAQ:{name:"Zaqatala",center:"Zaqatala şəhəri",area:"1 348 km²",population:"~130 000",region:"Şəki-Zaqatala",description:"Böyük Qafqazın cənub yamaclarında yerləşən, zəngin meşələri və dağlıq relyefi ilə seçilən rayon.",tags:["Böyük Qafqaz", "Meşələr", "Dağlıq relyef", "Milli park"]},
    AZXAC:{name:"Xaçmaz",center:"Xaçmaz şəhəri",area:"1 070 km²",population:"~168 000",region:"Quba-Xaçmaz",description:"Xəzər sahilində və Böyük Qafqaz ətəyində, bostançılıq və turizmi ilə tanınan rayon.",tags:["Xəzər sahili", "Bostançılıq", "Turizm"]},
    AZQUS:{name:"Qusar",center:"Qusar şəhəri",area:"869 km²",population:"~95 000",region:"Quba-Xaçmaz",description:"Şahdağ dağının ətəyində, qış turizmi mərkəzi Şahdağ ilə tanınan bölgə.",tags:["Şahdağ", "Qış turizmi", "Dağ kəndləri"]},
    AZOGU:{name:"Oğuz",center:"Oğuz şəhəri",area:"615 km²",population:"~34 000",region:"Şəki-Zaqatala",description:"Böyük Qafqaz ətəyində, meşələri və İlisu qoruğuna yaxınlığı ilə tanınan kiçik rayon.",tags:["İlisu qoruğu", "Meşələr", "Dağətəyi"]},
    AZSAK:{name:"Şəki",center:"Şəki şəhəri",area:"2 430 km²",population:"~190 000",region:"Şəki-Zaqatala",description:"Azərbaycanın şimal-qərbində yerləşən, zəngin tarixi və dağlıq təbiəti ilə məşhur olan rayon.",tags:["Tarix", "Böyük Qafqaz", "Turizm", "Xan sarayı"]},
    AZQAX:{name:"Qax",center:"Qax şəhəri",area:"980 km²",population:"~52 000",region:"Şəki-Zaqatala",description:"Sıx meşələri, alban dövrü abidələri və dağ kəndləri ilə tanınan bölgə.",tags:["Alban abidələri", "Meşələr", "Dağ kəndləri"]},
    AZQAB:{name:"Qəbələ",center:"Qəbələ şəhəri",area:"1 548 km²",population:"~110 000",region:"Şəki-Zaqatala",description:"Böyük Qafqazın cənub yamaclarında yerləşən Qəbələ Azərbaycanın mühüm turizm bölgələrindəndir.",tags:["Böyük Qafqaz", "Turizm", "Dağlar", "Tufandağ"]},
    AZSMX:{name:"Samux",center:"Samux şəhəri",area:"1 105 km²",population:"~50 000",region:"Gəncə-Qazax",description:"Kür çayı sahilində, meşə-çöl landşaftı və ovçuluq təsərrüfatları ilə tanınan rayon.",tags:["Kür çayı", "Meşə-çöl landşaftı", "Ovçuluq"]},
    AZIMI:{name:"İmişli",center:"İmişli şəhəri",area:"2 320 km²",population:"~135 000",region:"Muğan-Salyan",description:"Kür-Araz ovalığında, pambıqçılıq və taxılçılıqla tanınan iri aqrar rayon.",tags:["Kür-Araz ovalığı", "Pambıqçılıq", "Aqrar rayon"]},
    AZBIL:{name:"Biləsuvar",center:"Biləsuvar şəhəri",area:"1 350 km²",population:"~105 000",region:"Muğan-Salyan",description:"Muğan düzündə, İranla sərhəddə yerləşən əkinçilik rayonu.",tags:["Muğan düzü", "İran sərhədi", "Taxılçılıq"]},
    AZCAL:{name:"Cəlilabad",center:"Cəlilabad şəhəri",area:"1 391 km²",population:"~140 000",region:"Lənkəran-Astara",description:"Muğan düzündə, tərəvəzçilik və taxılçılıqla tanınan iri rayon.",tags:["Muğan düzü", "Tərəvəzçilik", "Aqrar təsərrüfat"]},
    AZYAR:{name:"Yardımlı",center:"Yardımlı şəhəri",area:"809 km²",population:"~50 000",region:"Lənkəran-Astara",description:"Talış dağlarının ətəyində, meşəli və nəm iqlimli dağ rayonu.",tags:["Talış dağları", "Meşələr", "Dağ iqlimi"]},
    AZLER:{name:"Lerik",center:"Lerik şəhəri",area:"869 km²",population:"~48 000",region:"Lənkəran-Astara",description:"Uzunömürlülüyü ilə məşhur, Talış dağlarında yerləşən subtropik-dağ rayonu.",tags:["Uzunömürlülük", "Talış dağları", "Subtropik iqlim"]},
    AZCAB:{name:"Cəbrayıl",center:"Cəbrayıl şəhəri",area:"1 050 km²",population:"bərpa olunur",region:"Aran",description:"Araz çayı sahilində, bərpa dövründə yenidən qurulan qədim rayon.",tags:["Araz çayı", "Bərpa ərazisi", "Qədim şəhər"]},
    AZFUZ:{name:"Füzuli",center:"Füzuli şəhəri",area:"1 386 km²",population:"bərpa olunur",region:"Aran",description:"Qarabağ ovalığında,  Ağoğlan çayı sahilində yerləşən, adını böyük şairdən alan rayon.",tags:["Qarabağ ovalığı", "Bərpa ərazisi", "Aqrar rayon"]},
    AZBEY:{name:"Beyləqan",center:"Beyləqan şəhəri",area:"1 349 km²",population:"~100 000",region:"Muğan-Salyan",description:"Qədim Beyləqan şəhərinin xarabalıqları yaxınlığında, pambıqçılıqla tanınan aran rayonu.",tags:["Qədim şəhər xarabalıqları", "Pambıqçılıq", "Aran düzü"]},
    AZAST:{name:"Astara",center:"Astara şəhəri",area:"755 km²",population:"~95 000",region:"Lənkəran-Astara",description:"İranla sərhəddə, Xəzər sahilində subtropik iqlimi və çayçılığı ilə tanınan rayon.",tags:["Xəzər sahili", "Subtropik iqlim", "Çayçılıq", "İran sərhədi"]},
    AZSBN:{name:"Şabran",center:"Şabran şəhəri",area:"1 244 km²",population:"~65 000",region:"Quba-Xaçmaz",description:"Xəzər sahilində, neft-qaz sənayesi tarixinə malik keçmiş Dəvəçi rayonu.",tags:["Xəzər sahili", "Neft sənayesi tarixi", "Aqrar rayon"]},
    AZSIY:{name:"Siyəzən",center:"Siyəzən şəhəri",area:"286 km²",population:"~40 000",region:"Quba-Xaçmaz",description:"Xəzər dənizi sahilində, kiçik ərazili, üzümçülük və bağçılıqla tanınan rayon.",tags:["Xəzər sahili", "Üzümçülük", "Kiçik rayon"]},
    AZXIZ:{name:"Xızı",center:"Xızı şəhəri",area:"693 km²",population:"~13 000",region:"Abşeron-Xızı",description:"Böyük Qafqazın cənub-şərq ətəyində, dağlıq və az əhalili rayon.",tags:["Dağlıq relyef", "Az əhalili", "Qoruq zonaları"]},
    AZSM:{name:"Sumqayıt",center:"Sumqayıt şəhəri",area:"83 km²",population:"~340 000",region:"Abşeron-Xızı",description:"Abşeron iqtisadi rayonunun mühüm sənaye və şəhər mərkəzlərindən biridir.",tags:["Sənaye", "Xəzər dənizi", "Kimya sənayesi"]},
    AZBA:{name:"Bakı",center:"Bakı şəhəri",area:"2 140 km²",population:"2,3+ milyon",region:"Bakı",description:"Azərbaycanın paytaxtı və Xəzər dənizinin qərb sahilində yerləşən ən böyük şəhər.",tags:["Paytaxt", "Xəzər dənizi", "Neft sənayesi", "Metropol"]},
    AZSAL:{name:"Salyan",center:"Salyan şəhəri",area:"1 764 km²",population:"~140 000",region:"Muğan-Salyan",description:"Kür çayının Xəzərə töküldüyü ərazidə, balıqçılıq və pambıqçılıqla tanınan rayon.",tags:["Kür çayının deltası", "Balıqçılıq", "Pambıqçılıq"]},
    AZNEF:{name:"Neftçala",center:"Neftçala şəhəri",area:"1 050 km²",population:"~85 000",region:"Muğan-Salyan",description:"Xəzər sahilində, adından da göründüyü kimi neft hasilatı tarixi olan rayon.",tags:["Xəzər sahili", "Neft tarixi", "Kür çayı deltası"]},
    AZLAN:{name:"Lənkəran",center:"Lənkəran şəhəri",area:"1 540 km²",population:"~235 000",region:"Lənkəran-Astara",description:"Azərbaycanın cənubunda, Xəzər dənizi sahilində yerləşən subtropik iqlimli bölgə.",tags:["Subtropik iqlim", "Xəzər sahili", "Lənkəran ovalığı", "Çayçılıq"]},
    AZMAS:{name:"Masallı",center:"Masallı şəhəri",area:"719 km²",population:"~205 000",region:"Lənkəran-Astara",description:"Talış dağları ilə Xəzər arasında, sıx meşələri və çayçılığı ilə tanınan rayon.",tags:["Talış dağları", "Çayçılıq", "Sıx meşələr"]},
    AZLA:{name:"Lənkəran şəhəri",center:"Lənkəran",area:"—",population:"Lənkəran rayonu tərkibində",region:"Lənkəran-Astara",description:"Lənkəran rayonunun mərkəzi olan, Xəzər sahilində yerləşən tarixi liman şəhəri.",tags:["Liman şəhəri", "Xəzər sahili", "Tarixi mərkəz"]},
    AZNX:{name:"Naxçıvan",center:"Naxçıvan şəhəri",area:"—",population:"~90 000",region:"Naxçıvan MR",description:"Naxçıvan Muxtar Respublikasının paytaxtı, Araz çayı sahilində qədim şəhər.",tags:["Muxtar respublika paytaxtı", "Qədim tarix", "Araz çayı"]},
    AZXCI:{name:"Xocalı",center:"Xocalı şəhəri",area:"1 058 km²",population:"bərpa olunur",region:"Yuxarı Qarabağ",description:"Qarabağ dağlıq ərazisində, hava limanı və 1992-ci il faciəsi ilə tanınan rayon.",tags:["Qarabağ dağlığı", "Bərpa ərazisi", "Hava limanı"]},
    AZAGM:{name:"Ağdam",center:"Ağdam şəhəri",area:"1 154 km²",population:"bərpa olunur",region:"Aran",description:"Qarabağın  Xirosiması adlandırılan, bərpa dövründə intensiv tikinti aparılan iri rayon.",tags:["Bərpa ərazisi", "Qarabağ düzü", "Yeni tikinti"]},
    AZTAR:{name:"Tərtər",center:"Tərtər şəhəri",area:"955 km²",population:"~100 000",region:"Aran",description:"Tərtər çayı sahilində, Qarabağla həmsərhəd aqrar rayon.",tags:["Tərtər çayı", "Aqrar rayon", "Qarabağ həmsərhədliyi"]},
    AZGOR:{name:"Goranboy",center:"Goranboy şəhəri",area:"1 917 km²",population:"~100 000",region:"Gəncə-Qazax",description:"Kür-Araz ovalığından Kiçik Qafqaza uzanan, geniş ərazili qarışıq relyefli rayon.",tags:["Qarışıq relyef", "Kür-Araz ovalığı", "Kiçik Qafqaz"]},
    AZXVD:{name:"Xocavənd",center:"Xocavənd şəhəri",area:"1 458 km²",population:"bərpa olunur",region:"Yuxarı Qarabağ",description:"Qarabağ dağlıq ərazisində, meşəli dağətəyi landşaftı olan bərpa rayonu.",tags:["Dağətəyi landşaft", "Bərpa ərazisi", "Meşələr"]},
    AZHAC:{name:"Hacıqabul",center:"Hacıqabul şəhəri",area:"967 km²",population:"~60 000",region:"Şirvan-Hacıqabul",description:"Böyükşor və Ağzıbir gölləri yaxınlığında, Bakı-Ələt magistralı üzərində yerləşən rayon.",tags:["Ağzıbir gölü", "Nəqliyyat qovşağı", "Aran düzü"]},
    AZABS:{name:"Abşeron",center:"Xırdalan şəhəri",area:"920 km²",population:"~200 000",region:"Abşeron-Xızı",description:"Bakının ətrafını əhatə edən, sürətlə urbanləşən, sənaye və yaşayış zonaları olan rayon.",tags:["Xırdalan", "Sürətli urbanizasiya", "Bakı ətrafı"]},
    AZGYG:{name:"Göygöl",center:"Göygöl şəhəri",area:"522 km²",population:"~65 000",region:"Gəncə-Qazax",description:"Kiçik Qafqazda, adını Göygöl gölündən alan, meşəli dağ-mesə relyefli rayon.",tags:["Göygöl gölü", "Milli park", "Alman koloniyası tarixi"]},
    AZKUR:{name:"Kürdəmir",center:"Kürdəmir şəhəri",area:"1 470 km²",population:"~115 000",region:"Şirvan-Hacıqabul",description:"Kür-Araz ovalığında, üzümçülük və tərəvəzçiliklə tanınan mərkəzi Aran rayonu.",tags:["Kür-Araz ovalığı", "Üzümçülük", "Tərəvəzçilik"]},
    AZZAR:{name:"Zərdab",center:"Zərdab şəhəri",area:"480 km²",population:"~55 000",region:"Aran",description:"Kür çayı sahilində, kiçik ərazili, pambıqçılıq və taxılçılıqla tanınan rayon.",tags:["Kür çayı", "Pambıqçılıq", "Kiçik rayon"]},
    AZSAB:{name:"Sabirabad",center:"Sabirabad şəhəri",area:"1 802 km²",population:"~185 000",region:"Muğan-Salyan",description:"Kür çayı sahilində, pambıqçılıq və taxılçılıqla tanınan iri aran rayonu.",tags:["Kür çayı", "Pambıqçılıq", "İri aqrar rayon"]},
    AZSR:{name:"Şirvan",center:"Şirvan şəhəri",area:"72 km²",population:"~90 000",region:"Şirvan-Hacıqabul",description:"Kür çayının aşağı axarı yaxınlığında yerləşən, keçmiş neft sənayesi mərkəzi şəhər.",tags:["Kür çayı", "Neft sənayesi tarixi", "Aran düzü"]},
    AZSAT:{name:"Saatlı",center:"Saatlı şəhəri",area:"1 037 km²",population:"~90 000",region:"Muğan-Salyan",description:"Muğan düzündə, taxılçılıq və pambıqçılıqla tanınan aqrar rayon.",tags:["Muğan düzü", "Taxılçılıq", "Aqrar rayon"]},
    AZBAR:{name:"Bərdə",center:"Bərdə şəhəri",area:"1 353 km²",population:"~165 000",region:"Aran",description:"Orta əsrlərdə Qafqazın ən böyük şəhərlərindən olan qədim Bərdə şəhərinin yerləşdiyi rayon.",tags:["Qədim Bərdə şəhəri", "Tərtər çayı", "Kənd təsərrüfatı"]},
    AZSKR:{name:"Şəmkir",center:"Şəmkir şəhəri",area:"1 604 km²",population:"~200 000",region:"Gəncə-Qazax",description:"Kür çayı sahilində, iri Şəmkir su anbarı və üzümçülüklə tanınan rayon.",tags:["Şəmkir su anbarı", "Üzümçülük", "Kür çayı"]},
    AZAGU:{name:"Ağsu",center:"Ağsu şəhəri",area:"706 km²",population:"~75 000",region:"Şirvan-Hacıqabul",description:"Böyük Qafqazın cənub ətəyi ilə Kür-Araz ovalığı arasında yerləşən keçid zonası rayonu.",tags:["Keçid landşaftı", "Kənd təsərrüfatı", "Böyük Qafqaz ətəyi"]},
    AZSMI:{name:"Şamaxı",center:"Şamaxı şəhəri",area:"1 626 km²",population:"~100 000",region:"Şirvan-Hacıqabul",description:"Qədim Şirvanşahlar dövlətinin paytaxtı olmuş, Şamaxı Astrofizika Rəsədxanası ilə tanınan tarixi şəhər.",tags:["Şirvanşahlar tarixi", "Astrofizika rəsədxanası", "Üzümçülük"]},
    AZQBA:{name:"Quba",center:"Quba şəhəri",area:"1 730 km²",population:"~175 000",region:"Quba-Xaçmaz",description:"Şahdağ ətəyində, xalçaçılığı, meyvəçiliyi və dağ kəndləri ilə məşhur tarixi rayon.",tags:["Xalçaçılıq", "Şahdağ", "Meyvəçilik"]},
    AZUCA:{name:"Ucar",center:"Ucar şəhəri",area:"470 km²",population:"~55 000",region:"Aran",description:"Kür-Araz ovalığında, taxılçılıq və üzümçülüklə tanınan kiçik aran rayonu.",tags:["Kür-Araz ovalığı", "Taxılçılıq", "Kiçik rayon"]},
    AZQOB:{name:"Qobustan",center:"Qobustan şəhəri",area:"1 543 km²",population:"~55 000",region:"Şirvan-Hacıqabul",description:"YUNESKO-nun Ümumdünya İrs siyahısındakı Qobustan qaya rəsmləri qoruğunun yerləşdiyi rayon.",tags:["Qaya rəsmləri", "YUNESKO obyekti", "Palçıq vulkanları"]},
    AZISM:{name:"İsmayıllı",center:"İsmayıllı şəhəri",area:"2 070 km²",population:"~85 000",region:"Şəki-Zaqatala",description:"Böyük Qafqazın cənub yamaclarında, ekoturizm və şərabçılıqla tanınan dağətəyi rayon.",tags:["Ekoturizm", "Şərabçılıq", "Böyük Qafqaz ətəyi"]},
    AZYEV:{name:"Yevlax",center:"Yevlax şəhəri",area:"1 707 km²",population:"~110 000",region:"Aran",description:"Kür çayı sahilində, Azərbaycanın mühüm nəqliyyat qovşaqlarından biri olan mərkəzi rayon.",tags:["Nəqliyyat qovşağı", "Kür çayı", "Kənd təsərrüfatı"]},
    AZGA:{name:"Gəncə",center:"Gəncə şəhəri",area:"110 km²",population:"~335 000",region:"Gəncə-Qazax",description:"Azərbaycanın ikinci böyük şəhəri və mühüm iqtisadi-mədəni mərkəzlərindən biridir.",tags:["İkinci böyük şəhər", "Mədəniyyət mərkəzi", "Kiçik Qafqaz"]},
    AZMI:{name:"Mingəçevir",center:"Mingəçevir şəhəri",area:"208 km²",population:"~105 000",region:"Aran",description:"Kür çayı üzərindəki iri su elektrik stansiyası və süni Mingəçevir gölü ilə tanınan enerji şəhəri.",tags:["Su elektrik stansiyası", "Mingəçevir gölü", "Enerji mərkəzi"]},
    AZGOY:{name:"Göyçay",center:"Göyçay şəhəri",area:"1 010 km²",population:"~110 000",region:"Aran",description:"Azərbaycanın nar paytaxtı sayılan, hər il Nar Festivalı keçirilən rayon.",tags:["Nar Festivalı", "Bağçılıq", "Aran düzü"]},
    AZAGS:{name:"Ağdaş",center:"Ağdaş şəhəri",area:"842 km²",population:"~70 000",region:"Aran",description:"Kür çayı yaxınlığında, ipəkçilik tarixi və bağçılıqla tanınan kiçik rayon.",tags:["İpəkçilik tarixi", "Bağçılıq", "Kür çayı yaxınlığı"]},
    AZAGC:{name:"Ağcabədi",center:"Ağcabədi şəhəri",area:"1 176 km²",population:"~140 000",region:"Aran",description:"Qarabağ ovalığında, pambıqçılıq və taxılçılıqla tanınan iri aqrar rayon.",tags:["Qarabağ ovalığı", "Pambıqçılıq", "Aqrar rayon"]},
    AZXA:{name:"Xankəndi",center:"Xankəndi şəhəri",area:"—",population:"bərpa olunur",region:"Yuxarı Qarabağ",description:"Qarabağ dağlıq ərazisinin ən böyük şəhəri, 2023-cü ildən Azərbaycan nəzarətindədir.",tags:["Qarabağ dağlığı", "Bərpa dövrü", "Dağ şəhəri"]},
    AZYE:{name:"Yevlax şəhəri",center:"Yevlax",area:"—",population:"Yevlax rayonu tərkibində",region:"Aran",description:"Yevlax rayonunun mərkəzi, mühüm dəmiryol və avtomobil yolları qovşağı olan şəhər.",tags:["Nəqliyyat qovşağı", "Kür çayı körpüsü", "Yevlax rayonu mərkəzi"]},
    AZNA:{name:"Naftalan",center:"Naftalan şəhəri",area:"88 km²",population:"~5 000",region:"Gəncə-Qazax",description:"Müalicəvi neft növü olan naftalanla müalicə mərkəzi kimi dünyada tanınan kiçik kurort şəhəri.",tags:["Naftalan nefti", "Müalicə turizmi", "Kurort şəhəri"]},
    AZSA:{name:"Şəki şəhəri",center:"Şəki",area:"—",population:"Şəki rayonu tərkibində",region:"Şəki-Zaqatala",description:"Xan sarayı və UNESCO-nun Ümumdünya İrs siyahısına daxil edilmiş tarixi mərkəzi ilə məşhur şəhər.",tags:["Xan sarayı", "UNESCO obyekti", "Karvansaralar"]},
    AZSUS:{name:"Şuşa",center:"Şuşa şəhəri",area:"288 km²",population:"bərpa olunur",region:"Yuxarı Qarabağ",description:"Azərbaycan mədəniyyətinin, musiqisinin və poeziyasının beşiyi sayılan, 2020-ci ildən azad edilmiş dağ qalası şəhəri.",tags:["Mədəniyyət paytaxtı", "Qala şəhəri", "Bərpa dövrü", "Dağlıq relyef"]}
};

/* =========================================
   ELEMENTLƏR
========================================= */

const paths =
document.querySelectorAll("#azerbaijanMap path");

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
   RAYONU GÖSTƏR
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


