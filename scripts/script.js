window.addEventListener('scroll', function() {
  let navbar = document.querySelector('header');
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

let modal = document.getElementById("loginModal");
let openBtn = document.getElementById("openmodal");
let closeBtn = document.getElementById("close");

openBtn.addEventListener("click", openModal);
closeBtn.addEventListener("click", closeModal);

function openModal() {
  modal.style.display = "flex";
}

function closeModal() {
  modal.style.display = "none";
}

async function fetchData(file) {
  let response = await fetch(file);
  let data = await response.json();
  let profile_info = document.querySelector(".profile_info");
  profile_info.innerHTML = `
    <h2 class="profile-name mb-1">${data.profile.first_name} ${data.profile.last_name}</h2>
    <p class="mb-2">${data.profile.bio}</p>
  `;
  let about = document.querySelector(".about");
  about.innerHTML = `
    <p class="mb-2">${data.profile.about}</p>
  `;
  data.profile.skills.forEach(skill => {    
    let skills = document.querySelector(".skills");
    skills.innerHTML += `
    <span class="skill-badge">${skill}</span>
    `;
  });
  let project_container = document.querySelector(".project-container");
  project_container.innerHTML = `
    <h6 class="fw-bold mb-1">${data.projects.title}</h6>
    <p class="text-muted small mb-2">${data.projects.description}</p>
  `;
}
fetchData("../data/data.json");