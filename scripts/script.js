//==================== home page ================
// the window scroll action nav bar:

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

if (openBtn && closeBtn && modal) {
  openBtn.addEventListener("click", () => modal.style.display = "flex");
  closeBtn.addEventListener("click", () => modal.style.display = "none");
}

function displayProfile(profile) {
  if (!document.querySelector(".profile_info")) return;
  document.querySelector(".profile_info").innerHTML = `
    <h2 class="profile-name mb-1">${profile.first_name} ${profile.last_name}</h2>
    <p class="mb-2">${profile.bio}</p>
  `;

  document.querySelector(".about").innerHTML = `<p class="mb-2">${profile.description}</p>`;

  let skillsContainer = document.querySelector(".skills");
  skillsContainer.innerHTML = "";
  profile.skills.forEach(skill => {
    skillsContainer.innerHTML += `<span class="skill-badge">${skill}</span>`;
  });

  let stars = "";
  
  for (let index = 0; index < profile.rating; index++) {
    stars += `<i class="bi bi-star-fill"></i>`
  }

  if (profile.rating < 5) {
    let result = 5 - profile.rating;
    for (let index = 0; index < result; index++) {
      stars += `<i class="bi bi-star"></i>`
    }
  }

  document.querySelector(".rating").innerHTML = `
    ${stars}
  `
  // document.querySelector(".hourly-rate-box h4").textContent = `$${profile.hourly_rate} / h`;
  // document.querySelector(".website-project-box h4").textContent = `${profile.pricing.website_project}`;
  // document.querySelector(".app-box h4").textContent = `${profile.pricing.full_app_development}`;
}

function displayUsers(profile) {
  let freelancer_template = document.querySelector(".freelancer-template");
  let freelancer_container = document.getElementById("freelancerContainer");
  let clone = freelancer_template.cloneNode(true)
  clone.classList.remove("d-none")
  clone.innerHTML = `  
    <div class="card-body text-center">
      <div class="avatar-wrap">
        <img class="rounded-circle h-25 w-25" src="../assets/img/freelancer.png"/>
      </div>
      <h4 class="title">${profile.first_name} ${profile.last_name}</h4>
      <p class="subtitle">${profile.bio}</p>
      <div class="rating d-flex justify-content-center align-items-center">
        <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1; color:#f59e0b;">star</span>
        <strong>5.0</strong>
        <span class="text-muted-small">(98)</span>
      </div>
    </div>
    <div class="card-desc bio p-4">${profile.description}</div>
    <div class="card-footer p-4 mt-auto"><a href="../views/profile.html?id=${profile.id}" class="btn btn-outline-primary w-100">View Profile</a></div>
  `
  freelancer_container.appendChild(clone);
}

function displayProjects(project) {
  let project_container = document.querySelector(".project-container");
    project_container.innerHTML +=`
      <div class="col-md-4">
        <div class="project-card border rounded-5 overflow-hidden shadow-sm">
          <div class="p-3">
            <h6 class="fw-bold mb-1">${project.title}</h6>
            <p class="text-muted small mb-2">${project.description}</p>
          </div>
          <img src="../assets/img/project.jpg" alt="${project.title}" class="w-100 project-img">
        </div>
      </div>
    `
};

function displayReview(reviews) {
  let review_card = document.querySelector(".Avis_container")
  if (!review_card) return;
  review_card.innerHTML = "";
  reviews.forEach(review => {

    let stars = "";
    for (let i = 0; i < review.rating; i++) {
      stars += `<i class="bi bi-star-fill"></i>`;
    }
    if (review.rating < 5) {
      let rest = 5 - review.rating;
      for (let index = 0; index < rest; index++) {
        stars += `<i class="bi bi-star"></i>`;
      } 
    }
    review_card.innerHTML +=`
      <div class="col-md-6">
        <div class="review-card">
        <div class="d-flex justify-content-between align-items-center mb-2">
          <strong>${review.author}</strong>
          <div class="text-warning small">
            ${stars}
          </div>
        </div>
        <p class="text-muted mb-0 small">${review.comment}</p>
        </div>
      </div>
    `
  });
}

let urlParams = new URLSearchParams(window.location.search);
let profileId = parseInt(urlParams.get("id"));

async function loadProfileById(file, id) {
  let response = await fetch(file);
  let profiles = await response.json();
  
  let profile = profiles.find(p => p.id === id);
  if (profile) {
    displayProfile(profile);
    fillForm(profile);
    profile.projects.forEach(project => displayProjects(project));
  } else {
    console.error("Profile not found!");
  }
}

async function loadAllProfiles(file) {
  let response = await fetch(file);
  let profiles = await response.json();
  profiles.forEach(profile => {
    displayUsers(profile);
    profile.projects.forEach(project => displayProjects(project))
});
}

async function loadReviews(path) {
  let response = await fetch(path);
  let data = await response.json();
  let reviews = data.reviews;
  
  let stored = JSON.parse(localStorage.getItem("profileData"));
  if (stored) reviews.push(stored);
  
  displayReview(reviews);
  displayAllReviews(reviews);
}

let form = document.getElementById("profileForm");

if (form) {
  form.addEventListener("submit", (e) => {
    let first = e.target.first_name.value;
    let last = e.target.last_name.value;
    let comment = e.target.comment.value;
    let rating = e.target.rating.value;

    let profile = {
      author: `${first} ${last}`,
      rating: rating,
      comment: comment,
    };

    localStorage.setItem("profileData", JSON.stringify(profile));
  });
}

function displayAllReviews(reviews) {
  let container = document.querySelector(".reviews_container");
  if(!container) return;
  container.innerHTML = "";

  reviews.forEach((review) => {
    let stars = "";
    for (let i = 0; i < review.rating; i++) stars += `<i class="bi bi-star-fill text-warning"></i>`;
    for (let i = review.rating; i < 5; i++) stars += `<i class="bi bi-star"></i>`;

    container.innerHTML += `
      <div class="card mb-3 p-3 shadow-sm">
        <h5 class="mb-1">${review.author}</h5>
        <div class="mb-2">${stars}</div>
        <p class="mb-0">${review.comment}</p>
      </div>
    `;
  });
}

function fillForm(profile) {
  document.querySelector("[name='first_name']").value = profile.first_name;
  document.querySelector("[name='last_name']").value = profile.last_name;
  document.querySelector("[name='bio']").value = profile.bio;
  document.querySelector("[name='skills']").value = profile.skills.join(", ");
  // document.querySelector("[name='hourly_rate']").value = profile.hourly_rate;
}
if (form) {
  form.addEventListener("submit", (e) => {
  e.preventDefault();
  let profile = {
    first_name: document.querySelector("[name='first_name']").value,
    last_name: document.querySelector("[name='last_name']").value,
    bio: document.querySelector("[name='bio']").value,
    skills: document.querySelector("[name='skills']").value.split(",").map(s => s.trim()),
    // hourly_rate: document.querySelector("[name='hourly_rate']").value,
    about: document.querySelector(".about").textContent
  };

  localStorage.setItem("profileData", JSON.stringify(profile));

  displayProfile(profile);
});}

if (profileId) {
  loadProfileById("../data/Freelancers.json", profileId);
} else {
  loadAllProfiles("../data/Freelancers.json");
}

loadReviews("../data/reviews.json");