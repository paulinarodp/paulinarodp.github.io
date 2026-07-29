const menuButton = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const themeToggle = document.querySelector(".theme-toggle");
const navItems = Array.from(document.querySelectorAll(".nav-links a"));

window.lucide?.createIcons();

function setActiveNav(targetId) {
  navItems.forEach((item) => {
    const isActive = item.getAttribute("href") === `#${targetId}`;
    item.classList.toggle("active", isActive);
    if (isActive) {
      item.setAttribute("aria-current", "page");
    } else {
      item.removeAttribute("aria-current");
    }
  });
}

menuButton?.addEventListener("click", () => {
  const expanded = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!expanded));
  navLinks?.classList.toggle("open");
});

navItems.forEach((link) => {
  link.addEventListener("click", () => {
    const targetId = link.getAttribute("href")?.slice(1);
    if (targetId) {
      setActiveNav(targetId);
    }
    navLinks?.classList.remove("open");
    menuButton?.setAttribute("aria-expanded", "false");
  });
});

const sections = navItems
  .map((item) => document.querySelector(item.getAttribute("href")))
  .filter(Boolean);

const observer = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (visible?.target?.id) {
      setActiveNav(visible.target.id);
    }
  },
  {
    rootMargin: "-18% 0px -58% 0px",
    threshold: [0.08, 0.18, 0.32],
  }
);

sections.forEach((section) => observer.observe(section));

themeToggle?.addEventListener("click", () => {
  document.body.classList.toggle("focus-mode");
});
