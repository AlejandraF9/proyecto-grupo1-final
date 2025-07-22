import { goTo } from "../router.js";
import { renderUsuarios } from "../interfaz-admin/front-usuario.js";
import { renderProductos } from "../interfaz-admin/front-productos.js";
import { renderBlog } from "../interfaz-admin/front-blog.js";
import {
  renderPedidos,
  renderPedidosPersonalizados,
} from "../interfaz-admin/front-pedidos.js";

const API_BASE = "https://api-bakery-production.up.railway.app";

let currentTab = "Usuarios";
const tabs = [
  "Usuarios",
  "Productos",
  "Blog",
  "Pedidos personalizados",
  "Pedidos",
];

let tabButtons = {};
let app, banner, menu, content;

function crearBanner() {
  banner = document.createElement("div");
  banner.style.position = "relative";
  banner.style.height = "250px";
  banner.style.backgroundImage =
    "url('https://images.pexels.com/photos/1857157/pexels-photo-1857157.jpeg')";
  banner.style.backgroundSize = "cover";
  banner.style.backgroundPosition = "center";
  banner.style.display = "flex";
  banner.style.alignItems = "center";
  banner.style.padding = "0 20px";
  banner.style.boxSizing = "border-box";
  banner.style.color = "white";
  app.appendChild(banner);

  const logo = document.createElement("img");
  logo.src = "./../../assets/logo_tienda.webp";
  logo.style.height = "70px";
  logo.style.width = "auto";
  logo.style.marginRight = "20px";
  banner.appendChild(logo);

  const logoText = document.createElement("div");
  logoText.textContent = "DUMMIE bakery";
  logoText.style.fontSize = "32px";
  logoText.style.fontWeight = "700";
  logoText.style.textShadow = "0 0 6px rgba(0,0,0,0.5)";
  banner.appendChild(logoText);

  const closeSession = document.createElement("button");
  closeSession.textContent = "Cerrar sesión";
  closeSession.style.position = "absolute";
  closeSession.style.top = "20px";
  closeSession.style.right = "20px";
  closeSession.style.background = "#c56e78";
  closeSession.style.color = "white";
  closeSession.style.border = "none";
  closeSession.style.padding = "10px 20px";
  banner.appendChild(closeSession);

  closeSession.addEventListener("click", () => {
    localStorage.removeItem("current-user");
    goTo("/home");
  });
}

function crearMenu() {
  menu = document.createElement("nav");
  menu.style.display = "flex";
  menu.style.justifyContent = "space-around";
  menu.style.background = "#fff";
  menu.style.padding = "10px 0";
  menu.style.marginTop = "10px";
  menu.style.boxShadow = "0 2px 5px rgba(0,0,0,0.1)";
  app.appendChild(menu);

  tabButtons = {};

  tabs.forEach((tab) => {
    const btn = document.createElement("button");
    btn.textContent = tab;
    btn.style.background = "none";
    btn.style.border = "none";
    btn.style.fontSize = "16px";
    btn.style.cursor = "pointer";
    btn.style.padding = "10px 15px";
    btn.style.transition = "color 0.3s";
    btn.style.color = tab === currentTab ? "#c56e78" : "#555";
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
    tabButtons[tab].style.color = tab === currentTab ? "#c56e78" : "#555";
    tabButtons[tab].style.borderBottom =
      tab === currentTab ? "2px solid #c56e78" : "none";
  });
}

function crearContenedorContenido() {
  content = document.createElement("div");
  content.style.marginTop = "20px";
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
    case "Pedidos personalizados":
      renderPedidosPersonalizados(content);
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
    document.body.style.margin = "0";
    document.body.style.fontFamily =
      "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
    document.body.style.background = "#f9f6f7";

    app = document.createElement("div");
    app.style.maxWidth = "1200px";
    app.style.margin = "0 auto";
    app.style.padding = "10px";
    document.body.appendChild(app);

    crearBanner();
    crearMenu();
    crearContenedorContenido();

    renderContent();
    updateTabStyles();
  },
};
