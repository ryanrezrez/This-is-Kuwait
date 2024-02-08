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