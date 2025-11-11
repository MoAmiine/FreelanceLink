let page = document.getElementById("missions");
let title = document.getElementById('missions-title');
let cards = document.getElementById('card-group')
title.style.fontWeight = 'bold'
title.style.fontSize = '3rem'
title.style.lineHeight = '10rem'
page.style.textAlign = 'center';
page.style.marginBottom = '5rem';
page.style.marginTop = '1rem';
page.style.display = 'flex';
page.style.flexDirection = 'column';

fetch("/data/missions.json")
  .then((response) => response.json())
  .then((missions) => {
    missions.forEach((mission) => {
      let card = document.createElement("div");
      card.className = "card";
      card.style.width = "25rem";
      card.style.marginBottom = "3rem";
      card.style.marginTop = "2rem"
      card.style.textAlign = "center";
      card.style.padding = "10px";
      card.style.boxShadow = "0 0 15px rgba(0, 0, 0, 0.47)";
      card.style.borderRadius = "10px";
      card.style.height = "250px";
      card.style.lineHeight = "2.2rem";
      card.innerHTML = `
                <h3 class="mission-title">${mission.client}</h3>
                <p class="mission-description">${mission.description}</p>
                <p class="h3">${mission.prix} $</p>
                <button class="postulez">Postulez</button>
            `;
      page.querySelector(".card-group").appendChild(card);
    });
  });
  const addmission = page.getElementById('addmission');

    
    

