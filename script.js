const menuButton = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const themeToggle = document.querySelector(".theme-toggle");
const navItems = Array.from(document.querySelectorAll(".nav-links a"));
const resumeSection = document.querySelector("#resume-cv");
const resumeClose = document.querySelector(".resume-close");
let resumeViewerOpen = false;

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

function closeResumeSection() {
  if (!resumeSection) return;
  resumeSection.hidden = true;
  resumeViewerOpen = false;
}

function openResumeSection() {
  if (!resumeSection) return;
  resumeSection.hidden = false;
  resumeViewerOpen = true;
  setActiveNav("resume-cv");
  requestAnimationFrame(() => {
    resumeSection.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

menuButton?.addEventListener("click", () => {
  const expanded = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!expanded));
  navLinks?.classList.toggle("open");
});

navItems.forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href")?.slice(1);
    if (targetId === "resume-cv") {
      event.preventDefault();
      openResumeSection();
      navLinks?.classList.remove("open");
      menuButton?.setAttribute("aria-expanded", "false");
      return;
    }

    if (targetId) {
      closeResumeSection();
      setActiveNav(targetId);
    }
    navLinks?.classList.remove("open");
    menuButton?.setAttribute("aria-expanded", "false");
  });
});

const sections = navItems
  .map((item) => document.querySelector(item.getAttribute("href")))
  .filter((section) => section?.id !== "resume-cv")
  .filter(Boolean);

const observer = new IntersectionObserver(
  (entries) => {
    if (resumeViewerOpen) return;

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

resumeClose?.addEventListener("click", () => {
  closeResumeSection();
  setActiveNav("overview");
  document.querySelector("#overview")?.scrollIntoView({ behavior: "smooth", block: "start" });
});

if (window.location.hash === "#resume-cv") {
  openResumeSection();
}

themeToggle?.addEventListener("click", () => {
  document.body.classList.toggle("focus-mode");
});
