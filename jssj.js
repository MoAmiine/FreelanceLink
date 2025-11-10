fetch("/views/views/Services.json")
    .then(res => res.json())
    .then(data => {
        storageServices = JSON.parse(localStorage.getItem('services')) || data.services
        ShowServices()
    })

// display services 

function ShowServices() {
    const servicesList = document.getElementById("services-list")
    servicesList.innerHTML = "";
    storageServices.forEach(service => {
        const card = document.createElement("div")
        card.classList.add("col-md-4", "mb-4")
        card.innerHTML = `
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${service.nom}</h5>
                        <p class="card-text">${service.description}</p>
                        <p><strong>Durée:</strong>${service.duree}</p>
                        <p><strong>prix:</strong>${service.prix}</p>
                        <p><strong>catégorie:</strong>${service.categorie}</p>
                        <p><strong>Disponibilité:</strong> ${service.disponibilite}</p>
                         <button class="btn btn-warning" onclick="openEditModal(${service.id})">Modifier</button>
                    <button class="btn btn-danger" onclick="deleteService(${service.id})">Supprimer</button>
                    </div>
                
                </div>
            `

            servicesList.appendChild(card)
    });
}