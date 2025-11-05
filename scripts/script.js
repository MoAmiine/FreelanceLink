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

