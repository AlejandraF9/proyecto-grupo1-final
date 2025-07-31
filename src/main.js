import { loadView, goTo } from "./router.js";
import { renderNavbar } from "./components/navbar.js";
import { renderFooter } from "./components/footer.js";

document.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname;
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  renderNavbar();
  renderFooter();

  if (usuario && usuario.role === "admin" && path !== "/admin") {
    goTo("/admin");
  } else {
    loadView(path);
  }

  document.body.addEventListener("click", (e) => {
    const link = e.target.closest("[data-link]");
    if (link) {
      e.preventDefault();
      const href = link.getAttribute("href");
      goTo(href);
    }
  });
});

window.addEventListener("popstate", () => {
  loadView(window.location.pathname);
});
