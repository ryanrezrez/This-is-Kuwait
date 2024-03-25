const mainButtons = document.getElementById("mainButtons");
const containerCollection = document.getElementById("containerCollection");
const influentialButtons = document.getElementById("influentialButtons");
const heading = document.getElementById("heading");
const subheading = document.getElementById("subheading");
const containerElement = document.getElementsByClassName("container");

$(document).ready(function() {
    $("#recreationalPlaces").on("click", function() {
        loadInfo("../gallery/Info/Recreational/info.json");
        fadeOut(heading);
        fadeOut(subheading);
        fadeOut(mainButtons);
        setTimeout(() => {
            scrollToTop();
            fadeIn(heading, "block");
            fadeIn(containerCollection, "flex");
            page = "recreational";
            updateContentGallery();
            hideRefrences();
        }, 500);
    });

    $("#historicalPlaces").on("click", function() {
        loadInfo("../gallery/Info/Historical/info.json");
        fadeOut(heading);
        fadeOut(subheading);
        fadeOut(mainButtons);
        setTimeout(() => {
            scrollToTop();
            fadeIn(heading, "block");
            fadeIn(containerCollection, "flex");
            page = "historical";
            updateContentGallery();
            hideRefrences();
        }, 500);
    });

    $("#influentialFigures").on("click", function() {
        fadeOut(heading);
        fadeOut(subheading);
        fadeOut(mainButtons);
        setTimeout(() => {
            scrollToTop();
            fadeIn(heading, "block");
            fadeIn(influentialButtons, "flex");
            page = "influential";
            updateContentGallery();
            hideRefrences();
        }, 500);
    });

    $("#tribes").on("click", function() {
        loadInfo("../gallery/Info/Tribes/info.json", true);
        fadeOut(heading);
        fadeOut(subheading);
        fadeOut(mainButtons);
        setTimeout(() => {
            scrollToTop();
            fadeIn(heading, "block");
            fadeIn(subheading, "block");
            fadeIn(containerCollection, "flex");
            page = "tribes";
            updateContentGallery();
            hideRefrences();
        }, 500);
    });

    $("#i1").on("click", function() {
        loadInfo("../gallery/Info/Figures/amir/info.json");
        fadeOut(heading);
        fadeOut(subheading);
        fadeOut(influentialButtons);
        setTimeout(() => {
            scrollToTop();
            fadeIn(heading, "block");
            fadeIn(containerCollection, "flex");
            page = "i1";
            updateContentGallery();
            hideRefrences();
        }, 500);
    });

    $("#i2").on("click", function() {
        loadInfo("../gallery/Info/Figures/national/info.json");
        fadeOut(heading);
        fadeOut(subheading);
        fadeOut(influentialButtons);
        setTimeout(() => {
            scrollToTop();
            fadeIn(heading, "block");
            fadeIn(containerCollection, "flex");
            page = "i2";
            updateContentGallery();
            hideRefrences();
        }, 500);
    });

    $("#i3").on("click", function() {
        loadInfo("../gallery/Info/Figures/scientific/info.json");
        fadeOut(heading);
        fadeOut(subheading);
        fadeOut(influentialButtons);
        setTimeout(() => {
            scrollToTop();
            fadeIn(heading, "block");
            fadeIn(containerCollection, "flex");
            page = "i3";
            updateContentGallery();
            hideRefrences();
        }, 500);
    });
});

let containers = {};
let galleryTranslations = {};
let page = "gallery";

function loadInfo(jsonFile, tribe) {
    fetch(jsonFile)
        .then(response => response.json())
        .then(data => {
            containers = data;
            displayWords(containers, tribe);
        })
        .catch(error => console.error("Error loading translations:", error));
}

function displayWords(container, tribes) {
    const containerCollection = document.getElementById("containerCollection");
    containerCollection.innerHTML = "";
    const backButton = document.createElement("button");
    backButton.classList.add("backButton");
    backButton.textContent = galleryTranslations[currentLanguage].back;
    backButton.addEventListener("click", function() {
        fadeOut(heading);
        fadeOut(subheading);
        fadeOut(containerCollection);
        setTimeout(() => {
            scrollToTop();
            fadeIn(heading, "block");
            fadeIn(subheading, "block");
            fadeIn(mainButtons, "flex");
            page = "gallery";
            //containerElement.style.height = '200px';
            updateContentGallery();
        }, 500);
    });
    containerCollection.appendChild(backButton);
    container.forEach(con => {
        const containerElement = createContainerElement(con, tribes);
        containerCollection.appendChild(containerElement);
    });
}

function createContainerElement(containers, tribes) {
    const container = document.createElement("div");
    container.classList.add("container");
    if (tribes) {
        container.classList.add("containerTribe");
    } else {
        container.addEventListener("click", function() {
            h1.classList.toggle("text-hidden");
            p.classList.toggle("text-hidden");
        });
    }   
    if (currentLanguage === "en") {
        container.style.direction = "ltr";
    } else {
        container.style.direction = "rtl";
    }
    container.style.background = containers.img;
    const h1 = document.createElement("h1");
    h1.textContent = containers[currentLanguage].h1;
    container.appendChild(h1);
    const p = document.createElement("p");
    p.textContent = containers[currentLanguage].p;
    container.appendChild(p);
    if (containers.googleMaps === "true") {
        const mapButton = document.createElement("button");
        mapButton.textContent = galleryTranslations[currentLanguage].googlemaps;
        mapButton.classList.add("googleMaps");
        container.appendChild(mapButton);
        mapButton.addEventListener("click", function() {
            var latitude = containers.latitude;
            var longitude = containers.longitude;
            var mapsUrl = "https://www.google.com/maps?q=" + latitude + "," + longitude;
            window.open(mapsUrl, "_blank");
        });
    }
    return container;
}

function fadeOut(element) {
    element.style.opacity = 0;
    setTimeout(() => {
        element.style.display = "none";
    }, 500);
}

function fadeIn(element, display) {
    element.style.display = display;
    setTimeout(() => {
        element.style.opacity = 1;
    }, 500);
}

fetch("../*/translations/gallery.json")
    .then(response => response.json())
    .then(data => {
        galleryTranslations = data;
        updateContentGallery();
    })
    .catch(error => console.error("Error loading translations:", error));

function updateContentGallery() {
    const rp = document.getElementById("recreationalPlaces");
    const hp = document.getElementById("historicalPlaces");
    const IF = document.getElementById("influentialFigures");
    const i1 = document.getElementById("i1");
    const i2 = document.getElementById("i2");
    const i3 = document.getElementById("i3");
    const tribes = document.getElementById("tribes");
    const footer = document.getElementById("footer");

    heading.textContent = galleryTranslations[currentLanguage].heading[page];
    subheading.textContent = galleryTranslations[currentLanguage].subheading[page];
    rp.textContent = galleryTranslations[currentLanguage].heading["recreational"];
    hp.textContent = galleryTranslations[currentLanguage].heading["historical"];
    IF.textContent = galleryTranslations[currentLanguage].heading["influential"];
    i1.textContent = galleryTranslations[currentLanguage].heading["i1"];
    i2.textContent = galleryTranslations[currentLanguage].heading["i2"];
    i3.textContent = galleryTranslations[currentLanguage].heading["i3"];
    tribes.textContent = galleryTranslations[currentLanguage].heading["tribes"];
    footer.textContent = galleryTranslations[currentLanguage].footer;
}

function switchLanguageGallery() {
    updateContentGallery();
    displayWords(containers, page === "tribes");
}

function showRefrences() {
    const refrences = document.getElementById("refrences");
    refrences.style.display = 'block';
    window.scrollTo(0, document.body.scrollHeight);
}
function hideRefrences() {
    const refrences = document.getElementById("refrences");
    refrences.style.display = 'none';
}

function scrollToTop() {
    window.scrollTo({ top: 0 });
}