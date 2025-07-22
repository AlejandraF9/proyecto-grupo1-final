import { renderCategorys } from "./categorys";
import { renderHero } from "./hero";
import { renderShop } from "./shop";
import { renderBlogHome } from "./blog";
import logo_tienda from "../assets/images/logo_tienda.webp";
import { userIcon, cartIcon } from "../assets/images/icons";
import bluesky_icon from "../assets/images/bluesky_icon.png";
import insta_icon from "../assets/images/insta_icon.png";
import youtube_icon from "../assets/images/youtube_icon.png";

export function renderNavbar() {
  const navbarContainer = document.getElementById("container-navbar");
  if (!navbarContainer) {
    console.error("No se encontró #container-navbar en el DOM.");
    return;
  }

  navbarContainer.innerHTML = ""; // Limpia por si ya se había renderizado

  // Primer contenedor del navbar
  const navbarContainerA = document.createElement("div");
  navbarContainerA.className = "first-navbar-container";
  navbarContainer.appendChild(navbarContainerA);

  // Íconos de redes sociales
  const instaNavbar = document.createElement("img");
  instaNavbar.className = "rrss-icons";
  instaNavbar.src = insta_icon;
  instaNavbar.alt = "logo de instagram";
  navbarContainerA.appendChild(instaNavbar);

  const blueskykaNavbar = document.createElement("img");
  blueskykaNavbar.className = "rrss-icons";
  blueskykaNavbar.src = bluesky_icon;
  blueskykaNavbar.alt = "logo de Bluesky";
  navbarContainerA.appendChild(blueskykaNavbar);

  const youtubeNavbar = document.createElement("img");
  youtubeNavbar.className = "rrss-icons";
  youtubeNavbar.src = youtube_icon;
  youtubeNavbar.alt = "logo de youTube";
  navbarContainerA.appendChild(youtubeNavbar);

  // Segundo contenedor
  const navbarContainerB = document.createElement("div");
  navbarContainerB.className = "second-navbar-container";
  navbarContainer.appendChild(navbarContainerB);

  const logoDiv = document.createElement("div");
  logoDiv.className = "logo-div";
  navbarContainerB.appendChild(logoDiv);

  const logoImg = document.createElement("img");
  logoImg.className = "logo-img";
  logoImg.src = logo_tienda;
  logoImg.alt = "Logo de la tienda";
  logoDiv.appendChild(logoImg);

  const searchDiv = document.createElement("div");
  searchDiv.className = "search-div";
  navbarContainerB.appendChild(searchDiv);

  const categoriesnavbar = document.createElement("button");
  categoriesnavbar.className = "categories-navbar-button";
  categoriesnavbar.textContent = "TODAS LAS CATEGORÍAS";
  searchDiv.appendChild(categoriesnavbar);

  const searchNavbar = document.createElement("input");
  searchNavbar.className = "search-box-navbar";
  searchNavbar.type = "search";
  searchNavbar.placeholder = "BUSCA AQUÍ TU PRODUCTO PREFERIDO";
  searchDiv.appendChild(searchNavbar);

  const logCartDivNavbar = document.createElement("div");
  logCartDivNavbar.className = "login-div-navbar";
  navbarContainerB.appendChild(logCartDivNavbar);

  const loginNavbarLink = document.createElement("a");
  loginNavbarLink.href = "/login";
  logCartDivNavbar.appendChild(loginNavbarLink);

  const loginIconNavbar = document.createElement("div");
  loginIconNavbar.className = "login-icon-navbar";
  loginIconNavbar.innerHTML = userIcon;
  loginNavbarLink.appendChild(loginIconNavbar);

  const cartNavbarLink = document.createElement("a");
  cartNavbarLink.href = "/carrito";
  logCartDivNavbar.appendChild(cartNavbarLink);

  const cartIconNavbar = document.createElement("div");
  cartIconNavbar.className = "cart-icon-navbar";
  cartIconNavbar.innerHTML = cartIcon;
  cartNavbarLink.appendChild(cartIconNavbar);

  // Tercer contenedor
  const navbarContainerC = document.createElement("div");
  navbarContainerC.className = "third-navbar-container";
  navbarContainer.appendChild(navbarContainerC);

  const homeNavbar = document.createElement("a");
  homeNavbar.className = "navbar-text";
  homeNavbar.href = "/home";
  homeNavbar.textContent = "PRODUCTOS";
  navbarContainerC.appendChild(homeNavbar);

  const KnowUsNavbar = document.createElement("a");
  KnowUsNavbar.className = "navbar-text";
  KnowUsNavbar.href = "/conocenos";
  KnowUsNavbar.textContent = "¿QUIÉNES SOMOS?";
  navbarContainerC.appendChild(KnowUsNavbar);

  const blogNavbar = document.createElement("a");
  blogNavbar.className = "navbar-text";
  blogNavbar.href = "/blog";
  blogNavbar.setAttribute("data-link", ""); //Añadido por Menchu, a ver si se abre la view del blog así
  blogNavbar.textContent = "BLOG";
  navbarContainerC.appendChild(blogNavbar);

  const contactNavbar = document.createElement("a");
  contactNavbar.className = "navbar-text";
  contactNavbar.href = "/contact";
  contactNavbar.textContent = "CONTACTO";
  navbarContainerC.appendChild(contactNavbar);
}

export default {
  async init() {
    const app = document.getElementById("app");
    app.innerHTML = "";

    console.log("Home view initialized");

    const container = document.createElement("div");
    container.id = "container";
    app.appendChild(container);

    renderHero(container);
    renderCategorys(container);

    const tienda = await renderShop(); // ✅ ya inserta en el DOM

    const blogSection = document.createElement("section");
    blogSection.id = "blog-section";

    tienda.parentNode.insertBefore(blogSection, tienda.nextSibling); // ✅ insertamos solo el blog
    renderBlogHome(blogSection);
  },
};
