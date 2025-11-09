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

function ajouterService(svc) {
    svc.preventDefault()
    const service = {
        id: Date.now(),
        nom: document.getElementById("service-name"),
        description: document.getElementById("service-description"),
        duree: document.getElementById("service-duration"),
        prix: document.getElementById("service-price"),
        categorie: document.getElementById("service-category"),
        disponibilite: document.getElementById("service-availability")
    }

    storageServices.push(service);
    localStorage.setItem('service', JSON.stringify(storageServices));
    document.getElementById("add-service-form").reset();
    ShowServices();

}

