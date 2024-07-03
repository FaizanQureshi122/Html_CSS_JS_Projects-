const RANDOM_QUOTE_API_URL = 'http://api.quotable.io/random';
const quoteDisplayElement = document.getElementById('quoteDisplay');
const quoteInputElement = document.getElementById('quoteInput');
const timerElement = document.getElementById('timer');
const speedModal = document.getElementById('speedModal');
const speedMessage = document.getElementById('speedMessage');
const closeButton = document.getElementById('closeButton');
const retryButton = document.getElementById('retryButton');
const nextButton = document.getElementById('nextButton');

quoteInputElement.addEventListener('input', () => {
    const arrayQuote = quoteDisplayElement.querySelectorAll('span');
    const arrayValue = quoteInputElement.value.split('');

    let correct = true;
    arrayQuote.forEach((characterSpan, index) => {
        const character = arrayValue[index];
        if (character == null) {
            characterSpan.classList.remove('correct');
            characterSpan.classList.remove('incorrect');
            correct = false;
        } else if (character === characterSpan.innerText) {
            characterSpan.classList.add('correct');
            characterSpan.classList.remove('incorrect');
        } else {
            characterSpan.classList.remove('correct');
            characterSpan.classList.add('incorrect');
            correct = false;
        }
    });

    if (correct) {
        displaySpeedRating();
    }
});

function getRandomQuote() {
    return fetch(RANDOM_QUOTE_API_URL)
        .then(response => response.json())
        .then(data => data.content);
}

async function renderNewQuote() {
    const quote = await getRandomQuote();
    quoteDisplayElement.innerHTML = '';
    quote.split('').forEach(character => {
        const characterSpan = document.createElement('span');
        characterSpan.innerText = character;
        quoteDisplayElement.appendChild(characterSpan);
    });
    quoteInputElement.value = null;
    startTimer();
}

let startTime;
function startTimer() {
    timerElement.innerText = '0';
    startTime = new Date();
    setInterval(() => {
        timerElement.innerText = getTimerTime();
    }, 1000);
}

function getTimerTime() {
    return Math.floor((new Date() - startTime) / 1000);
}

function displaySpeedRating() {
    const timeTaken = getTimerTime();
    const wordCount = quoteDisplayElement.innerText.split(' ').length;
    const wpm = (wordCount / timeTaken) * 60;
    
    if (wpm < 20) {
        speedMessage.innerText = `Your speed is ${wpm.toFixed(2)} WPM. Try again!`;
        retryButton.style.display = 'block';
        nextButton.style.display = 'none';
    } else {
        speedMessage.innerText = `Your speed is ${wpm.toFixed(2)} WPM. Well done! Proceed to the next quote.`;
        retryButton.style.display = 'none';
        nextButton.style.display = 'block';
    }
    showModal();
}

function showModal() {
    speedModal.style.display = 'flex';
}

function closeModal() {
    speedModal.style.display = 'none';
}

retryButton.addEventListener('click', () => {
    closeModal();
    renderNewQuote();
});

nextButton.addEventListener('click', () => {
    closeModal();
    renderNewQuote();
});

closeButton.addEventListener('click', closeModal);

// Initial render of a new quote
renderNewQuote();
