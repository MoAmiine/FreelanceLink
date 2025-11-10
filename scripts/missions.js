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
            card.style.padding = '10px';
            card.style.boxShadow = '0 0 15px rgba(0, 0, 0, 0.47)';
            card.style.borderRadius = '10px';
            card.style.height = '250px';
            card.style.lineHeight = '2.2rem';
            card.innerHTML = `
                <h3 class="mission-title">${mission.client}</h3>
                <p class="mission-description">${mission.description}</p>
                <p class="h3">${mission.prix} $</p>
                <button class="btn-primary" >Postulez</button>
            `;  
            page.querySelector('.card-group').appendChild(card);
        });
    })