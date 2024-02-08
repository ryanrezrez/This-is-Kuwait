let homeTranslations = {};

fetch('../*/translations/home.json')
    .then(response => response.json())
    .then(data => {
        homeTranslations = data;
        updateContentHome();
    })
    .catch(error => console.error('Error loading translations:', error));

function updateContentHome() {
    const heading1 = document.getElementById('heading1');
    const or = document.getElementById('or');
    const button1 = document.getElementById('button1');
    const button2 = document.getElementById('button2');
    var containers = document.querySelectorAll('.container h1');
    var buttons = document.querySelectorAll('.container .button');

    heading1.textContent = homeTranslations[currentLanguage].heading1;

    heading1.textContent = homeTranslations[currentLanguage].heading1;
    button1.textContent = homeTranslations[currentLanguage].button1;
    button2.textContent = homeTranslations[currentLanguage].button2;
    or.textContent = homeTranslations[currentLanguage].or;

    if (currentLanguage === 'en') {
        containers.forEach(function(container) {
            container.style.letterSpacing = '3px';
        });
        buttons.forEach(function(container) {
            container.style.letterSpacing = '3px';
        });
    } else {
        containers.forEach(function(container) {
            container.style.letterSpacing = '0px';
        });
        buttons.forEach(function(container) {
            container.style.letterSpacing = '0px';
        });
    }
} 

function switchLanguageHome() {
    console.log(localStorage.getItem('language'));
    updateContentHome();
}
