let loadedWords = [];
let displayedWords = [];

fetch('words.json')
    .then(response => response.json())
    .then(data => {
        loadedWords = data;
        displayedWords = loadedWords;
        displayWords(loadedWords);
    })
    .catch(error => console.error('Error loading JSON file:', error));

function displayWords(words) {
    const wordsContainer = document.getElementById('wordsContainer');
    wordsContainer.innerHTML = '';

    words.forEach((word, index) => {
        const wordElement = createWordElement(word, index, true);
        wordsContainer.appendChild(wordElement);
    });
    
    handleScroll();
}

window.addEventListener('scroll', handleScroll);
handleScroll();

function createWordElement(word, index, animate) {
    const wordElement = document.createElement('div');
    wordElement.classList.add('word-container');

    if (animate) {
      wordElement.classList.add('animation');
    }
        
    const enElement = document.createElement('p');
    enElement.textContent = `${word.en}`;
    wordElement.appendChild(enElement);

    const arElement = document.createElement('p');
    arElement.textContent = `${word.ar}`;
    wordElement.appendChild(arElement);

    const kwElement = document.createElement('p');
    kwElement.textContent = `${word.kw}`;
    wordElement.appendChild(kwElement);

    wordElement.style.transitionDelay = `${index * 0.2}s`;

    return wordElement;
}

function displayRandomWord() {
    const randomIndex = Math.floor(Math.random() * loadedWords.length);
    const randomWord = loadedWords[randomIndex];
    const randomWordElement = createWordElement(randomWord, false);

    const wordsContainer = document.getElementById('randomWordContainer');
    wordsContainer.innerHTML = ''; 
    wordsContainer.appendChild(randomWordElement);
}

function handleScroll() {
  const wordContainers = document.querySelectorAll('.word-container');

    wordContainers.forEach((wordContainer, index) => {
        if (window.scrollY > 0) {
            wordContainer.style.opacity = '1';
            wordContainer.style.transform = 'translateY(0)';
        }
    });
}

const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', handleSearch);

function handleSearch() {
    const query = searchInput.value.toLowerCase();

    displayedWords = loadedWords.filter(word =>
        word.en.toLowerCase().includes(query) ||
        word.ar.toLowerCase().includes(query) ||
        word.kw.toLowerCase().includes(query)
    );

    displayWords(displayedWords);
}

let learnkuwaitiTranslations = {};

fetch('../*/translations/learnkuwaiti.json')
    .then(response => response.json())
    .then(data => {
        learnkuwaitiTranslations = data;
        updateContentLK();
    })
    .catch(error => console.error('Error loading translations:', error));

function updateContentLK() {
    const heading1 = document.getElementById('heading1');
    const p1 = document.getElementById('p1');
    const button1 = document.getElementById('button1');

    const english = document.getElementById('english');
    const arabic  = document.getElementById('arabic');
    const kuwaiti  = document.getElementById('kuwaiti');
    const footer = document.getElementById('footer');

    heading1.textContent = learnkuwaitiTranslations[currentLanguage].heading1;
    p1.textContent = learnkuwaitiTranslations[currentLanguage].p1;
    button1.textContent = learnkuwaitiTranslations[currentLanguage].button1;

    english.textContent = learnkuwaitiTranslations[currentLanguage].english;
    arabic.textContent = learnkuwaitiTranslations[currentLanguage].arabic;
    kuwaiti.textContent = learnkuwaitiTranslations[currentLanguage].kuwaiti;

    footer.textContent = learnkuwaitiTranslations[currentLanguage].footer;
}

function switchLanguageLK() {
    console.log(localStorage.getItem('language'));
    updateContentLK();
}