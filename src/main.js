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
      goTo(href); //usamos href para cargar la ruta de la view, y en router.js usamos goTo pathname para cargar la view
    }
  });
});

// Botones del navegador (atrás / adelante). El enrutado cambia la url pero no la vista, por eso usamos el popstate (ahora lee URL y carga vista correspondiente)
window.addEventListener("popstate", () => {
  loadView(window.location.pathname);
});