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

  // ===== Profile menu =====
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
