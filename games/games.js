const mainButtons = document.getElementById("mainButtons");
const containerCollection = document.getElementById("containerCollection");
const heading = document.getElementById("heading");
const subheading = document.getElementById("subheading");
const containerElement = document.getElementsByClassName("container");

function tournamentSection() {
    loadInfo("/games/Info/Tournaments/info.json");
    fadeOut(heading);
    fadeOut(subheading);
    fadeOut(mainButtons);
    setTimeout(() => {
        scrollToTop();
        fadeIn(heading, "block");
        fadeIn(containerCollection, "flex");
        page="tournaments"
        updateContentGames();
        hideRefrences();
    }, 500);
}

$(document).ready(function() {
    $("#culturalgames").on("click", function() {
        loadInfo("/games/Info/Cultural/info.json");
        fadeOut(heading);
        fadeOut(subheading);
        fadeOut(mainButtons);
        setTimeout(() => {
            scrollToTop();
            fadeIn(heading, "block");
            fadeIn(containerCollection, "flex");
            page="games"
            updateContentGames();
            hideRefrences();
        }, 500);
    });
    $("#tournaments").on("click", tournamentSection);
});

let containers = {};
let gamesTranslations = {};
let page = "games";

function loadInfo(jsonFile, tribe) {
    fetch(jsonFile)
        .then(response => response.json())
        .then(data => {
            containers = data;
            displayWords(containers);
        })
        .catch(error => console.error("Error loading translations:", error));
}

function displayWords(container) {
    const containerCollection = document.getElementById("containerCollection");
    containerCollection.innerHTML = "";
    const backButton = document.createElement("button");
    backButton.classList.add("backButton");
    backButton.textContent = gamesTranslations[currentLanguage].back;
    backButton.addEventListener("click", function() {
        fadeOut(heading);
        fadeOut(subheading);
        fadeOut(containerCollection);
        setTimeout(() => {
            scrollToTop();
            fadeIn(heading, "block");
            fadeIn(subheading, "block");
            fadeIn(mainButtons, "flex");
            //containerElement.style.height = '200px';
            updateContentGames();
        }, 500);
    });
    containerCollection.appendChild(backButton);

    container.forEach(con => {
        const containerElement = createContainerElement(con);
        containerCollection.appendChild(containerElement);
    });
}

function createContainerElement(containers) {
    const container = document.createElement("div");
    const refrenceButton = document.createElement("button");
    const p = document.createElement("p");
    const info = document.createElement('p');
    container.classList.add("container");
    if (currentLanguage === "en") {
        container.style.direction = "ltr";
    } else {
        container.style.direction = "rtl";
    }

    container.style.background = containers.img;
    const h1 = document.createElement("h1");
    h1.textContent = containers[currentLanguage].h1;
    container.appendChild(h1);
    const changedString = containers[currentLanguage].p.replace(/\n/g, '<br>');
    p.innerHTML = changedString;
    p.addEventListener('click', function() {
        event.stopPropagation();
    });
    container.appendChild(p);
    if (containers.reference === true) {
        info.innerHTML = containers.references.replace(/\n/g, '<br>');
        info.style.display = 'none';
        info.style.direction = 'ltr';

        refrenceButton.textContent = gamesTranslations[currentLanguage].references;
        refrenceButton.classList.add("googleMaps");
        container.appendChild(info);
        container.appendChild(refrenceButton);

        refrenceButton.addEventListener("click", function() {
            event.stopPropagation();
            info.style.display = 'block';
        });

        info.addEventListener("click", function() {
            event.stopPropagation();
        });
    }

    if (containers.participate === true) {
        const participate = document.createElement("button");
        container.classList.add("large");
        participate.textContent = gamesTranslations[currentLanguage].participate;
        participate.classList.add("googleMaps");
        participate.style.display = 'block';

        container.appendChild(participate);

        participate.addEventListener('click', () => {
            window.location.href = '/tournament';
        });
        
    } else {
        container.addEventListener("click", function() {
            if (container.style.height === '700px') {
                container.style.height = '200px';
                container.style.background = containers.img;
                p.style.display = 'none';
                info.style.display = 'none';
                refrenceButton.style.display = 'none';
            } else {
                container.style.height = '700px';
                container.style.backgroundPosition = 'center';
                p.style.display = 'block';
                p.style.display = 'block';
                refrenceButton.style.display = 'block';
            }
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

fetch("/*/translations/games.json")
    .then(response => response.json())
    .then(data => {
        gamesTranslations = data;
        console.log(gamesTranslations)
        updateContentGames();
    })
    .catch(error => console.error("Error loading translations:", error));

function updateContentGames() {
    const culturalGames = document.getElementById("culturalgames");
    const tournaments = document.getElementById("tournaments");
    const refrenceButton = document.getElementById("refrenceButton");
    const footer = document.getElementById("footer");

    heading.textContent = gamesTranslations[currentLanguage].heading[page];
    subheading.textContent = gamesTranslations[currentLanguage].subheading[page];
    culturalGames.textContent = gamesTranslations[currentLanguage].heading["games"];
    tournaments.textContent = gamesTranslations[currentLanguage].heading["tournaments"];
    footer.textContent = gamesTranslations[currentLanguage].footer;
    refrenceButton.textContent = gamesTranslations[currentLanguage].references;
}

function switchLanguageGames() {
    updateContentGames();
    displayWords(containers);
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