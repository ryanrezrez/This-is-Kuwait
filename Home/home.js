let homeTranslations = {};

// Fetch translations
fetch("../*/translations/home.json")
  .then(response => response.json())
  .then(data => {
    homeTranslations = data;
    updateContentHome();
  })
  .catch(error => console.error("Error loading translations:", error));

// Function to update content based on selected language
function updateContentHome() {
  const heading1 = document.getElementById("heading1");
  const or = document.getElementById("or");
  const button1 = document.getElementById("button1");
  const button2 = document.getElementById("button2");
  const button3 = document.getElementById("button3");

  if (!homeTranslations[currentLanguage]) {
    console.error("Translation data for the selected language is missing.");
    return;
  }

  heading1.textContent = homeTranslations[currentLanguage].heading1;
  button1.textContent = homeTranslations[currentLanguage].button1;
  button2.textContent = homeTranslations[currentLanguage].button2;
  button3.textContent = homeTranslations[currentLanguage].button3;
  or.textContent = homeTranslations[currentLanguage].or;
}

// Function to switch language
function switchLanguageHome() {
  console.log(localStorage.getItem("language"));
  updateContentHome();
}
