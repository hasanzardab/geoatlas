

/* =========================================
   OSTAN MƏLUMATLARI
========================================= */

const regions = {
    IR02:{name:"Qərbi Azərbaycan",center:"Urmiya",area:"37 411 km²",population:"~3,3 milyon",region:"Şimal-qərb",description:"Urmiya gölü sahilində, Türkiyə və İraq sərhədində çoxmillətli ostan.",tags:["Urmiya gölü", "Sərhəd bölgəsi", "Çoxmillətli əhali"]},
    IR01:{name:"Şərqi Azərbaycan",center:"Təbriz",area:"45 481 km²",population:"~4,1 milyon",region:"Şimal-qərb",description:"Təbriz şəhəri mərkəz olmaqla, Azərbaycan türklərinin sıx yaşadığı tarixi bölgə.",tags:["Təbriz bazarı", "Azərbaycan türkləri", "Urmiya gölü yaxınlığı"]},
    IR03:{name:"Ərdəbil",center:"Ərdəbil",area:"17 953 km²",population:"~1,3 milyon",region:"Şimal-qərb",description:"Səfəvi sülaləsinin kökü sayılan, Savalan dağı ətəyindəki dağlıq ostan.",tags:["Savalan dağı", "Səfəvi irsi", "Termal sular"]},
    IR19:{name:"Gilan",center:"Rəşt",area:"14 042 km²",population:"~2,5 milyon",region:"Şimal (Xəzəryanı)",description:"Xəzər dənizi sahilində, düyüçülük və rütubətli meşələri ilə tanınan bölgə.",tags:["Xəzər sahili", "Düyüçülük", "Yaşıl meşələr"]},
    IR16:{name:"Kürdüstan",center:"Sənəndəc",area:"29 137 km²",population:"~1,6 milyon",region:"Qərb",description:"İraq sərhədində, kürd əhalisinin sıx yaşadığı dağlıq qərb ostanı.",tags:["Kürd əhalisi", "Dağlıq relyef", "İraq sərhədi"]},
    IR17:{name:"Kirmanşah",center:"Kirmanşah",area:"24 998 km²",population:"~1,9 milyon",region:"Qərb",description:"Zaqros dağlarında, Taqi-Bustan qaya relyefləri ilə tanınan tarixi bölgə.",tags:["Zaqros dağları", "Taqi-Bustan abidələri", "İraq sərhədi"]},
    IR05:{name:"İlam",center:"İlam",area:"20 133 km²",population:"~580 000",region:"Qərb",description:"İraq sərhədində, İranın ən az əhalisi olan qərb ostanlarından biri.",tags:["İraq sərhədi", "Az əhalili", "Dağlıq relyef"]},
    IR10:{name:"Xuzestan",center:"Əhvaz",area:"64 055 km²",population:"~4,7 milyon",region:"Cənub-qərb",description:"Neft yataqları və Kərxə-Karun çayları ilə tanınan zəngin cənub-qərb ostanı.",tags:["Neft yataqları", "Karun çayı", "Ərəb əhalisi"]},
    IR28:{name:"Şimali Xorasan",center:"Bocnurd",area:"28 434 km²",population:"~870 000",region:"Şimal-şərq",description:"Türkmənistan sərhədində, dağlıq və yaylalı şimal-şərq ostanı.",tags:["Türkmənistan sərhədi", "Dağlıq yaylalar", "Heyvandarlıq"]},
    IR27:{name:"Golestan",center:"Qorqan",area:"20 367 km²",population:"~1,9 milyon",region:"Şimal (Xəzəryanı)",description:"Türkmən düzü və Xəzər sahilində, taxılçılıqla tanınan şimal-şərq ostanı.",tags:["Türkmən düzü", "Taxılçılıq", "Xəzər sahili"]},
    IR30:{name:"Xorasan Rizavi",center:"Məşhəd",area:"118 854 km²",population:"~6,4 milyon",region:"Şimal-şərq",description:"İmam Rzanın məzarı olan Məşhəd şəhəri ilə şiə dünyasının mühüm ziyarətgah mərkəzi.",tags:["İmam Rza məzarı", "Ziyarətgah mərkəzi", "Zəfəran istehsalı"]},
    IR29:{name:"Cənubi Xorasan",center:"Birçənd",area:"95 385 km²",population:"~770 000",region:"Şərq",description:"Əfqanıstan sərhədində, zəfəran istehsalı ilə tanınan quraq şərq ostanı.",tags:["Zəfəran istehsalı", "Əfqanıstan sərhədi", "Quraq iqlim"]},
    IR13:{name:"Sistan-Bəluçistan",center:"Zahedan",area:"181 785 km²",population:"~2,8 milyon",region:"Cənub-şərq",description:"Pakistan və Əfqanıstan sərhədində, İranın ən geniş və az inkişaf etmiş ostanlarından biri.",tags:["Pakistan sərhədi", "Səhra landşaftı", "Bəluç əhalisi"]},
    IR06:{name:"Buşehr",center:"Buşehr",area:"23 168 km²",population:"~1,2 milyon",region:"Cənub (Fars körfəzi)",description:"Fars körfəzi sahilində, İranın əsas atom elektrik stansiyasının yerləşdiyi liman ostanı.",tags:["Fars körfəzi", "Atom stansiyası", "Neft-qaz sənayesi"]},
    IR23:{name:"Hörmüzgan",center:"Bəndər-Abbas",area:"70 697 km²",population:"~1,8 milyon",region:"Cənub (Fars körfəzi)",description:"Hörmüz boğazı sahilində, mühüm dəniz ticarəti mərkəzi olan tropik ostan.",tags:["Hörmüz boğazı", "Dəniz ticarəti", "İstisi iqlim"]},
    IR21:{name:"Mazandaran",center:"Sari",area:"23 842 km²",population:"~3,3 milyon",region:"Şimal (Xəzəryanı)",description:"Xəzər dənizi sahilində, Elbrus (Damavənd) dağının ətəyində turizm bölgəsi.",tags:["Xəzər sahili", "Damavənd dağı", "Çayçılıq"]},
    IR12:{name:"Semnan",center:"Semnan",area:"97 491 km²",population:"~760 000",region:"Şimal-mərkəzi",description:"Dəşti-Kəvir səhrası ilə Əlborz dağları arasında uzanan geniş ostan.",tags:["Dəşti-Kəvir səhrası", "Az əhalili", "Tranzit yolu"]},
    IR11:{name:"Zəncan",center:"Zəncan",area:"21 773 km²",population:"~1,1 milyon",region:"Şimal-qərb",description:"Bıçaqçılıq sənəti və Soltaniyyə günbəzi ilə tanınan tarixi ostan.",tags:["Soltaniyyə günbəzi", "Bıçaqçılıq sənəti", "Tarixi karvan yolu"]},
    IR31:{name:"Qəzvin",center:"Qəzvin",area:"15 549 km²",population:"~1,3 milyon",region:"Şimal-qərb",description:"Səfəvilər dövründə qısa müddət paytaxt olmuş, üzümçülüklə tanınan ostan.",tags:["Keçmiş Səfəvi paytaxtı", "Üzümçülük", "Ələmut qalası yaxınlığı"]},
    IR22:{name:"Markazi",center:"Ərak",area:"29 406 km²",population:"~1,4 milyon",region:"Mərkəzi",description:"Adından da göründüyü kimi ölkənin mərkəzində yerləşən sənaye ostanı.",tags:["Sənaye mərkəzi", "Mərkəzi yerləşmə", "Metallurgiya"]},
    IR04:{name:"İsfahan",center:"İsfahan",area:"107 029 km²",population:"~5,1 milyon",region:"Mərkəzi",description:"Zayəndərud çayı sahilində, Naqşi-Cahan meydanı ilə dünya səviyyəsində tanınan tarixi şəhər.",tags:["Naqşi-Cahan meydanı", "Səfəvi memarlığı", "UNESCO obyekti"]},
    IR08:{name:"Çaharməhal-Bəxtiyari",center:"Şəhrikord",area:"16 332 km²",population:"~950 000",region:"Mərkəzi (dağlıq)",description:"Zaqros dağlarında, bəxtiyari tayfalarının yaşadığı yüksək dağlıq ostan.",tags:["Bəxtiyari tayfaları", "Zaqros dağları", "Yüksək yayla"]},
    IR18:{name:"Kohkiluyə-Boyerəhməd",center:"Yasuc",area:"15 504 km²",population:"~720 000",region:"Cənub-qərb",description:"Zaqros dağlarının cənubunda, neft-qaz yataqları olan dağlıq ostan.",tags:["Zaqros dağları", "Neft-qaz yataqları", "Dağlıq relyef"]},
    IR14:{name:"Fars",center:"Şiraz",area:"122 608 km²",population:"~4,9 milyon",region:"Cənub",description:"Şeir və şərab diyarı Şiraz, həmçinin Persepolis xarabalıqları ilə tanınan tarixi mərkəz.",tags:["Persepolis", "Şiraz mədəniyyəti", "Qül bağları"]},
    IR15:{name:"Kirman",center:"Kirman",area:"180 726 km²",population:"~3,2 milyon",region:"Cənub-şərq",description:"İranın ən geniş ərazili ostanı, xurma bağları və mis mədənləri ilə tanınır.",tags:["Ən geniş ərazi", "Mis mədənləri", "Lut səhrası"]},
    IR24:{name:"Həmədan",center:"Həmədan",area:"19 368 km²",population:"~1,7 milyon",region:"Qərb",description:"Qədim Midiya paytaxtı Ekbatana, İbn-Sina məzarı ilə tanınan tarixi şəhər.",tags:["Qədim Ekbatana", "İbn-Sina məzarı", "Əlvənd dağı"]},
    IR20:{name:"Lorestan",center:"Xorramabad",area:"28 294 km²",population:"~1,7 milyon",region:"Qərb",description:"Zaqros dağlarında, lür tayfalarının yaşadığı şəlalələri ilə tanınan dağlıq ostan.",tags:["Lür tayfaları", "Zaqros şəlalələri", "Dağlıq relyef"]},
    IR25:{name:"Yəzd",center:"Yəzd",area:"129 285 km²",population:"~1,1 milyon",region:"Mərkəzi (səhra)",description:"Bağdır (badgir) memarlığı və Zərdüştilik irsi ilə tanınan səhra şəhəri.",tags:["Badgir memarlığı", "Zərdüştilik irsi", "UNESCO şəhəri"]},
    IR26:{name:"Qum",center:"Qum",area:"11 526 km²",population:"~1,4 milyon",region:"Mərkəzi",description:"Şiə dünyasının mühüm dini təhsil mərkəzi, Fatimə Məsumə ziyarətgahı ilə tanınır.",tags:["Dini təhsil mərkəzi", "Fatimə Məsumə ziyarətgahı", "Xəlicə xalçaçılığı"]},
    IR07:{name:"Tehran",center:"Tehran",area:"18 909 km²",population:"~13,3 milyon",region:"Mərkəzi",description:"İranın paytaxtı və ən böyük şəhəri, ölkənin siyasi və iqtisadi mərkəzi.",tags:["Paytaxt", "Ən böyük əhali", "Sənaye mərkəzi"]},
    IR09:{name:"Əlborz",center:"Kərəc",area:"5 833 km²",population:"~2,7 milyon",region:"Mərkəzi",description:"Tehranın qərbində, Əlborz dağ silsiləsinin adını daşıyan sənaye ostanı.",tags:["Kərəc şəhəri", "Əlborz dağları", "Tehran ətrafı"]}
};

/* =========================================
   ELEMENTLƏR
========================================= */

const paths =
document.querySelectorAll("#iranMap path");

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
