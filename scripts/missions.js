let page = document.getElementById('missions');
fetch('/data/missions.json')
    .then(response => response.json())
    .then(missions => {
        missions.forEach(mission => {
            let card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <h3 class="mission-title">${mission.client}</h3>
                <p class="mission-description">${mission.description}</p>
                <p class="mission-budget">Budget: ${mission.prix} $</p>
                <button class="postulez">Postulez</button>
            `;
            page.querySelector('.card-group').appendChild(card);
        });
    })