const menuButton = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const themeToggle = document.querySelector(".theme-toggle");

window.lucide?.createIcons();

menuButton?.addEventListener("click", () => {
  const expanded = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!expanded));
  navLinks?.classList.toggle("open");
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks?.classList.remove("open");
    menuButton?.setAttribute("aria-expanded", "false");
  });
});

themeToggle?.addEventListener("click", () => {
  document.body.classList.toggle("focus-mode");
});
