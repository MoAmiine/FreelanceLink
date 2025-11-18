
const categories = ["Développement", "Design", "Rédaction", "Marketing"];
let storedServices = [];
let currentEditingId = null;

// remplire les ctegorie dans select
function fillCategories() {
    const select = document.getElementById('service-category');
    const editSelect = document.getElementById('edit-category');
    select.innerHTML = '';
    editSelect.innerHTML = '';
    categories.forEach(cat => {
        const option1 = document.createElement('option');
        option1.value = cat;
        option1.textContent = cat;
        select.appendChild(option1);

        const option2 = document.createElement('option');
        option2.value = cat;
        option2.textContent = cat;
        editSelect.appendChild(option2);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    fillCategories();
    fetch('/views/Services.json')
        .then(res => res.json())
        .then(data => {
            storedServices = JSON.parse(localStorage.getItem('services')) || data.services;
            AfficherServices();
        })
        .catch(err => console.error('Erreur JSON:', err));
});

// function afficher

function AfficherServices() {
    const servicesList = document.getElementById('services-list');
    servicesList.innerHTML = '';
    storedServices.forEach(service => {
        const card = document.createElement('div');
        card.classList.add('col-md-4', 'mb-4');
        card.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${service.nom}</h5>
                    <p class="card-text">${service.description}</p>
                    <p><strong>Durée:</strong> ${service.duree}</p>
                    <p><strong>Prix:</strong> ${service.prix} USD</p>
                    <p><strong>Catégorie:</strong> ${service.categorie}</p>
                    <p><strong>Disponibilité:</strong> ${service.disponibilite}</p>
                    <button class="btn btn-warning" onclick="openEditModal(${service.id})">Modifier</button>
                    <button class="btn btn-danger" onclick="deleteService(${service.id})">Supprimer</button>
                </div>
            </div>
        `;
        servicesList.appendChild(card);
    });
}

// function ajouter 
function ajouterService(e) {
    e.preventDefault();
    const service = {
        id: Date.now(),
        nom: document.getElementById('service-name').value,
        description: document.getElementById('service-description').value,
        duree: document.getElementById('service-duration').value,
        prix: document.getElementById('service-price').value,
        categorie: document.getElementById('service-category').value,
        disponibilite: document.getElementById('service-availability').value
    };
    storedServices.push(service);
    localStorage.setItem('services', JSON.stringify(storedServices));
    document.getElementById('add-service-form').reset();
    AfficherServices();
}

// function suprimer 
function deleteService(id) {
    storedServices = storedServices.filter(s => s.id !== id);
    localStorage.setItem('services', JSON.stringify(storedServices));
    AfficherServices();
}


// function modifier 
function openEditModal(serviceId) {
    const service = storedServices.find(s => s.id === serviceId);
    if (!service) return;

    currentEditingId = serviceId;

    document.getElementById('edit-name').value = service.nom;
    document.getElementById('edit-description').value = service.description;
    document.getElementById('edit-price').value = service.prix;
    document.getElementById('edit-duration').value = service.duree;
    document.getElementById('edit-category').value = service.categorie;
    document.getElementById('edit-availability').value = service.disponibilite;

    const modal = new bootstrap.Modal(document.getElementById('editModal'));
    modal.show();
}

document.getElementById('edit-service-form').addEventListener('submit', function(e) {
    e.preventDefault();
    if (currentEditingId === null) return;

    const service = storedServices.find(s => s.id === currentEditingId);
    service.nom = document.getElementById('edit-name').value;
    service.description = document.getElementById('edit-description').value;
    service.prix = document.getElementById('edit-price').value;
    service.duree = document.getElementById('edit-duration').value;
    service.categorie = document.getElementById('edit-category').value;
    service.disponibilite = document.getElementById('edit-availability').value;

    localStorage.setItem('services', JSON.stringify(storedServices));
    AfficherServices();

    const modal = bootstrap.Modal.getInstance(document.getElementById('editModal'));
    modal.hide();

    currentEditingId = null;
});



document.addEventListener('DOMContentLoaded', () => {
    fillCategories();
    storedServices = JSON.parse(localStorage.getItem('services')) || [];
    AfficherServices();
});
document.getElementById('add-service-form').addEventListener('submit', ajouterService);
