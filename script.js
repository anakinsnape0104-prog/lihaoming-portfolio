const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const pageLinks = document.querySelectorAll("[data-page-link]");
const pages = document.querySelectorAll("[data-page]");
const defaultPage = "home";

function closeMenu() {
  navToggle.classList.remove("is-open");
  navLinks.classList.remove("is-open");
  navToggle.setAttribute("aria-expanded", "false");
}

function showPage(pageId, shouldUpdateHash = true) {
  const targetPage = document.querySelector(`[data-page="${pageId}"]`) ? pageId : defaultPage;

  pages.forEach((page) => {
    page.classList.toggle("active", page.dataset.page === targetPage);
  });

  pageLinks.forEach((link) => {
    link.classList.toggle("active", link.dataset.pageLink === targetPage);
  });

  if (shouldUpdateHash && window.location.hash !== `#${targetPage}`) {
    window.history.pushState(null, "", `#${targetPage}`);
  }

  closeMenu();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

navToggle.addEventListener("click", () => {
  const isOpen = navToggle.classList.toggle("is-open");
  navLinks.classList.toggle("is-open", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

pageLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    showPage(link.dataset.pageLink);
  });
});

document.addEventListener("click", (event) => {
  const clickedInsideNav = event.target.closest(".navbar");

  if (!clickedInsideNav && navLinks.classList.contains("is-open")) {
    closeMenu();
  }
});

window.addEventListener("popstate", () => {
  const pageId = window.location.hash.replace("#", "") || defaultPage;
  showPage(pageId, false);
});

const initialPage = window.location.hash.replace("#", "") || defaultPage;
showPage(initialPage, false);
