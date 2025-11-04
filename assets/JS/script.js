window.addEventListener('scroll', function() {
  const navbar = document.querySelector('header');
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

const modal = document.getElementById("loginModal");
const openBtn = document.getElementById("openmodal");
const closeBtn = document.getElementById("close");

openBtn.addEventListener("click", openModal);
closeBtn.addEventListener("click", closeModal);

function openModal() {
  modal.style.display = "flex";
}

function closeModal() {
  modal.style.display = "none";
}