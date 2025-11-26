// Contenus dynamiques des ateliers
const bourses = {
  growth: {
    titre: "Growth Mindset",
    formateur: "Formateur de l’atelier",
    image: "formateur.png",
    video: "Présentation GAM.mp4",
    description: `
      <p>Le growth mindset ou mindset de croissance, c'est l'attitude mentale qui consiste à voir les problèmes comme des opportunités d'apprendre et de grandir.</p>
      <h3>Bénéfices pour un jeune</h3>
      <ul>
        <li>Persévérance et résilience</li>
        <li>Goût d’apprendre</li>
        <li>Confiance en soi accrue</li>
        <li>Créativité et adaptabilité</li>
      </ul>
    `,
    temoignage: `
      <h3>Témoignage</h3>
      <p>Témoignage d’un jeune boursier... Lorem ipsum dolor sit amet...</p>
    `,
    video2: "WhatsApp Vidéo 2025-10-24 à 16.12.40_6327efe9.mp4"
  },

  cyber: {
    titre: "Cybersécurité & Réseaux",
    formateur: "Expert Réseaux",
    image: "cyber-formateur.png",
    video: "cyber.mp4",
    description: `
      <p>Apprenez les bases de la cybersécurité et la configuration des réseaux.</p>
      <ul>
        <li>Protection des données</li>
        <li>Gestion des attaques</li>
        <li>Travail en équipe</li>
      </ul>
    `,
    temoignage: `<p>Un atelier pratique pour mieux comprendre les risques numériques actuels.</p>`
  },

  lecture: {
    titre: "Atelier de Lecture",
    formateur: "Mme Kodjo",
    image: "lecture-formateur.png",
    video: "lecture.mp4",
    description: `
      <p>Un espace de découverte et de développement du goût de la lecture.</p>
      <ul>
        <li>Développement de la pensée critique</li>
        <li>Expression écrite</li>
      </ul>
    `
  }
};

// Fonction d’affichage dynamique
function afficherBourse(nom) {
  const zone = document.getElementById("details");
  const data = bourses[nom];
  if (!data) return;

  zone.innerHTML = `
    <h1>${data.titre}</h1>
    <div class="atelier-container">
      <div class="atelier-text">
        <h4>${data.formateur}</h4>
      </div>
      <div class="atelier-image">
        <img src="${data.image}" alt="Formateur">
      </div>
    </div>
    <div class="video">
      <iframe src="${data.video}" title="Vidéo ${data.titre}"></iframe>
    </div>
    ${data.description}
    ${data.temoignage || ""}
    ${data.video2 ? `<div class="video"><iframe src="${data.video2}"></iframe></div>` : ""}
    <button onclick="retour()">← Retour</button>
  `;
  
  // Masquer la liste principale
  document.getElementById("pro").style.display = "none";
  zone.style.display = "block";
}

// Fonction de retour
function retour() {
  document.getElementById("pro").style.display = "block";
  document.getElementById("details").style.display = "none";
}

// Ajouter les événements aux éléments cliquables
document.querySelectorAll(".i1[data-bourse]").forEach(item => {
  item.addEventListener("click", () => {
    const nom = item.getAttribute("data-bourse");
    afficherBourse(nom);
  });
});
// assets/scripts/list.js

document.addEventListener("DOMContentLoaded", () => {

  const programListContainer = document.getElementById("liste-programmes");
  const API_BASE_URL = "http://localhost:8000/api";

  // Récupération des programmes depuis le backend
  fetch(`${API_BASE_URL}/programmes`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status}`);
      }
      return response.json();
    })
    .then(programmes => {

      // On vide le conteneur
      programListContainer.innerHTML = "";

      // On insère chaque programme dans le HTML
      programmes.forEach(programme => {
        const programCard = document.createElement("div");
        programCard.className = "carte-programme";

        programCard.innerHTML = `
            <h2>${programme.nom}</h2>
            <p>${programme.description}</p>
            <a href="/assets/pages/detail.html?id=${programme.id}">Consulter</a>
        `;

        programListContainer.appendChild(programCard);
      });
    })
    .catch(error => {
      console.error("Erreur lors de la récupération des données :", error);
      programListContainer.innerHTML = `
          <p style="color:red;">
              Une erreur est survenue lors du chargement des programmes.
          </p>
      `;
    });

});

        fetch(
            "http://localhost:8000/api"
        )
            .then((response) => {
            return response.json();
        })
        .then((json) =>{
            console.log(json);
        });
        
 