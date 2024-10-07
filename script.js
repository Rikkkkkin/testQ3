// Sample Questions and Answers
const questions = [
  {
    question: "What is the capital of France?",
    options: { a: "Berlin", b: "London", c: "Paris", d: "Madrid" },
    correctAnswer: "c"
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: { a: "Venus", b: "Mars", c: "Jupiter", d: "Saturn" },
    correctAnswer: "b"
  },
  {
    question: 'Who wrote the play "Romeo and Juliet"?',
    options: { a: "William Shakespeare", b: "Charles Dickens", c: "Jane Austen", d: "Mark Twain" },
    correctAnswer: "a"
  },
  {
    question: "What is the largest ocean on Earth?",
    options: { a: "Atlantic Ocean", b: "Indian Ocean", c: "Arctic Ocean", d: "Pacific Ocean" },
    correctAnswer: "d"
  },
  {
    question: "Which element has the chemical symbol 'O'?",
    options: { a: "Gold", b: "Oxygen", c: "Silver", d: "Hydrogen" },
    correctAnswer: "b"
  },
  {
    question: "In which continent is the Sahara Desert located?",
    options: { a: "Asia", b: "Africa", c: "Australia", d: "South America" },
    correctAnswer: "b"
  },
  {
    question: "What is the smallest prime number?",
    options: { a: "0", b: "1", c: "2", d: "3" },
    correctAnswer: "c"
  },
  {
    question: "Who painted the Mona Lisa?",
    options: { a: "Pablo Picasso", b: "Leonardo da Vinci", c: "Vincent van Gogh", d: "Claude Monet" },
    correctAnswer: "b"
  },
  {
    question: "What is the hardest natural substance?",
    options: { a: "Gold", b: "Iron", c: "Diamond", d: "Silver" },
    correctAnswer: "c"
  },
  {
    question: "Which gas is most abundant in the Earth's atmosphere?",
    options: { a: "Oxygen", b: "Nitrogen", c: "Carbon Dioxide", d: "Hydrogen" },
    correctAnswer: "b"
  },
  {
    question: "Which country is known as the Land of the Rising Sun?",
    options: { a: "China", b: "Japan", c: "South Korea", d: "Thailand" },
    correctAnswer: "b"
  },
  {
    question: "What is the chemical formula for water?",
    options: { a: "CO2", b: "H2O", c: "O2", d: "NaCl" },
    correctAnswer: "b"
  },
  {
    question: "Who is known as the Father of Computers?",
    options: { a: "Thomas Edison", b: "Albert Einstein", c: "Charles Babbage", d: "Isaac Newton" },
    correctAnswer: "c"
  },
  {
    question: "Which organ is responsible for pumping blood throughout the body?",
    options: { a: "Lungs", b: "Liver", c: "Heart", d: "Kidney" },
    correctAnswer: "c"
  },
  {
    question: "In which year did the Titanic sink?",
    options: { a: "1912", b: "1920", c: "1905", d: "1898" },
    correctAnswer: "a"
  },
  {
    question: "What is the process by which plants make their food?",
    options: { a: "Respiration", b: "Digestion", c: "Photosynthesis", d: "Transpiration" },
    correctAnswer: "c"
  },
  {
    question: "Who developed the theory of relativity?",
    options: { a: "Nikola Tesla", b: "Albert Einstein", c: "Galileo Galilei", d: "Stephen Hawking" },
    correctAnswer: "b"
  },
  {
    question: "What is the largest planet in our solar system?",
    options: { a: "Earth", b: "Mars", c: "Jupiter", d: "Saturn" },
    correctAnswer: "c"
  },
  {
    question: "Which country hosted the 2016 Summer Olympics?",
    options: { a: "China", b: "Brazil", c: "United Kingdom", d: "Russia" },
    correctAnswer: "b"
  },
  {
    question: "What is the currency of the United Kingdom?",
    options: { a: "Dollar", b: "Euro", c: "Pound Sterling", d: "Yen" },
    correctAnswer: "c"
  }
];

// Rest of the script remains the same


// User's Answers
let userAnswers = {};

// Current Question Index
let currentQuestionIndex = 0;

// Initialize the Questionnaire
function initQuestionnaire() {
  generateProgressBar();
  displayQuestion(currentQuestionIndex);
}

// Generate Progress Bar
function generateProgressBar() {
  const progressBar = document.getElementById('progress-bar');
  for (let i = 0; i < questions.length; i++) {
    const progressItem = document.createElement('div');
    progressItem.classList.add('progress-item');
    progressItem.innerText = i + 1;
    progressItem.addEventListener('click', () => {
      displayQuestion(i);
    });
    progressBar.appendChild(progressItem);
  }
}

// Display a Question
function displayQuestion(index) {
  currentQuestionIndex = index;
  const questionContainer = document.getElementById('question-container');
  questionContainer.innerHTML = ''; // Clear previous question

  const questionData = questions[index];
  const questionDiv = document.createElement('div');
  questionDiv.classList.add('question', 'active');

  // Question Text
  const questionText = document.createElement('p');
  questionText.innerText = `${index + 1}. ${questionData.question}`;
  questionDiv.appendChild(questionText);

  // Options
  const optionsDiv = document.createElement('div');
  optionsDiv.classList.add('options');
  for (let key in questionData.options) {
    const label = document.createElement('label');
    const input = document.createElement('input');
    input.type = 'radio';
    input.name = `q${index}`;
    input.value = key;
    input.checked = userAnswers[`q${index}`] === key;
    input.addEventListener('change', () => {
      userAnswers[`q${index}`] = key;
      updateProgress();
      // Automatically move to next question if available
      if (currentQuestionIndex < questions.length - 1) {
        displayQuestion(currentQuestionIndex + 1);
      } else {
        displayResult();
      }
    });
    label.appendChild(input);
    label.append(` ${key.toUpperCase()}) ${questionData.options[key]}`);
    optionsDiv.appendChild(label);
  }

  questionDiv.appendChild(optionsDiv);
  questionContainer.appendChild(questionDiv);
  updateProgress();
}

// Update Progress Bar
function updateProgress() {
  const progressItems = document.querySelectorAll('.progress-item');
  progressItems.forEach((item, index) => {
    item.classList.remove('completed', 'current');
    if (userAnswers[`q${index}`]) {
      item.classList.add('completed');
    }
    if (index === currentQuestionIndex) {
      item.classList.add('current');
    }
  });
}

// Display Result
function displayResult() {
  let score = 0;
  questions.forEach((question, index) => {
    if (userAnswers[`q${index}`] === question.correctAnswer) {
      score++;
    }
  });
  document.getElementById('result').innerText = `You scored ${score} out of ${questions.length}.`;
}

// Add event listener for the Finish button
document.getElementById('finish-button').addEventListener('click', displayResult);

// Initialize the questionnaire on page load
window.onload = initQuestionnaire;
