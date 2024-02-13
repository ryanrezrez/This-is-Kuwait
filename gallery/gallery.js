const mainButtons = document.getElementById('mainButtons');
const containerCollection = document.getElementById('containerCollection');
const heading = document.getElementById('heading');
const paragraph = document.getElementById('paragraph');

$(document).ready(function() {
    // FUN PLACES
    $('#recreationalPlaces').on('click', function() {
        loadInfo('../gallery/Info/Recreational/info.json');
        fadeOut(heading);
        fadeOut(paragraph);
        fadeOut(mainButtons);

        setTimeout(() => {
            scrollToTop();
            fadeIn(heading, 'block');
            fadeIn(containerCollection, 'flex');
            page = 'recreational';
            updateContentGallery();
        }, 500);
    
    });

    // Historical Places
    $('#historicalPlaces').on('click', function() {
        loadInfo('../gallery/Info/Historical/info.json');
        fadeOut(heading);
        fadeOut(paragraph);
        fadeOut(mainButtons);

        setTimeout(() => {
            scrollToTop();
            fadeIn(heading, 'block');
            fadeIn(containerCollection, 'flex');
            page = 'historical';
            updateContentGallery();
        }, 500);
    });

    // Culture
    $('#influentialFigures').on('click', function() {
        loadInfo('../gallery/Info/Figures/info.json');
        fadeOut(heading);
        fadeOut(paragraph);
        fadeOut(mainButtons);

        setTimeout(() => {
            scrollToTop();
            fadeIn(heading, 'block');
            fadeIn(containerCollection, 'flex');
            page = 'influential';
            updateContentGallery();
        }, 500);
    });

    // Influential Figures
    $('#culture').on('click', function() {
        loadInfo('../gallery/Info/Culture/info.json');
        fadeOut(heading);
        fadeOut(paragraph);
        fadeOut(mainButtons);

        setTimeout(() => {
            scrollToTop();
            fadeIn(heading, 'block');
            fadeIn(containerCollection, 'flex');
            page = 'culture';
            updateContentGallery();
        }, 500);
    });

    $('#tribes').on('click', function() {
        loadInfo('../gallery/Info/Tribes/info.json');
        fadeOut(heading);
        fadeOut(paragraph);
        fadeOut(mainButtons);

        setTimeout(() => {
            scrollToTop();
            fadeIn(heading, 'block');
            fadeIn(containerCollection, 'flex');
            page = 'tribes';
            updateContentGallery();
        }, 500);
    });
});

let containers = {};
let galleryTranslations = {};
let page = 'gallery';

function loadInfo(jsonFile) {
    fetch(jsonFile)
    .then(response => response.json())
    .then(data => {
        containers = data;
        displayWords(containers);
    })
    .catch(error => console.error('Error loading translations:', error));
}

function displayWords(container) {
    const containerCollection = document.getElementById('containerCollection');
    containerCollection.innerHTML = '';

    const backButton = document.createElement('button');
    backButton.classList.add('backButton');
    backButton.textContent = galleryTranslations[currentLanguage].back;
    backButton.addEventListener('click', function() {
        fadeOut(heading);
        fadeOut(containerCollection);

        setTimeout(() => {
            scrollToTop();
            fadeIn(heading, 'block');
            fadeIn(paragraph, 'block');
            fadeIn(mainButtons, 'flex');
            page = 'gallery';
            updateContentGallery();
        }, 500);
    });

    containerCollection.appendChild(backButton);

    container.forEach((con) => {
        const containerElement = createContainerElement(con);
        containerCollection.appendChild(containerElement);
    });
}

function createContainerElement(containers) {
    const container = document.createElement('div');
    container.classList.add('container');
    container.addEventListener('click', function() {
        h1.classList.toggle('text-hidden');
        p.classList.toggle('text-hidden');
    });

    if (currentLanguage === 'en') {
        container.style.direction = 'ltr';
    } else {
        container.style.direction = 'rtl';
    }

    container.style.background = containers.img;
        
    const h1 = document.createElement('h1');
    h1.textContent = containers[currentLanguage].h1;
    container.appendChild(h1);

    const p = document.createElement('p');
    p.textContent = containers[currentLanguage].p;
    container.appendChild(p);

    if (containers.googleMaps === "true") {
        const mapButton = document.createElement('button');
        mapButton.textContent = galleryTranslations[currentLanguage].googlemaps;
        mapButton.classList.add('googleMaps');
        container.appendChild(mapButton);
        mapButton.addEventListener('click', function() {
            var latitude = containers.latitude;
            var longitude = containers.longitude;
            
            var mapsUrl = 'https://www.google.com/maps?q=' + latitude + ',' + longitude;
            window.open(mapsUrl, '_blank');
        });
    }

    return container;
}

function fadeOut(element) {
    element.style.opacity = 0;
    setTimeout(() => {
        element.style.display = 'none';
    }, 500);
}

function fadeIn(element, display) {
    element.style.display = display;
    setTimeout(() => {
        element.style.opacity = 1;
    }, 500);
}


fetch('../*/translations/gallery.json')
    .then(response => response.json())
    .then(data => {
        galleryTranslations = data;
        updateContentGallery();
    })
    .catch(error => console.error('Error loading translations:', error));

function updateContentGallery() {
    const h1 = document.getElementById('heading');
    const p = document.getElementById('paragraph');

    const rp = document.getElementById('recreationalPlaces');
    const hp = document.getElementById('historicalPlaces');
    const IF = document.getElementById('influentialFigures');
    const tribes = document.getElementById('tribes');

    const footer = document.getElementById('footer');

    h1.textContent = galleryTranslations[currentLanguage].heading[page];
    p.textContent = galleryTranslations[currentLanguage].paragraph;

    rp.textContent = galleryTranslations[currentLanguage].heading['recreational'];
    hp.textContent = galleryTranslations[currentLanguage].heading['historical'];
    IF.textContent = galleryTranslations[currentLanguage].heading['influential'];
    tribes.textContent = galleryTranslations[currentLanguage].heading['tribes'];
    footer.textContent = galleryTranslations[currentLanguage].footer;
}

function switchLanguageGallery() {
    updateContentGallery();
    displayWords(containers);
}

function scrollToTop() {
    window.scrollTo({
        top: 0
    });
}