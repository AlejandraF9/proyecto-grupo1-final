

import logo_tienda from "../assets/images/logo_tienda.webp";
import { userIcon } from "../assets/images/icons";
import { cartIcon } from "../assets/images/icons";
import bluesky_icon from "../assets/images/bluesky_icon.png"
import insta_icon from "../assets/images/insta_icon.png"
import youtube_icon from "../assets/images/youtube_icon.png"


export function renderNavbar (){
//me traigo el div del HTML
const navbarContainer = document.getElementById("container-navbar");

//creo el primer div contenedor
const navbarContainerA = document.createElement ("div");
navbarContainerA.className = "first-navbar-container";
navbarContainer.appendChild(navbarContainerA);

//creo el enlace de instagram
const instaNavbar = document.createElement("img");
instaNavbar.className = "rrss-icons";
instaNavbar.src = insta_icon;
instaNavbar.alt = "logo de instagram";
navbarContainerA.appendChild(instaNavbar);

//creo el enlace de bluesky
const blueskykaNavbar = document.createElement("img");
blueskykaNavbar.className = "rrss-icons";
blueskykaNavbar.src = bluesky_icon;
blueskykaNavbar.alt = "logo de Bluesky";
navbarContainerA.appendChild(blueskykaNavbar);

//creo el enlace de youTube
const youtubeNavbar = document.createElement("img");
youtubeNavbar.className = "rrss-icons";
youtubeNavbar.src = youtube_icon;
youtubeNavbar.alt = "logo de youTube";
navbarContainerA.appendChild(youtubeNavbar);

//creo el segundo contenedor que subdivide el navbar

const navbarContainerB = document.createElement ("div");
navbarContainerB.className = "second-navbar-container";
navbarContainer.appendChild(navbarContainerB);

//Orden importante para móvil:
//1. Burger button
//2. second-navbar-container con logo y login/cart icons
//3. third-navbar-container (oculto al inicio)

//Creo un div para luego meter el logo
const logoDiv = document.createElement("div");
logoDiv.className = "logo-div";
navbarContainerB.appendChild(logoDiv);

//creo la img del logo

const logoImg = document.createElement("img");
logoImg.className = "logo-img";
logoImg.src=logo_tienda;
logoImg.alt = "Logo de la tienda";
logoDiv.append(logoImg);

//vamos a ver si el logo es lo que está creando el parpadeo en el navbar al renderizarlo
logoImg.onload = () => {
  console.log("Logo cargado completamente");
};

//creo un div para meter el button categories y el search
const searchDiv = document.createElement("div");
searchDiv.className = "search-div";
navbarContainerB.appendChild(searchDiv);


//creo el botón de categorías
const categoriesnavbar = document.createElement ("button");
categoriesnavbar.className = "categories-navbar-button"
categoriesnavbar.textContent= "TODAS LAS CATEGORÍAS";
//aquí hay que poner un enlace a categorías
searchDiv.appendChild(categoriesnavbar);

//creo el buscador
const searchNavbar = document.createElement ("input");
searchNavbar.className = "search-box-navbar";
searchNavbar.type = "search"
searchNavbar.placeholder = "BUSCA AQUÍ TU PRODUCTO PREFERIDO";
searchDiv.appendChild(searchNavbar);

//creo un div para meter iconos de usuario y carrito
const logCartDivNavbar = document.createElement("div");
logCartDivNavbar.className = "login-div-navbar";
navbarContainerB.appendChild(logCartDivNavbar);

//creo el link para el icono de usuario.Tengo que crear el link primero porque el link envuelve el div del svg
const loginNavbarLink = document.createElement("a");
loginNavbarLink.href = "/login";
logCartDivNavbar.appendChild(loginNavbarLink);

//creo un div para meter el svg que es la imagen de usuario
const loginIconNavbar = document.createElement("div");
loginIconNavbar.className = "login-icon-navbar";
loginIconNavbar.innerHTML = userIcon;
loginNavbarLink.appendChild(loginIconNavbar);

//creo el link para meter el enlace de carrito
const cartNavbarLink = document.createElement("a");
cartNavbarLink.href = "/carrito";
logCartDivNavbar.appendChild(cartNavbarLink);

//creo el div para meter el svg del carrito
const cartIconNavbar = document.createElement("div");
cartIconNavbar.className = "cart-icon-navbar";
cartIconNavbar.innerHTML = cartIcon;
cartNavbarLink.appendChild(cartIconNavbar);

//Creo el tercer container

const navbarContainerC = document.createElement("div");
navbarContainerC.className = "third-navbar-container";
navbarContainer.appendChild(navbarContainerC);



//creo el enlace de Home
const homeNavbar = document.createElement("a");
homeNavbar.className = "navbar-text";
homeNavbar.href = "/home";
homeNavbar.textContent = "PRODUCTOS"
navbarContainerC.appendChild(homeNavbar);

//creo el enlace del conócenos
const KnowUsNavbar = document.createElement("a");
KnowUsNavbar.className = "navbar-text";
KnowUsNavbar.href = "/bio";
KnowUsNavbar.setAttribute("data-link", "");
KnowUsNavbar.textContent = "¿QUIÉNES SOMOS?";
navbarContainerC.appendChild(KnowUsNavbar);

//creo el enlace del blog
const blogNavbar = document.createElement("a");
blogNavbar.className = "navbar-text";
blogNavbar.href = "/blog";
blogNavbar.textContent = "BLOG"
navbarContainerC.appendChild(blogNavbar);

//creo el enlace del contacto
const contactNavbar = document.createElement("a");
contactNavbar.className = "navbar-text";
contactNavbar.href = "/contact";
contactNavbar.textContent = "CONTACTO"
navbarContainerC.appendChild(contactNavbar);

///////////////CAROLINA/////////////////
//MENÚ HAMBURGUESA// => SOLO PARA MÓVIL
const burgerButton = document.createElement("button");
burgerButton.className = "burger-button";
burgerButton.setAttribute("aria-label", "Abrir menú");

burgerButton.innerHTML = `
<svg width="24" height="24" viewBox="25 42 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M25.40625,42.25L42.59375,42.25M25.40625,48.5L42.59375,48.5M25.40625,54.75L42.59375,54.75" 
        stroke="#111" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

navbarContainer.appendChild(burgerButton);

//Evento para mostrar y ocultar el menú
burgerButton.addEventListener("click", () => {
  navbarContainerC.classList.toggle("visible");
});

navbarContainerC.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navbarContainerC.classList.remove("visible");
  });
});

}

