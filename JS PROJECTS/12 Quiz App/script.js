const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const restartButton = document.getElementById('restart-btn');
const questionContainerElement = document.getElementById('quiz-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const resultScreen = document.getElementById('result-screen');
const scoreElement = document.getElementById('score');

let shuffledQuestions, currentQuestionIndex;
let score = 0;

const questions = [

  {
    question: 'What is the capital of Japan?',
    answers: [
      { text: 'Tokyo', correct: true },
      { text: 'Beijing', correct: false },
      { text: 'Seoul', correct: false },
      { text: 'Bangkok', correct: false }
    ]
  },
  {
    question: 'What is the smallest prime number?',
    answers: [
      { text: '2', correct: true },
      { text: '1', correct: false },
      { text: '3', correct: false },
      { text: '5', correct: false }
    ]
  },
  {
    question: 'What is the main ingredient in guacamole?',
    answers: [
      { text: 'Avocado', correct: true },
      { text: 'Tomato', correct: false },
      { text: 'Lime', correct: false },
      { text: 'Onion', correct: false }
    ]
  },
  {
    question: 'Which planet is known as the Red Planet?',
    answers: [
      { text: 'Mars', correct: true },
      { text: 'Venus', correct: false },
      { text: 'Jupiter', correct: false },
      { text: 'Saturn', correct: false }
    ]
  },
  {
    question: 'Who painted the Mona Lisa?',
    answers: [
      { text: 'Leonardo da Vinci', correct: true },
      { text: 'Vincent van Gogh', correct: false },
      { text: 'Pablo Picasso', correct: false },
      { text: 'Claude Monet', correct: false }
    ]
  }
];

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
  currentQuestionIndex++;
  setNextQuestion();
});
restartButton.addEventListener('click', startGame);

function startGame() {
  score = 0;
  startButton.parentElement.classList.add('hide');
  resultScreen.classList.add('hide');
  questionContainerElement.classList.remove('hide');
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('btn');
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  nextButton.classList.add('hide');
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  if (correct) {
    score++;
  }
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct);
  });
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide');
  } else {
    showResult();
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add('correct');
  } else {
    element.classList.add('wrong');
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct');
  element.classList.remove('wrong');
}

function showResult() {
  questionContainerElement.classList.add('hide');
  resultScreen.classList.remove('hide');
  scoreElement.innerText = `You scored ${score} out of ${questions.length}!`;
}
