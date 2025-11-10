let page = document.getElementById('missions');
fetch('/data/missions.json')
    .then(response => response.json())
    .then(missions => {
        missions.forEach(mission => {
            let card = document.createElement('div');
            card.className = 'card';
            card.style.width = '15rem';
            card.style.margin = '10px';
            card.style.display = 'inline-block';
            card.style.textAlign = 'center';
            card.innerHTML = `
                <h3 class="mission-title">${mission.client}</h3>
                <p class="mission-description">${mission.description}</p>
                <p class="mission-prix">${mission.prix} $</p>
                <button class="postulez">Postulez</button>
            `;
            page.querySelector('.card-group').appendChild(card);
        });
    })