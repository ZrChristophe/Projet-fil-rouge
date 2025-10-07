const quizQuestions = [
  {
    id: 1,
    question: "Qui a réalisé le film 'Inception' (2010) ?",
    options: ["Steven Spielberg", "Christopher Nolan", "James Cameron", "Ridley Scott"],
    correctAnswer: "Christopher Nolan"
  },
  {
    id: 2,
    question: "Quel film a remporté l'Oscar du meilleur film en 2020 ?",
    options: ["1917", "Joker", "Parasite", "Once Upon a Time in Hollywood"],
    correctAnswer: "Parasite"
  },
  {
    id: 3,
    question: "Dans quel film trouve-t-on la réplique culte 'May the Force be with you' ?",
    options: ["Star Trek", "Star Wars", "Interstellar", "Avatar"],
    correctAnswer: "Star Wars"
  },
  {
    id: 4,
    question: "Qui incarne Iron Man dans l'univers cinématographique Marvel ?",
    options: ["Chris Evans", "Chris Hemsworth", "Robert Downey Jr.", "Mark Ruffalo"],
    correctAnswer: "Robert Downey Jr."
  },
  {
    id: 5,
    question: "Quel est le film d'animation le plus rentable de tous les temps ?",
    options: ["Le Roi Lion (2019)", "La Reine des Neiges 2", "Toy Story 4", "Les Indestructibles 2"],
    correctAnswer: "Le Roi Lion (2019)"
  },
  {
    id: 6,
    question: "Combien d'Oscars a remporté le film 'Titanic' (1997) ?",
    options: ["8", "11", "14", "9"],
    correctAnswer: "11"
  },
  {
    id: 7,
    question: "Quel réalisateur est connu pour ses films 'Pulp Fiction' et 'Kill Bill' ?",
    options: ["Martin Scorsese", "Quentin Tarantino", "David Fincher", "Guy Ritchie"],
    correctAnswer: "Quentin Tarantino"
  },
  {
    id: 8,
    question: "Dans 'Le Seigneur des Anneaux', qui doit détruire l'anneau unique ?",
    options: ["Aragorn", "Gandalf", "Frodon", "Sam"],
    correctAnswer: "Frodon"
  },
  {
    id: 9,
    question: "Quel acteur joue le rôle de Jack Sparrow dans 'Pirates des Caraïbes' ?",
    options: ["Orlando Bloom", "Johnny Depp", "Geoffrey Rush", "Javier Bardem"],
    correctAnswer: "Johnny Depp"
  },
  {
    id: 10,
    question: "Quel film de science-fiction se déroule en grande partie dans une ville appelée Gotham ?",
    options: ["Spider-Man", "Superman", "Batman", "Iron Man"],
    correctAnswer: "Batman"
  }
];

const app = document.getElementById('app');
const homeLink = document.getElementById('home-link');
const quizLink = document.getElementById('quiz-link');

let currentIndex = 0;
let userAnswers = [];

// Page d'accueil
function showHome() {
  app.innerHTML = `
    <h1>Bienvenue sur le Quiz Cinéma</h1>
    <p>Testez vos connaissances avec 10 questions sur l'univers du cinéma.</p>
    <button id="start-btn">Commencer le quiz</button>
  `;
  document.getElementById('start-btn').addEventListener('click', startQuiz);
}

// Lancer le quiz
function startQuiz() {
  currentIndex = 0;
  userAnswers = [];
  showQuestion();
}

// Afficher question
function showQuestion() {
  const q = quizQuestions[currentIndex];
  app.innerHTML = `
    <h2>Question ${currentIndex + 1}/${quizQuestions.length}</h2>
    <p>${q.question}</p>
    <div class="options">
      ${q.options.map(option => `<button>${option}</button>`).join('')}
    </div>
    <button id="next-btn" disabled>
      ${currentIndex === quizQuestions.length - 1 ? 'Voir mes résultats' : 'Question suivante'}
    </button>
    <div class="progress-bar">
      <div style="width: ${(currentIndex / quizQuestions.length) * 100}%"></div>
    </div>
  `;

  const optionButtons = document.querySelectorAll('.options button');
  let selected = null;

  optionButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      optionButtons.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      selected = btn.textContent;
      document.getElementById('next-btn').disabled = false;
    });
  });

  document.getElementById('next-btn').addEventListener('click', () => {
    userAnswers.push(selected);
    currentIndex++;
    if (currentIndex < quizQuestions.length) {
      showQuestion();
    } else {
      showResults();
    }
  });
}

// Résultats
function showResults() {
  let score = 0;
  const resultsHTML = quizQuestions.map((q, idx) => {
    const correct = q.correctAnswer === userAnswers[idx];
    if (correct) score++;
    return `
      <li class="${correct ? 'correct' : 'wrong'}">
        <p>${q.question}</p>
        <p>Votre réponse : ${userAnswers[idx]} ${correct ? '✓' : '✗'}</p>
        ${!correct ? `<p>Bonne réponse : ${q.correctAnswer}</p>` : ''}
      </li>
    `;
  }).join('');

  let message = '';
  if (score <= 3) message = "Vous devriez regarder plus de films ! 🎬";
  else if (score <= 6) message = "Pas mal ! Un vrai amateur de cinéma 🍿";
  else if (score <= 8) message = "Excellent ! Vous êtes un cinéphile confirmé 🌟";
  else message = "Parfait ! Vous êtes un expert du 7ème art ! 🏆";

  app.innerHTML = `
    <h1>Vous avez obtenu ${score}/${quizQuestions.length} !</h1>
    <p>${message}</p>
    <ul>${resultsHTML}</ul>
    <button id="restart-btn">Recommencer le quiz</button>
    <button id="home-btn">Retour à l'accueil</button>
  `;

  document.getElementById('restart-btn').addEventListener('click', startQuiz);
  document.getElementById('home-btn').addEventListener('click', showHome);
}

// Navigation
homeLink.addEventListener('click', (e) => {
  e.preventDefault();
  showHome();
});

quizLink.addEventListener('click', (e) => {
  e.preventDefault();
  startQuiz();
});

// Démarrage
showHome();
