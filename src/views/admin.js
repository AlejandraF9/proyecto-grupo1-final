import { goTo } from "../router.js";
import { renderUsuarios } from "../interfaz-admin/front-usuario.js";
import { renderProductos } from "../interfaz-admin/front-productos.js";
import { renderBlog } from "../interfaz-admin/front-blog.js";
import { renderPedidos } from "../interfaz-admin/front-pedidos.js";
import { renderConfirmacionesEmail } from "../interfaz-admin/front-confirmacionesEmail.js";

const API_BASE = "https://api-bakery-production.up.railway.app";

let currentTab = "Usuarios";
const tabs = [
  "Usuarios",
  "Productos",
  "Blog",
  "Emails confirmación",
  "Pedidos",
];

let tabButtons = {};
let app, banner, menu, content;

function crearBanner() {
  banner = document.createElement("div");
  banner.className = "admin-banner";
  app.appendChild(banner);

  const logo = document.createElement("img");
  logo.src = "./src/assets/images/logo_tienda.webp";
  logo.className = "admin-logo";
  banner.appendChild(logo);

  const closeSession = document.createElement("button");
  closeSession.textContent = "Cerrar sesión";
  closeSession.className = "admin-logout-button";
  banner.appendChild(closeSession);

  closeSession.addEventListener("click", () => {
    localStorage.removeItem("current-user");
    location.href = "/";
  });
}

function crearMenu() {
  menu = document.createElement("nav");
  menu.className = "admin-menu";
  app.appendChild(menu);

  tabButtons = {};

  tabs.forEach((tab) => {
    const btn = document.createElement("button");
    btn.textContent = tab;
    btn.className = "admin-tab-button";
    if (tab === currentTab) btn.classList.add("active");
    btn.addEventListener("click", () => {
      if (currentTab !== tab) {
        currentTab = tab;
        updateTabStyles();
        renderContent();
      }
    });
    menu.appendChild(btn);
    tabButtons[tab] = btn;
  });
}

function updateTabStyles() {
  tabs.forEach((tab) => {
    tabButtons[tab].classList.toggle("active", tab === currentTab);
  });
}

function crearContenedorContenido() {
  content = document.createElement("div");
  content.className = "admin-content";
  app.appendChild(content);
}

function renderContent() {
  switch (currentTab) {
    case "Usuarios":
      renderUsuarios(content);
      break;
    case "Productos":
      renderProductos(content);
      break;
    case "Blog":
      renderBlog(content);
      break;
    case "Emails confirmación":
      renderConfirmacionesEmail(content);
      break;
    case "Pedidos":
      renderPedidos(content);
      break;
  }
}

export default {
  init() {
    const usuario = JSON.parse(localStorage.getItem("current-user"));
    if (!usuario || usuario.role !== "admin") {
      goTo("/login");
      return;
    }

    document.body.innerHTML = "";
    document.body.className = "admin-body";

    app = document.createElement("div");
    app.className = "admin-app";
    document.body.appendChild(app);

    crearBanner();
    crearMenu();
    crearContenedorContenido();

    renderContent();
    updateTabStyles();
  },
};