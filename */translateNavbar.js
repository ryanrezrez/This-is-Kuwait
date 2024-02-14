let currentLanguage = localStorage.getItem('language') || 'en';
let translations = {};

fetch('../*/translations/navbar.json')
    .then(response => response.json())
    .then(data => {
        translations = data;
        updateContent();
    })
    .catch(error => console.error('Error loading translations:', error));

function updateContent() {
    const elements = document.querySelectorAll('.link');
    elements.forEach(element => {
        const classes = element.classList;
        if (classes.contains('home')) {
            element.textContent = translations[currentLanguage].home;
        }
        else if (classes.contains('learnkuwaiti')) {
            element.textContent = translations[currentLanguage].learnkuwaiti;
        }
        else if (classes.contains('gallery')) {
            element.textContent = translations[currentLanguage].gallery;
        }
        else if (classes.contains('aboutus')) {
            element.textContent = translations[currentLanguage].aboutus;
        }
        else if (classes.contains('sponsors')) {
            element.textContent = translations[currentLanguage].sponsors;
        }
        else if (classes.contains('switchLanguage')) {
            element.textContent = translations[currentLanguage].switchlang;
        }
    });

    const desktopContainer = document.querySelectorAll('.desktop-container');
    if (currentLanguage === 'en') {
        desktopContainer.forEach(desktopContainer => {
            desktopContainer.style.direction = "ltr";
        });
    } else {
        desktopContainer.forEach(desktopContainer => {
            desktopContainer.style.direction = "rtl";
        });
    }
}

function switchMainLanguage(page) {
    switchLanguage();
    if (page === 'home') {
        switchLanguageHome();
    } else if (page === 'learnkuwaiti') {
        switchLanguageLK();
    } else if (page === 'gallery') {
        switchLanguageGallery();
    } else if (page === 'aboutus') {
        switchLanguageAboutUs();
    } else if (page === 'sponsors') {
        switchLanguageSponsors();
    }
}

function switchLanguage() {
    currentLanguage = currentLanguage === 'en' ? 'ar' : 'en';
    localStorage.setItem('language', currentLanguage);
    updateContent();
}