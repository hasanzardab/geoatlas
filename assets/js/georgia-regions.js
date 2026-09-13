

/* =========================================
   MXARE MƏLUMATLARI
========================================= */

const regions = {
    GEAB:{name:"Abxaziya",center:"Suxumi",area:"8 600 km²",population:"~240 000",region:"Muxtar Respublika",description:"Qara dəniz sahilində yerləşən, subtropik iqlimi və dağlıq relyefi ilə tanınan, statusu mübahisəli muxtar respublika.",tags:["Qara dəniz sahili", "Subtropik iqlim", "Muxtar respublika", "Dağlıq relyef"]},
    GESZ:{name:"Samegrelo-Zemo Svaneti",center:"Zuqdidi",area:"7 440 km²",population:"~330 000",region:"Bölgə",description:"Qara dəniz sahilindən Qafqaz dağlarına qədər uzanan, Svaneti qülələri və Enguri çayı ilə tanınan bölgə.",tags:["Svaneti qülələri", "Enguri çayı", "Dağlıq relyef"]},
    GESK:{name:"Şida Kartli",center:"Gori",area:"5 729 km²",population:"~247 000",region:"Bölgə",description:"Mtkvari çayı vadisində, Stalin muzeyi və qədim mağara şəhəri Uplistsixe ilə tanınan mərkəzi bölgə.",tags:["Uplistsixe mağara şəhəri", "Mtkvari çayı", "Tarixi abidələr"]},
    GERL:{name:"Raça-Leçxumi-Kvemo Svaneti",center:"Ambrolauri",area:"4 930 km²",population:"~32 000",region:"Bölgə",description:"Gürcüstanın ən az əhalisi olan, dağlıq relyefi və şərabçılığı ilə tanınan şimal-qərb bölgəsi.",tags:["Dağlıq relyef", "Şərabçılıq", "Az əhalili"]},
    GEMM:{name:"Mtsxeta-Mtianeti",center:"Mtsxeta",area:"6 786 km²",population:"~94 000",region:"Bölgə",description:"Gürcüstanın qədim paytaxtı Mtsxeta və Qafqaz Hərbi Yolunun keçdiyi dağlıq ərazini əhatə edən bölgə.",tags:["Qədim paytaxt", "UNESCO obyekti", "Qafqaz Hərbi Yolu"]},
    GEKA:{name:"Kaxeti",center:"Telavi",area:"11 311 km²",population:"~318 000",region:"Bölgə",description:"Gürcüstanın şərqində, Alazani vadisində yerləşən, ölkənin əsas şərabçılıq mərkəzi sayılan bölgə.",tags:["Şərabçılıq", "Alazani vadisi", "Ən böyük bölgə"]},
    GESJ:{name:"Samtsxe-Cavaxeti",center:"Axaltsixe",area:"6 413 km²",population:"~160 000",region:"Bölgə",description:"Türkiyə ilə sərhəddə, Vardzia mağara monastırı və vulkanik yaylalarla tanınan cənub bölgəsi.",tags:["Vardzia monastırı", "Vulkanik yayla", "Türkiyə sərhədi"]},
    GEAJ:{name:"Acariya",center:"Batumi",area:"2 880 km²",population:"~350 000",region:"Muxtar Respublika",description:"Qara dəniz sahilində, Batumi kurort şəhəri və subtropik iqlimi ilə tanınan muxtar respublika.",tags:["Batumi kurortu", "Qara dəniz sahili", "Subtropik iqlim", "Muxtar respublika"]},
    GEKK:{name:"Kvemo Kartli",center:"Rustavi",area:"6 072 km²",population:"~423 000",region:"Bölgə",description:"Ermənistan və Azərbaycanla həmsərhəd, sənaye şəhəri Rustavi və əkinçilik torpaqları ilə tanınan bölgə.",tags:["Sənaye mərkəzi", "Aqrar torpaqlar", "Çoxmillətli əhali"]},
    GEGU:{name:"Guriya",center:"Ozurgeti",area:"2 033 km²",population:"~113 000",region:"Bölgə",description:"Qara dəniz sahilində, Gürcüstanın ən kiçik bölgəsi, çayçılıq və sitrus bağları ilə tanınır.",tags:["Çayçılıq", "Qara dəniz sahili", "Ən kiçik bölgə"]},
    GETB:{name:"Tbilisi",center:"Tbilisi",area:"720 km²",population:"~1,2 milyon",region:"Paytaxt",description:"Gürcüstanın paytaxtı və ən böyük şəhəri, Mtkvari çayı sahilində yerləşən tarixi və mədəni mərkəz.",tags:["Paytaxt", "Mtkvari çayı", "Tarixi mərkəz", "Metropol"]},
    GEIM:{name:"İmereti",center:"Kutaisi",area:"6 475 km²",population:"~500 000",region:"Bölgə",description:"Gürcüstanın qədim Kolxida ərazisində, ölkənin ikinci böyük şəhəri Kutaisi ilə tanınan bölgə.",tags:["Kutaisi şəhəri", "Prometey mağarası", "Qədim Kolxida"]}
};

/* =========================================
   ELEMENTLƏR
========================================= */

const paths =
document.querySelectorAll("#georgiaMap path");

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
   MXARENİ GÖSTƏR
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
