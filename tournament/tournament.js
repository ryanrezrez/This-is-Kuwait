let tournamentTranslations = {};

// Fetch translations
fetch("../*/translations/tournament.json")
  .then(response => response.json())
  .then(data => {
    tournamentTranslations = data;
    updateContentTournament();
  })
  .catch(error => console.error("Error loading translations:", error));

function updateContentTournament() {
  const heading = document.getElementById("heading");
  const subheading = document.getElementById("subheading");
  const participateButton = document.getElementById("participate");
  const info = document.querySelector(".info");
  const container = document.querySelector(".container");

  if (currentLanguage === "en") {
    container.style.direction = 'ltr';
  } else {
    container.style.direction = 'rtl';
  }

  if (!tournamentTranslations[currentLanguage]) {
    console.error("Translation data for the selected language is missing.");
    return;
  }

  heading.textContent = tournamentTranslations[currentLanguage].heading;
  subheading.textContent = tournamentTranslations[currentLanguage].subheading;
  participateButton.textContent = tournamentTranslations[currentLanguage].participate;
  info.innerHTML = tournamentTranslations[currentLanguage].info;
}

// Function to switch language
function switchLanguageTournament() {
  updateContentTournament();
}
