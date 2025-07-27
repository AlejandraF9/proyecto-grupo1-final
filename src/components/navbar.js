import logo_tienda from "../assets/images/logo_tienda.webp";
import { userIcon } from "../assets/images/icons";
import { cartIcon } from "../assets/images/icons";
import bluesky_icon from "../assets/images/bluesky_icon.png";
import insta_icon from "../assets/images/insta_icon.png";
import youtube_icon from "../assets/images/youtube_icon.png";
import { renderForm } from "../views/profile";
import { userLogin } from "../views/login";

export function renderNavbar() {
  //me traigo el div del HTML
  const navbarContainer = document.getElementById("container-navbar");

  //creo el primer div contenedor
  const navbarContainerA = document.createElement("div");
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

  const navbarContainerB = document.createElement("div");
  navbarContainerB.className = "second-navbar-container";
  navbarContainer.appendChild(navbarContainerB);

  //Creo un div para luego meter el logo
  const logoDiv = document.createElement("div");
  logoDiv.className = "logo-div";
  navbarContainerB.appendChild(logoDiv);

  //creo la img del logo

  const logoImg = document.createElement("img");
  logoImg.className = "logo-img";
  logoImg.src = logo_tienda;
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
  //const categoriesnavbar = document.createElement ("button");
  //categoriesnavbar.className = "categories-navbar-button"
  //categoriesnavbar.textContent= "Todas las categorías";

  //Cambiar el botón por una imagen SVG
  const categoriesIcon = document.createElement("div");
  categoriesIcon.className = "categories-icon";

  const svgString = `<svg width="22.506" xmlns="http://www.w3.org/2000/svg" height="22.506" id="screenshot-98079989-26a0-806a-8006-8cd218e84281" viewBox="1365.75 115.744 22.506 22.506" style="-webkit-print-color-adjust::exact" xmlns:xlink="http://www.w3.org/1999/xlink" fill="none" version="1.1">
  <g id="shape-98079989-26a0-806a-8006-8cd218e84281" style="fill:#000000" rx="0" ry="0">
    <g id="shape-98079989-26a0-806a-8006-8cd218e8f5b0">
      <g class="fills" id="fills-98079989-26a0-806a-8006-8cd218e8f5b0">
        <path d="M1375.4500732421875,128.5500030517578C1372.5250244140625,125.625,1372.5250244140625,120.87499237060547,1375.4500732421875,117.9375C1378.3748779296875,115.01250457763672,1383.1251220703125,115.01250457763672,1386.0625,117.9375C1388.9874267578125,120.86249542236328,1388.9874267578125,125.61250305175781,1386.0625,128.5500030517578C1383.1375732421875,131.47500610351562,1378.387451171875,131.47500610351562,1375.4500732421875,128.5500030517578Z" fill="none" stroke-linejoin="round" stroke-linecap="round" style="fill:none">
        </path>
      </g>
      <g fill="none" stroke-linejoin="round" stroke-linecap="round" id="strokes-98079989-26a0-806a-8006-8cd313b53768-98079989-26a0-806a-8006-8cd218e8f5b0" class="strokes">
        <g class="inner-stroke-shape">
          <defs>
            <clipPath id="inner-stroke-render-2004-98079989-26a0-806a-8006-8cd218e8f5b0-0">
              <use href="#stroke-shape-render-2004-98079989-26a0-806a-8006-8cd218e8f5b0-0">
              </use>
            </clipPath>
            <path d="M1375.4500732421875,128.5500030517578C1372.5250244140625,125.625,1372.5250244140625,120.87499237060547,1375.4500732421875,117.9375C1378.3748779296875,115.01250457763672,1383.1251220703125,115.01250457763672,1386.0625,117.9375C1388.9874267578125,120.86249542236328,1388.9874267578125,125.61250305175781,1386.0625,128.5500030517578C1383.1375732421875,131.47500610351562,1378.387451171875,131.47500610351562,1375.4500732421875,128.5500030517578Z" style="fill:none;fill-opacity:none;stroke-width:4;stroke:#ffffff;stroke-opacity:1" id="stroke-shape-render-2004-98079989-26a0-806a-8006-8cd218e8f5b0-0">
            </path>
          </defs>
          <use href="#stroke-shape-render-2004-98079989-26a0-806a-8006-8cd218e8f5b0-0" clip-path="url(&#x27;#inner-stroke-render-2004-98079989-26a0-806a-8006-8cd218e8f5b0-0&#x27;)">
          </use>
        </g>
      </g>
    </g>
    <g id="shape-98079989-26a0-806a-8006-8cd218e8f5b1">
      <g class="fills" id="fills-98079989-26a0-806a-8006-8cd218e8f5b1">
        <path d="M1375.125,128.875L1365.75,138.25" fill="none" stroke-linejoin="round" stroke-linecap="round" style="fill:none">
        </path>
      </g>
      <g fill="none" stroke-linejoin="round" stroke-linecap="round" id="strokes-98079989-26a0-806a-8006-8cd313b53769-98079989-26a0-806a-8006-8cd218e8f5b1" class="strokes">
        <g class="stroke-shape">
          <path d="M1375.125,128.875L1365.75,138.25" style="fill:none;fill-opacity:none;stroke-width:2;stroke:#ffffff;stroke-opacity:1">
          </path>
        </g>
      </g>
    </g>
  </g>
</svg>
`;

  const parser = new DOMParser();
  const svgDoc = parser.parseFromString(svgString, "image/svg+xml");
  const svgElement = svgDoc.documentElement;

  categoriesIcon.appendChild(svgElement);
  searchDiv.appendChild(categoriesIcon);

  //aquí hay que poner un enlace a categorías
  //searchDiv.appendChild(categoriesnavbar);

  //creo el buscador
  const searchNavbar = document.createElement("input");
  searchNavbar.className = "search-box-navbar";
  searchNavbar.type = "search";
  searchNavbar.placeholder = "Busca aquí tu producto preferido";
  searchDiv.appendChild(searchNavbar);

  //creo un div para meter iconos de usuario y carrito
  const logCartDivNavbar = document.createElement("div");
  logCartDivNavbar.className = "login-div-navbar";
  navbarContainerB.appendChild(logCartDivNavbar);

  //creo el link para el icono de usuario.Tengo que crear el link primero porque el link envuelve el div del svg
  const loginNavbarLink = document.createElement("a");
  loginNavbarLink.href = "#";
  loginNavbarLink.addEventListener("click", (e) => {
    e.preventDefault();

    const currentUser = JSON.parse(localStorage.getItem("current-user"));

    if (!currentUser) {
      userLogin(); // abre el modal de login
    } else {
      renderForm(
        {
          nombre: currentUser.nombre,
          email: currentUser.email,
        },
        {
          title: "Tu perfil",
          onSubmit: (data) => {
            console.log("Actualizar perfil con:", data);
          },
          showLogout: true,
        }
      );
    }
  });
  logCartDivNavbar.appendChild(loginNavbarLink);

  //creo un div para meter el svg que es la imagen de usuario
  const loginIconNavbar = document.createElement("div");
  loginIconNavbar.className = "login-icon-navbar";
  loginIconNavbar.innerHTML = userIcon;
  loginNavbarLink.appendChild(loginIconNavbar);

  //creo el link para meter el enlace de carrito
  const cartNavbarLink = document.createElement("a");
  cartNavbarLink.href = "/shoppingCart";
  logCartDivNavbar.appendChild(cartNavbarLink);

  //creo el div para meter el svg del carrito
  const cartIconNavbar = document.createElement("div");
  cartIconNavbar.className = "cart-icon-navbar";
  cartIconNavbar.innerHTML = cartIcon;
  cartNavbarLink.appendChild(cartIconNavbar);

  // Creo el circulito del número
  const cartCounter = document.createElement("span");
  cartCounter.className = "cart-counter";

  // Obtengo los productos del carrito
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const cartProductCounter = cartItems.length;

  if (cartProductCounter > 0) {
    cartCounter.textContent = cartProductCounter;
    cartCounter.classList.add("visible");
  } else {
    cartCounter.classList.remove("visible");
  }

  cartIconNavbar.appendChild(cartCounter);

  //Creo el tercer container

  const navbarContainerC = document.createElement("div");
  navbarContainerC.className = "third-navbar-container";
  navbarContainer.appendChild(navbarContainerC);

  //creo el enlace de Home
  const homeNavbar = document.createElement("a");
  homeNavbar.className = "navbar-text";
  homeNavbar.href = "/home";
  homeNavbar.textContent = "Productos";
  navbarContainerC.appendChild(homeNavbar);

  //creo el enlace del conócenos
  const KnowUsNavbar = document.createElement("a");
  KnowUsNavbar.className = "navbar-text";
  KnowUsNavbar.href = "/bio";
  KnowUsNavbar.setAttribute("data-link", "");
  KnowUsNavbar.textContent = "¿Quiénes somos?";
  navbarContainerC.appendChild(KnowUsNavbar);

  //creo el enlace del blog
  const blogNavbar = document.createElement("a");
  blogNavbar.className = "navbar-text";
  blogNavbar.href = "/blog";
  blogNavbar.textContent = "Blog";
  navbarContainerC.appendChild(blogNavbar);

  //creo el enlace del contacto
  const contactNavbar = document.createElement("a");
  contactNavbar.className = "navbar-text";
  contactNavbar.href = "/contact";
  contactNavbar.textContent = "Contacto";
  navbarContainerC.appendChild(contactNavbar);

  /////////MENÚ HAMBURGUESA////////////
  const burgerButton = document.createElement("button");
  burgerButton.className = "burger-button";
  burgerButton.setAttribute("aria-label", "Abrir menú");
  burgerButton.innerHTML = `
  <svg width="25" height="25" viewBox="456.5 142 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g>
      <rect x="456.5" y="142" width="25" height="25" rx="0" ry="0" fill="none"></rect>
      <path d="M460.40625,148.25L477.59375,148.25M460.40625,154.5L477.59375,154.5M460.40625,160.75L477.59375,160.75" 
        stroke="#111111" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/>
    </g>
  </svg>
`;

  //Agrego el botón al navbar
  navbarContainerB.appendChild(burgerButton);

  //Función para mostrar/ocultar el tercer contenedor
  burgerButton.addEventListener("click", () => {
    navbarContainerC.classList.toggle("visible");
  });
}
