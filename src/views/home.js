import logo_tienda from "../assets/images/logo_tienda.webp";
import icono_carrito from "../assets/images/icono_carrito_compra.svg";
import icono_instagram from "../assets/images/icono_instagram.svg";
import icono_tiktok from "../assets/images/icono_tiktok.svg";
import icono_youtube from "../assets/images/icono_youtube.svg";

//me traigo el div del HTML
const navbarContainer = document.getElementById("container-navbar");


//Creo un div para luego meter el logo
const logoDiv = document.createElement("div");
logoDiv.className = "div-logo";
navbarContainer.appendChild(logoDiv);

//creo la img del logo

const logoImg = document.createElement("img");
logoImg.className = "logo-img";
logoImg.src=logo_tienda;
logoImg.alt = "Logo de la tienda";
logoDiv.append(logoImg);

//creo el div en el que voy a meter los textos
const textDiv = document.createElement("div");
textDiv.className = "text-div";
navbarContainer.appendChild(textDiv);

//creo el enlace de Home
const homeNavbar = document.createElement("a");
homeNavbar.className = "navbar-text";
homeNavbar.href = "/home";
homeNavbar.textContent = "Home"
textDiv.appendChild(homeNavbar);

//creo el enlace del blog
const blogNavbar = document.createElement("a");
blogNavbar.className = "navbar-text";
blogNavbar.href = "/blog";
blogNavbar.textContent = "Blog"
textDiv.appendChild(blogNavbar);

//creo el enlace del conócenos
const KnowUsNavbar = document.createElement("a");
KnowUsNavbar.className = "navbar-text";
KnowUsNavbar.href = "/conocenos";
KnowUsNavbar.textContent = "Conócenos"
textDiv.appendChild(KnowUsNavbar);

//creo el enlace del contacto
const contactNavbar = document.createElement("a");
contactNavbar.className = "navbar-text";
contactNavbar.href = "/contact";
contactNavbar.textContent = "Contacto"
textDiv.appendChild(contactNavbar);

//creo el enlace de login
const loginNavbar = document.createElement("a");
loginNavbar.className = "navbar-text";
loginNavbar.href = "/login";
loginNavbar.textContent = "Acceso"
textDiv.appendChild(loginNavbar);

//creo el enlace de carrito
const cartNavbar = document.createElement("img");
cartNavbar.className = "cart-navbar";
cartNavbar.src = icono_carrito;
cartNavbar.alt = "icono carrito de la compra";
textDiv.appendChild(cartNavbar);

//creo el enlace de instagram
const instaNavbar = document.createElement("img");
instaNavbar.className = "rrss-icons";
instaNavbar.src = icono_instagram;
instaNavbar.alt = "logo de instagram";
textDiv.appendChild(instaNavbar);

//creo el enlace de tiktok
const tiktokaNavbar = document.createElement("img");
tiktokaNavbar.className = "rrss-icons";
tiktokaNavbar.src = icono_tiktok;
tiktokaNavbar.alt = "logo de tik tok";
textDiv.appendChild(tiktokaNavbar);

//creo el enlace de youTube
const youtubeNavbar = document.createElement("img");
youtubeNavbar.className = "rrss-icons";
youtubeNavbar.src = icono_youtube;
youtubeNavbar.alt = "logo de youTube";
textDiv.appendChild(youtubeNavbar);








