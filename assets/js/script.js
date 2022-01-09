// Only initiate javascript once the whole window is loaded
window.addEventListener('DOMContentLoaded', (event) => {
  console.log('DOM fully loaded and parsed');
});
document.getElementById('start-quiz-btn').addEventListener('click', showNextQuestion);

// Array of quiz questions
const questions = [{
    title: "What’s your favourite game?",
    optionA: "Wizard chess",
    optionB: "Scrabble",
    optionC: "Twister",
    optionD: "Monopoly",
  },
  {
    title: "When do you hand your homework in?",
    optionA: "Late",
    optionB: "Early",
    optionC: "On time ",
    optionD: "I make someone else to do it ",
  },
  {
    title: "What’s your favourite shop in Diagon Alley?",
    optionA: "Weasleys’ Wizard Wheezes",
    optionB: "Flourish and Blotts",
    optionC: "Magical Menagerie",
    optionD: "I prefer Knockturn Alley",
  },
];

// Global variables and listeners for html elements
const currentQuestion = document.getElementById('current-question');
const answers = document.getElementById('answer-options');
const answerOptions = document.getElementById('answer-options');
const submit = document.getElementById('btn-submit');
const lastQuestion = questions.length;
document.getElementById('start-quiz-btn').addEventListener('click', showNextQuestion);

let submitBtn = document.getElementById('btn-submit');
submitBtn.addEventListener('click', function (event) {
  event.preventDefault();
  submitAnswer();
});

// Question & Score counters
let runningQuestion = 0;
let gryffindorScore = 0;
let ravenclawScore = 0;
let hufflepuffScore = 0;
let slytherinScore = 0;

/**
 * Display the "quiz-page" html, show each question in order if there are ny left otherwise call the collectResultsAndDisplayHouse.
 */
function showNextQuestion() {
  if (runningQuestion < lastQuestion) {
    const questionArray = questions[runningQuestion];
    document.getElementById('home-page').classList.add('hidden');
    document.getElementById('quiz-page').classList.remove('hidden');
    document.getElementById('start-again-btn-div').classList.remove('hidden');
    document.getElementById('btn-submit').classList.remove('hidden');

    // Inject template HTML into fieldset element
    currentQuestion.innerHTML = questionArray.title;
    answerOptions.innerHTML = `  
      <input class="answer-option" type="radio" name="answers" id="option-1" required>
      <label class="answer-option" for="option-1">
        <span data-hover="${questionArray.optionA}">${questionArray.optionA}</span>
      </label>

      <input class="answer-option" type="radio" name="answers" id="option-2">
      <label class="answer-option" for="option-2">							
        <span data-hover="${questionArray.optionB}">${questionArray.optionB}</span>
      </label>

      <input class="answer-option" type="radio" name="answers" id="option-3">
      <label class="answer-option" for="option-3">
        <span data-hover="${questionArray.optionC}">${questionArray.optionC}</span>
      </label>

      <input class="answer-option" type="radio" name="answers" id="option-4">
      <label class="answer-option" for="option-4">
        <span data-hover="${questionArray.optionD}">${questionArray.optionD}</span>
      </label>
      `;
  } else {
    collectResultsAndDisplayHouse();
  }
}

/**
 * When the submit button is clicked call the relavent functions to progress the quiz
 */
function submitAnswer() {
  checkAnswerResult();
  showNextQuestion();
}

/**
 * Check which answer-option has been checked, and record the result. Otherwise display an alert if nothing is selected.
 */
function checkAnswerResult() {
  if (document.getElementById('option-1').checked) {
    gryffindorScore++;
    runningQuestion++;
  } else if (document.getElementById('option-2').checked) {
    ravenclawScore++;
    runningQuestion++;
  } else if (document.getElementById('option-3').checked) {
    hufflepuffScore++;
    runningQuestion++;
  } else if (document.getElementById('option-4').checked) {
    slytherinScore++;
    runningQuestion++;
  } else {
    alert('Oops! The Sorting Hat needs an answer to decide your fate! Please try again');
  }
}

/**
 * Collect the scores and add to finalScore array, sort from highest to lowest point score, display the house result to the user
 */
function collectResultsAndDisplayHouse() {
  let finalScores = [{
    elementId: 'gryffindor-result',
    points: gryffindorScore
  }, {
    elementId: 'ravenclaw-result',
    points: ravenclawScore
  }, {
    elementId: 'hufflepuff-result',
    points: hufflepuffScore
  }, {
    elementId: 'slytherin-result',
    points: slytherinScore
  }]
  finalScores.sort((a, b) => (b.points - a.points));
  document.getElementById('quiz-page').classList.add('hidden');
  document.getElementById('results-page').classList.remove('hidden');
  document.getElementById(finalScores[0].elementId).classList.remove('hidden');
}

/**
 * Resets all scores, hides results-page and quiz-page, and returns to the main screen
 */
function startAgainFromMenu() {
  gryffindorScore = 0;
  ravenclawScore = 0;
  hufflepuffScore = 0;
  slytherinScore = 0;
  runningQuestion = 0;

  document.getElementById('quiz-page').classList.add('hidden');
  document.getElementById('home-page').classList.remove('hidden');
  document.getElementById('results-page').classList.add('hidden');
  document.getElementById('gryffindor-result').classList.add('hidden');
  document.getElementById('ravenclaw-result').classList.add('hidden');
  document.getElementById('hufflepuff-result').classList.add('hidden');
  document.getElementById('slytherin-result').classList.add('hidden');
  document.getElementById('instructions-page').classList.add('hidden');
}

// Event listener to restart the quiz if "start again" button is clicked
document.getElementById('start-again-btn').addEventListener('click', startAgainFromMenu);
document.getElementById('instructions-btn').addEventListener('click', function () {
  document.getElementById('home-page').classList.add('hidden');
  document.getElementById('instructions-page').classList.remove('hidden');
});