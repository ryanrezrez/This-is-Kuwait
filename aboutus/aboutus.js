document.addEventListener('DOMContentLoaded', function() {
    const elements = document.querySelectorAll('.fade-in-container');

    function isElementInViewport(el) {
      const rect = el.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom-300 <= (window.innerHeight || document.documentElement.clientHeight)
      );
    }

    function handleScroll() {
      elements.forEach(function(element) {
        if (isElementInViewport(element)) {
          element.classList.add('fade-in-show');
        }
      });
    }

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    // Initial check in case elements are already in view on page load
    handleScroll();
});

let aboutusTranslations = {};

fetch('../*/translations/aboutus.json')
    .then(response => response.json())
    .then(data => {
        //data.replace('/\n/g', '<br>');
        aboutusTranslations = data;
        updateContentAboutUs();
    })
    .catch(error => console.error('Error loading translations:', error));

function updateContentAboutUs() {
    const h1 = document.getElementById('heading1');
    const p1 = document.getElementById('p1');

    const about1 = document.getElementById('about1');

    const h2 = document.getElementById('heading2');
    const p2 = document.getElementById('p2');

    const h3 = document.getElementById('heading3');

    const name1 = document.getElementById('name1');
    const name2 = document.getElementById('name2');
    const name3 = document.getElementById('name3');
    const name4 = document.getElementById('name4');
    const name5 = document.getElementById('name5');
    const name6 = document.getElementById('name6');
    const name7 = document.getElementById('name7');
    const name8 = document.getElementById('name8');

    const button = document.getElementById('button');

    const h4 = document.getElementById('heading4');
    const p3 = document.getElementById('p3');

    h1.textContent = aboutusTranslations[currentLanguage].heading1;
    p1.textContent = aboutusTranslations[currentLanguage].p1;
    about1.textContent = aboutusTranslations[currentLanguage].about1;
    h2.textContent = aboutusTranslations[currentLanguage]. heading2;
    p2.textContent = aboutusTranslations[currentLanguage].p2;
    h3.textContent = aboutusTranslations[currentLanguage].heading3;
    name1.textContent = aboutusTranslations[currentLanguage].name1;
    name2.textContent = aboutusTranslations[currentLanguage].name2;
    name3.textContent = aboutusTranslations[currentLanguage].name3;
    name4.textContent = aboutusTranslations[currentLanguage].name4;
    name5.textContent = aboutusTranslations[currentLanguage].name5;
    name6.textContent = aboutusTranslations[currentLanguage].name6;
    name7.textContent = aboutusTranslations[currentLanguage].name7;
    name8.textContent = aboutusTranslations[currentLanguage].name8;
    h4.textContent = aboutusTranslations[currentLanguage].heading4;
    p3.textContent = aboutusTranslations[currentLanguage].p3;
    button.textContent = aboutusTranslations[currentLanguage].button;
}

function switchLanguageAboutUs() {
   updateContentAboutUs();
}