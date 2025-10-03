const app = document.getElementById('app');
const homeLink = document.getElementById('home-link');
const quizLink = document.getElementById('quiz-link');

const questions = [
  {
    question: "Quel film a remporté l'Oscar du meilleur film en 1994 ?",
    options: ["Pulp Fiction", "Forrest Gump", "Les Évadés", "Quatre mariages et un enterrement"],
    answer: "Forrest Gump",
  },
  {
    question: "Quel réalisateur est connu pour 'Inception' et 'Interstellar' ?",
    options: ["Steven Spielberg", "James Cameron", "Christopher Nolan", "Quentin Tarantino"],
    answer: "Christopher Nolan",
  },
  {
    question: "Dans quel film voit-on le personnage de Jack Sparrow ?",
    options: ["Pirates des Caraïbes", "Le Seigneur des Anneaux", "Indiana Jones", "Les Gardiens de la Galaxie"],
    answer: "Pirates des Caraïbes",
  },
  {
    question: "Qui joue le rôle principal dans 'La La Land' ?",
    options: ["Ryan Gosling", "Leonardo DiCaprio", "Brad Pitt", "Tom Hanks"],
    answer: "Ryan Gosling",
  },
  {
    question: "Quel film est réalisé par Quentin Tarantino ?",
    options: ["Pulp Fiction", "Titanic", "Gladiator", "Avatar"],
    answer: "Pulp Fiction",
  },
  {
    question: "Quel est le nom du hobbit dans 'Le Seigneur des Anneaux' ?",
    options: ["Frodo", "Bilbo", "Sam", "Gandalf"],
    answer: "Frodo",
  },
  {
    question: "Qui a réalisé 'Titanic' ?",
    options: ["James Cameron", "Steven Spielberg", "Ridley Scott", "Christopher Nolan"],
    answer: "James Cameron",
  },
  {
    question: "Quel film d'animation est produit par Pixar ?",
    options: ["Toy Story", "Shrek", "Kung Fu Panda", "Dragons"],
    answer: "Toy Story",
  },
  {
    question: "Quel acteur incarne Iron Man ?",
    options: ["Chris Hemsworth", "Robert Downey Jr.", "Chris Evans", "Mark Ruffalo"],
    answer: "Robert Downey Jr.",
  },
  {
    question: "Quel film se déroule dans un monde post-apocalyptique avec Max ?",
    options: ["Mad Max", "Matrix", "Terminator", "Dune"],
    answer: "Mad Max",
  },
];

let currentIndex = 0;
let userAnswers = [];

function showHome() {
  app.innerHTML = `
    <h1>Bienvenue sur le Quiz Cinéma</h1>
    <p>Testez vos connaissances avec 10 questions sur l'univers du cinéma.</p>
    <button id="start-btn">Commencer le quiz</button>
  `;
  document.getElementById('start-btn').addEventListener('click', startQuiz);
}

function startQuiz() {
  currentIndex = 0;
  userAnswers = [];
  showQuestion();
}

function showQuestion() {
  const q = questions[currentIndex];
  app.innerHTML = `
    <h2>Question ${currentIndex + 1}/${questions.length}</h2>
    <p>${q.question}</p>
    <div class="options">
      ${q.options.map(option => `<button>${option}</button>`).join('')}
    </div>
    <button id="next-btn" disabled>${currentIndex === questions.length - 1 ? 'Voir mes résultats' : 'Question suivante'}</button>
    <div class="progress-bar"><div style="width: ${(currentIndex / questions.length) * 100}%"></div></div>
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
    if (currentIndex < questions.length) {
      showQuestion();
    } else {
      showResults();
    }
  });
}

function showResults() {
  let score = 0;
  const resultsHTML = questions.map((q, idx) => {
    const correct = q.answer === userAnswers[idx];
    if (correct) score++;
    return `
      <li class="${correct ? 'correct' : 'wrong'}">
        <p>${q.question}</p>
        <p>Votre réponse : ${userAnswers[idx]} ${correct ? '✓' : '✗'}</p>
        ${!correct ? `<p>Bonne réponse : ${q.answer}</p>` : ''}
      </li>
    `;
  }).join('');

  let message = '';
  if (score <= 3) message = "Vous devriez regarder plus de films ! 🎬";
  else if (score <= 6) message = "Pas mal ! Un vrai amateur de cinéma 🍿";
  else if (score <= 8) message = "Excellent ! Vous êtes un cinéphile confirmé 🌟";
  else message = "Parfait ! Vous êtes un expert du 7ème art ! 🏆";

  app.innerHTML = `
    <h1>Vous avez obtenu ${score}/${questions.length} !</h1>
    <p>${message}</p>
    <ul>${resultsHTML}</ul>
    <button id="restart-btn">Recommencer le quiz</button>
    <button id="home-btn">Retour à l'accueil</button>
  `;

  document.getElementById('restart-btn').addEventListener('click', startQuiz);
  document.getElementById('home-btn').addEventListener('click', showHome);
}

homeLink.addEventListener('click', showHome);
quizLink.addEventListener('click', startQuiz);

// Affiche l'accueil au chargement
showHome();
