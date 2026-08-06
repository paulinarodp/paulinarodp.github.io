const LANG_STORAGE_KEY = "site-lang";

function initCaseStudyI18n(translations) {
  const langToggle = document.querySelector(".lang-toggle");
  const langOptions = Array.from(document.querySelectorAll(".lang-option"));

  function applyLanguage(lang) {
    const dict = translations[lang] || translations.it;

    document.documentElement.lang = lang;

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (dict[key] !== undefined) {
        el.innerHTML = dict[key];
      }
    });

    const metaDescriptionEl = document.querySelector('[data-i18n-meta="metaDescription"]');
    if (metaDescriptionEl && dict.metaDescription) {
      metaDescriptionEl.setAttribute("content", dict.metaDescription);
    }

    if (dict.pageTitle) {
      document.title = dict.pageTitle;
    }

    langOptions.forEach((btn) => {
      const isActive = btn.getAttribute("data-lang") === lang;
      btn.classList.toggle("active", isActive);
      btn.setAttribute("aria-pressed", String(isActive));
    });

    window.lucide?.createIcons();
  }

  const storedLang = localStorage.getItem(LANG_STORAGE_KEY);
  applyLanguage(storedLang === "en" || storedLang === "it" ? storedLang : "it");

  langToggle?.addEventListener("click", (event) => {
    const button = event.target.closest(".lang-option");
    if (!button) return;
    const lang = button.getAttribute("data-lang");
    localStorage.setItem(LANG_STORAGE_KEY, lang);
    applyLanguage(lang);
  });
}
