document.addEventListener("DOMContentLoaded", () => {

  // ===== Modal vidéo =====
  const videoModal = document.getElementById('videoModal');
  const videoFrame = document.getElementById('videoFrame');
  const closeModal = document.getElementById('closeModal');

  // Toutes les miniatures et bouton lecture
  const videoThumbs = document.querySelectorAll('.video-thumb');

  videoThumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {
      const videoUrl = thumb.dataset.video + "?autoplay=1";
      videoFrame.src = videoUrl;
      videoModal.style.display = "flex";
    });
  });

  // Fermer modal vidéo
  closeModal.addEventListener('click', () => {
    videoFrame.src = "";
    videoModal.style.display = "none";
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === "Escape") {
      videoFrame.src = "";
      videoModal.style.display = "none";
    }
  });

  // ===== Modal infos =====
  const infoBtn = document.getElementById('infoBtn');
  const infoModal = document.getElementById('infoModal');
  const closeInfo = document.getElementById('closeInfo');

  infoBtn.addEventListener('click', () => infoModal.style.display = "flex");
  closeInfo.addEventListener('click', () => infoModal.style.display = "none");
  document.addEventListener('keydown', (e) => {
    if (e.key === "Escape") infoModal.style.display = "none";
  });

  // ===== Ajouter à ma liste =====
  const myListBtn = document.getElementById('myListBtn');
  myListBtn.addEventListener('click', () => alert("Inception a été ajouté à votre liste !"));

  // ===== Profile menu =====// ===== Exemple de Module =====
// (Normalement séparé dans un autre fichier, mais ici pour la démo)
 class Modal {
  constructor(modalElement, closeBtn) {
    this.modalElement = modalElement;
    this.closeBtn = closeBtn;
    this.init();
  }

  init() {
    if (this.closeBtn) {
      this.closeBtn.addEventListener("click", () => this.hide());
    }
  }

  show(display = "flex") {
    this.modalElement.style.display = display;
  }

  hide() {
    this.modalElement.style.display = "none";
  }
}


document.addEventListener("DOMContentLoaded", () => {

  // ===== Template string + Promesse =====
  const simulateAddToList = (movieTitle) => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(`${movieTitle} a été ajouté à votre liste !`), 500);
    });
  };

  // ===== Modal vidéo avec Classe =====
  const videoModal = new Modal(
    document.getElementById("videoModal"),
    document.getElementById("closeModal")
  );
  const videoFrame = document.getElementById("videoFrame");

  const videoThumbs = document.querySelectorAll(".video-thumb");

  for (const thumb of videoThumbs) { // for-of
    thumb.addEventListener("click", () => {
      const { video } = thumb.dataset; // déstructuration
      const videoUrl = `${video}?autoplay=1`; // template string
      videoFrame.src = videoUrl;
      videoModal.show();
    });
  }

  // Fermer modal vidéo avec touche Escape
  document.addEventListener("keydown", ({ key }) => { // déstructuration
    if (key === "Escape") {
      videoFrame.src = "";
      videoModal.hide();
    }
  });

  // ===== Modal infos =====
  const infoModal = new Modal(
    document.getElementById("infoModal"),
    document.getElementById("closeInfo")
  );

  const infoBtn = document.getElementById("infoBtn");
  infoBtn.addEventListener("click", () => infoModal.show());

  document.addEventListener("keydown", ({ key }) => {
    if (key === "Escape") infoModal.hide();
  });

  // ===== Ajouter à ma liste avec Promesse =====
  const myListBtn = document.getElementById("myListBtn");
  myListBtn.addEventListener("click", async () => {
    const message = await simulateAddToList("Inception");
    alert(message);
  });

  // ===== Profile menu avec Set (collection) =====
  const profileButton = document.querySelector(".profile-menu button");
  const profileMenu = document.querySelector(".profile-menu ul");

  const openMenus = new Set(); // Utilisation d'une collection

  if (profileButton && profileMenu) {
    profileButton.addEventListener("click", (e) => {
      e.stopPropagation();
      const expanded = profileButton.getAttribute("aria-expanded") === "true";
      profileButton.setAttribute("aria-expanded", expanded ? "false" : "true");
      profileMenu.style.display = expanded ? "none" : "block";

      if (!expanded) {
        openMenus.add("profile");
      } else {
        openMenus.delete("profile");
      }
    });

    profileMenu.addEventListener("click", (e) => e.stopPropagation());
    document.addEventListener("click", () => {
      profileButton.setAttribute("aria-expanded", "false");
      profileMenu.style.display = "none";
      openMenus.clear(); // Set vidé
    });
  }

  // ===== Array.from (Extensions de boucles) =====
  const buttons = Array.from(document.querySelectorAll("button"));
  buttons.forEach((btn, i) => {
    btn.setAttribute("data-index", i);
  });

});

  const profileButton = document.querySelector(".profile-menu button");
  const profileMenu = document.querySelector(".profile-menu ul");

  if (profileButton && profileMenu) {
    profileButton.addEventListener("click", (e) => {
      e.stopPropagation();
      const expanded = profileButton.getAttribute("aria-expanded") === "true";
      profileButton.setAttribute("aria-expanded", expanded ? "false" : "true");
      profileMenu.style.display = expanded ? "none" : "block";
    });

    profileMenu.addEventListener("click", e => e.stopPropagation());
    document.addEventListener("click", () => {
      profileButton.setAttribute("aria-expanded", "false");
      profileMenu.style.display = "none";
    });
  }

});



// ==========================
// Gestion des boutons + Ma Liste
// ==========================
document.querySelectorAll(".addToListBtn").forEach(button => {
  button.addEventListener("click", () => {
    const movie = {
      title: button.dataset.title,
      img: button.dataset.img,
      info: button.dataset.info
    };
    addToMyList(movie);
  });
});

// ==========================
// Affichage de Ma Liste
// ==========================
function displayMyList() {
  const container = document.getElementById("myListContainer");
  if (!container) return; // si pas sur la page Ma Liste

  let myList = JSON.parse(localStorage.getItem("myList")) || [];
  container.innerHTML = "";

  if (myList.length === 0) {
    container.innerHTML = "<p>Aucun film/série dans votre liste.</p>";
    return;
  }

  myList.forEach(movie => {
    const article = document.createElement("article");
    article.innerHTML = `
      <img src="${movie.img}" alt="Affiche ${movie.title}">
      <h3>${movie.title}</h3>
      <p>${movie.info}</p>
    `;
    container.appendChild(article);
  });
}

displayMyList();
// === Ajouter à Ma Liste ===
document.querySelectorAll(".addToListBtn").forEach(btn => {
  btn.addEventListener("click", () => {
    const title = btn.dataset.title;
    const img = btn.dataset.img;
    const info = btn.dataset.info;

    // Récupérer la liste existante
    let myList = JSON.parse(localStorage.getItem("myList")) || [];

    // Vérifier si déjà présent
    if (!myList.some(item => item.title === title)) {
      myList.push({ title, img, info });
      localStorage.setItem("myList", JSON.stringify(myList));
      alert(`${title} a été ajouté à votre liste ✅`);
    } else {
      alert(`${title} est déjà dans votre liste ❗`);
    }
  });
});

// === Afficher Ma Liste ===
function displayMyList() {
  const container = document.getElementById("myListContainer");
  if (!container) return; // Si on n'est pas sur la page Ma Liste

  let myList = JSON.parse(localStorage.getItem("myList")) || [];
  container.innerHTML = "";

  if (myList.length === 0) {
    container.innerHTML = "<p>Votre liste est vide.</p>";
    return;
  }

  myList.forEach((item, index) => {
    const article = document.createElement("article");
    article.innerHTML = `
      <img src="${item.img}" alt="${item.title}">
      <h3>${item.title}</h3>
      <p>${item.info}</p>
      <button class="removeBtn" data-index="${index}">❌ Supprimer</button>
    `;
    container.appendChild(article);
  });

  // Gestion des boutons Supprimer
  document.querySelectorAll(".removeBtn").forEach(btn => {
    btn.addEventListener("click", () => {
      const index = btn.dataset.index;
      myList.splice(index, 1);
      localStorage.setItem("myList", JSON.stringify(myList));
      displayMyList(); // Recharger la liste
    });
  });
}

// Lancer au chargement de la page
document.addEventListener("DOMContentLoaded", displayMyList);
