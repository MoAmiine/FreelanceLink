let page = document.getElementById("missions");
let title = document.getElementById('missions-title');
let cards = document.getElementById('card-group')
let missionmodal = document.getElementById('missionmodal');
missionmodal.style.display = 'none';
title.style.fontWeight = 'bold'
title.style.fontSize = '3rem'
title.style.lineHeight = '10rem'
page.style.textAlign = 'center';
page.style.marginBottom = '5rem';
page.style.marginTop = '1rem';
page.style.display = 'flex';
page.style.flexDirection = 'column';
const missionsstorage = [];
fetch("/data/missions.json")
  .then((response) => response.json())
  .then((missions) => {
  loadmissions(missions);
});

function loadmissions(missions) {
    missions.forEach((mission) => {
      
      let card = document.createElement("div");
      card.className = "card";
      card.style.width = "25rem";
      card.style.marginBottom = "3rem";
      card.style.marginTop = "2rem"
      card.style.padding = "10px";
      card.style.textAlign = "left";
      card.style.boxShadow = "0 0 15px rgba(0, 0, 0, 0.47)";
      card.style.borderRadius = "10px";
      card.style.height = "520px";
      card.style.gap = "13px";
      card.innerHTML = `
                <h3 class="mission-client"><strong style= "color:#2aaf66">Client</strong> : ${mission.client}</h3>
                <h4 class="mission-title"><strong style= "color:#2aaf66">Mission</strong> : ${mission.mission}</h4>
                <p class="mission-description"><strong style= "color:#2aaf66">Description</strong> : ${mission.description}</p>
                <p class="mission-budget"><strong style= "color:#2aaf66">Budget</strong> : <span style="font-weight: bold; font-size: 30px">${mission.prix}</span></p>
                <p class="mission-typedecontrat"><strong style= "color:#2aaf66">Type de contrat</strong> : ${mission.typedecontrat}</p>
                <p class="mission-technologie"><strong style= "color:#2aaf66">Technologies</strong> : ${mission.technologie}</p>
                <button class="postulez btn">Postulez</button>
            `;
      page.querySelector(".card-group").appendChild(card);
    });
  }
let modal = document.getElementById("missionmodal");
let openBtn = document.getElementById("addmission");
let closeBtn = document.getElementById("publier");

if (window.location.pathname.endsWith("missions.html")) {
  openBtn.addEventListener("click", () => modal.style.display = "flex");
  closeBtn.addEventListener("click", () => modal.style.display = "none");
}

function ajouterMission(mission) {
  mission.preventDefault();
  const missionsss = {
    client: document.getElementById('name').value,
    mission: document.getElementById('mission').value,
    description: document.getElementById('description').value,
    prix: document.getElementById('budget').value,
    typedecontrat: document.getElementById('typedecontrat').value,
    technologie: document.getElementById('technologie').value
  };
  missionsstorage.push(missionsss);
  localStorage.setItem('missions', JSON.stringify(missionsstorage));

  loadmissions(missionsstorage);
}

  document.getElementById('mission-form').addEventListener('submit', ajouterMission);



