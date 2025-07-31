//Search
async function getAllProducts() {
  const API_URL = "https://api-bakery-production.up.railway.app";
  try {
    const res = await fetch(`${API_URL}/productos`);
    if (!res.ok) throw new Error("Error al traer productos");
    return await res.json();
  } catch (err) {
    console.error("Error cargando productos:", err);
    return [];
  }
}

//Cards
function renderizarProductos(productos, contenedor) {
  contenedor.innerHTML = "";

  if (productos.length === 0) {
    const vacio = document.createElement("p");
    vacio.textContent = "No hay productos disponibles.";
    contenedor.appendChild(vacio);
    return;
  }

  productos.forEach((p) => {
    const card = document.createElement("div");
    card.classList.add("producto");

    const img = document.createElement("img");
    img.src = p.url;
    img.alt = p.nombre;

    const nombre = document.createElement("p");
    nombre.textContent = p.nombre;

    const precio = document.createElement("p");
    precio.textContent = `€${p.precio?.toFixed(2) ?? "0.00"}`;

    card.addEventListener("click", () => {
      localStorage.setItem("selectedProduct", JSON.stringify(p));
      window.location.href = "/productsDetails"; 
    });

    card.appendChild(img);
    card.appendChild(nombre);
    card.appendChild(precio);
    contenedor.appendChild(card);
  });
}

import logo_tienda from "../assets/images/logo_tienda.webp";
import { userIcon } from "../assets/images/icons";
import { cartIcon } from "../assets/images/icons";
import { renderForm } from "../views/profile";
import { userLogin } from "../views/login";
import { goTo } from "../router";
import { updateNavBarProfile } from "../views/profile";

export function renderNavbar() {
  //Div HTML
  const navbarContainer = document.getElementById("container-navbar");

  //Div UNO
  const navbarContainerA = document.createElement("div");
  navbarContainerA.className = "first-navbar-container";
  navbarContainer.appendChild(navbarContainerA);

  const facebookLinkNavBar = document.createElement("a");
  facebookLinkNavBar.href = "#";
  facebookLinkNavBar.rel = "noopener noreferrer";
  facebookLinkNavBar.className = "footer-rrss";
  facebookLinkNavBar.innerHTML = `<svg width="30" xmlns="http://www.w3.org/2000/svg" height="30" id="screenshot-1a2ad72a-1d06-8080-8006-80379f5371e9" viewBox="660 2620 20 19.95" style="-webkit-print-color-adjust::exact" xmlns:xlink="http://www.w3.org/1999/xlink" fill="none" version="1.1">
  <g id="shape-1a2ad72a-1d06-8080-8006-80379f5371e9">
    <g class="fills" id="fills-1a2ad72a-1d06-8080-8006-80379f5371e9">
      <path d="M680,2630C680,2624.47998046875,675.52001953125,2620,670,2620C664.47998046875,2620,660,2624.47998046875,660,2630C660,2634.83984375,663.43994140625,2638.8701171875,668,2639.800048828125L668,2633L666,2633L666,2630L668,2630L668,2627.5C668,2625.56982421875,669.570068359375,2624,671.5,2624L674,2624L674,2627L672,2627C671.449951171875,2627,671,2627.449951171875,671,2628L671,2630L674,2630L674,2633L671,2633L671,2639.949951171875C676.050048828125,2639.449951171875,680,2635.18994140625,680,2630" style="fill:#ffffff">
      </path>
    </g>
  </g>
</svg>`;
  navbarContainerA.appendChild(facebookLinkNavBar);

  const instagramLinkNavBar = document.createElement("a");
  instagramLinkNavBar.href = "#";
  instagramLinkNavBar.rel = "noopener noreferrer";
  instagramLinkNavBar.className = "footer-rrss";
  instagramLinkNavBar.innerHTML = `<svg width="30" xmlns="http://www.w3.org/2000/svg" height="30" id="screenshot-1a2ad72a-1d06-8080-8006-80379f5371e2" viewBox="698 2618 24 24" style="-webkit-print-color-adjust::exact" xmlns:xlink="http://www.w3.org/1999/xlink" fill="none" version="1.1">
  <g id="shape-1a2ad72a-1d06-8080-8006-80379f5371e2" style="fill:#000000" width="24" height="24" rx="0" ry="0">
    <g id="shape-1a2ad72a-1d06-8080-8006-80379f5371e6" style="display:none">
      <g class="fills" id="fills-1a2ad72a-1d06-8080-8006-80379f5371e6">
        <rect rx="0" ry="0" x="698" y="2618" transform="matrix(1.000000, 0.000000, 0.000000, 1.000000, 0.000000, 0.000000)" width="24" height="24" fill="none" style="fill:none">
        </rect>
      </g>
    </g>
    <g id="shape-1a2ad72a-1d06-8080-8006-80379f5371e7">
      <g class="fills" id="fills-1a2ad72a-1d06-8080-8006-80379f5371e7">
        <path d="M705.800048828125,2620L714.199951171875,2620C717.4000244140625,2620,720,2622.60009765625,720,2625.800048828125L720,2634.199951171875C720,2635.73828125,719.388916015625,2637.21337890625,718.30126953125,2638.30126953125C717.2135009765625,2639.388916015625,715.73828125,2640,714.199951171875,2640L705.800048828125,2640C702.5999755859375,2640,700,2637.39990234375,700,2634.199951171875L700,2625.800048828125C700,2622.5966796875,702.5966796875,2620,705.800048828125,2620M705.5999755859375,2622C703.61181640625,2622,702,2623.61181640625,702,2625.60009765625L702,2634.39990234375C702,2636.39013671875,703.6099853515625,2638,705.5999755859375,2638L714.4000244140625,2638C715.354736328125,2638,716.2705078125,2637.62060546875,716.945556640625,2636.945556640625C717.6207275390625,2636.2705078125,718,2635.354736328125,718,2634.39990234375L718,2625.60009765625C718,2623.60986328125,716.3900146484375,2622,714.4000244140625,2622ZM715.25,2623.5C715.9404296875,2623.5,716.5,2624.0595703125,716.5,2624.75C716.5,2625.4404296875,715.9404296875,2626,715.25,2626C714.5595703125,2626,714,2625.4404296875,714,2624.75C714,2624.0595703125,714.5595703125,2623.5,715.25,2623.5M710,2625C712.761474609375,2625,715,2627.238525390625,715,2630C715,2632.761474609375,712.761474609375,2635,710,2635C707.238525390625,2635,705,2632.761474609375,705,2630C705,2627.238525390625,707.238525390625,2625,710,2625M710,2627C708.3431396484375,2627,707,2628.34326171875,707,2630C707,2631.65673828125,708.3431396484375,2633,710,2633C711.6568603515625,2633,713,2631.65673828125,713,2630C713,2628.34326171875,711.6568603515625,2627,710,2627" style="fill:#ffffff">
        </path>
      </g>
    </g>
  </g>
</svg>`;
  navbarContainerA.appendChild(instagramLinkNavBar);

  const blueskyLinkNavBar = document.createElement("a");
  blueskyLinkNavBar.href = "#";
  blueskyLinkNavBar.rel = "noopener noreferrer";
  blueskyLinkNavBar.className = "footer-rrss";
  blueskyLinkNavBar.innerHTML = `<svg width="30" xmlns="http://www.w3.org/2000/svg" height="30" id="screenshot-1a2ad72a-1d06-8080-8006-80379f5371e1" viewBox="738 2618 24 24" style="-webkit-print-color-adjust::exact" xmlns:xlink="http://www.w3.org/1999/xlink" fill="none" version="1.1">
  <g id="shape-1a2ad72a-1d06-8080-8006-80379f5371e1" style="fill:#000000" width="24" height="24" rx="0" ry="0">
    <g id="shape-1a2ad72a-1d06-8080-8006-80379f5371e4" style="display:none">
      <g class="fills" id="fills-1a2ad72a-1d06-8080-8006-80379f5371e4">
        <rect rx="0" ry="0" x="738" y="2618" transform="matrix(1.000000, 0.000000, 0.000000, 1.000000, 0.000000, 0.000000)" width="24" height="24" fill="none" style="fill:none">
        </rect>
      </g>
    </g>
    <g id="shape-1a2ad72a-1d06-8080-8006-80379f5371e5">
      <g class="fills" id="fills-1a2ad72a-1d06-8080-8006-80379f5371e5">
        <path d="M750,2629.387939453125C749.093994140625,2627.626953125,746.6279296875,2624.343994140625,744.3349609375,2622.72607421875C742.137939453125,2621.176025390625,741.301025390625,2621.44287109375,740.751953125,2621.69287109375C740.115966796875,2621.97802734375,740,2622.955078125,740,2623.52783203125C740,2624.10302734375,740.31494140625,2628.237060546875,740.52001953125,2628.927978515625C741.199951171875,2631.2080078125,743.614013671875,2631.97802734375,745.840087890625,2631.73095703125C742.580078125,2632.2138671875,739.6829833984375,2633.40087890625,743.47998046875,2637.62890625C747.657958984375,2641.9541015625,749.2060546875,2636.7021484375,750,2634.0390625C750.7939453125,2636.7021484375,751.7080078125,2641.76513671875,756.4439697265625,2637.62890625C760,2634.0390625,757.4210205078125,2632.2138671875,754.1610107421875,2631.73095703125C756.385986328125,2631.97802734375,758.801025390625,2631.2080078125,759.47998046875,2628.927978515625C759.68505859375,2628.238037109375,760,2624.10302734375,760,2623.529052734375C760,2622.9541015625,759.884033203125,2621.97900390625,759.248046875,2621.69091796875C758.698974609375,2621.44287109375,757.862060546875,2621.173828125,755.6650390625,2622.72412109375C753.3720703125,2624.344970703125,750.905029296875,2627.6279296875,750,2629.387939453125" style="fill:#ffffff">
        </path>
      </g>
    </g>
  </g>
</svg>`;
  navbarContainerA.appendChild(blueskyLinkNavBar);

  const navbarContainerB = document.createElement("div");
  navbarContainerB.className = "second-navbar-container";
  navbarContainer.appendChild(navbarContainerB);

  //Logo
  const logoDiv = document.createElement("div");
  logoDiv.className = "logo-div";
  navbarContainerB.appendChild(logoDiv);

  const logoImg = document.createElement("img");
  logoImg.className = "logo-img";
  logoImg.src = logo_tienda;
  logoImg.alt = "Logo de la tienda";
  logoDiv.append(logoImg);
  logoImg.style.cursor = "pointer";
  logoImg.addEventListener("click", (e) => {
    e.preventDefault();
    goTo("/home");
  });

  //Search div
  const searchDiv = document.createElement("div");
  searchDiv.className = "search-div";
  navbarContainerB.appendChild(searchDiv);

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

  //Search
  const searchNavbar = document.createElement("input");
  searchNavbar.className = "search-box-navbar";
  searchNavbar.type = "search";
  searchNavbar.placeholder = "Busca aquí tu producto preferido";
  searchDiv.appendChild(searchNavbar);

  searchNavbar.addEventListener("search", () => {
    goTo("/home");
  });

  searchNavbar.addEventListener("input", async (e) => {
    console.log("Se está escribiendo en el buscador");
    const query = searchNavbar.value.toLowerCase().trim();
    if (query === "") {
      goTo("/home");
      return;
    }


    const appShowHome = document.getElementById("app");
    appShowHome.innerHTML = "";
    const appContainer = document.createElement("div");
    appContainer.className = "search-div-style";
    appShowHome.appendChild(appContainer);


    if (!appContainer) {
      console.warn(" No se encontró el contenedor #app");

      return;
    }

    const productos = await getAllProducts();
    console.log(" Productos cargados:", productos);

    const productosFiltrados = productos.filter((producto) => {
      const nombre = String(producto.nombre || "").toLowerCase();
      let ingredientes = "";

      if (Array.isArray(producto.ingredientes)) {
        ingredientes = producto.ingredientes.join(", ").toLowerCase();
      } else {
        ingredientes = String(producto.ingredientes || "").toLowerCase();
      }

      const alergeno = String(producto.alergeno || "").toLowerCase();

      return (
        nombre.includes(query) ||
        ingredientes.includes(query) ||
        alergeno.includes(query)
      );
    });

    appContainer.innerHTML = "";
    renderizarProductos(productosFiltrados, appContainer);
  });

  //Usuario
  const logCartDivNavbar = document.createElement("div");
  logCartDivNavbar.className = "login-div-navbar";
  navbarContainerB.appendChild(logCartDivNavbar);

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
          name: currentUser.name,
          email: currentUser.email,
        },
        {
          title: "Tu perfil",
          showLogout: true,
        }
      );
    }
  });
  logCartDivNavbar.appendChild(loginNavbarLink);

  const loginIconNavbar = document.createElement("div");
  loginIconNavbar.className = "login-icon-navbar";
  loginIconNavbar.innerHTML = userIcon;
  loginNavbarLink.appendChild(loginIconNavbar);
  updateNavBarProfile();

  //Shopping Cart
  const cartNavbarLink = document.createElement("a");
  cartNavbarLink.href = "/shoppingCart";
  logCartDivNavbar.appendChild(cartNavbarLink);

  const cartIconNavbar = document.createElement("div");
  cartIconNavbar.className = "cart-icon-navbar";
  cartIconNavbar.innerHTML = cartIcon;
  cartNavbarLink.appendChild(cartIconNavbar);

  const cartCounter = document.createElement("span");
  cartCounter.className = "cart-counter";

  function updateCartCounter() {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const cartCounter = document.querySelector(".cart-counter");
    if (!cartCounter) return;

    const cartProductCounter = cartItems.length;

    if (cartProductCounter > 0) {
      cartCounter.textContent = cartProductCounter;
      cartCounter.classList.add("visible");
    } else {
      cartCounter.classList.remove("visible");
    }
  }

  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const cartProductCounter = cartItems.length;

  if (cartProductCounter > 0) {
    cartCounter.textContent = cartProductCounter;
    cartCounter.classList.add("visible");
  } else {
    cartCounter.classList.remove("visible");
  }

  cartIconNavbar.appendChild(cartCounter);
  updateCartCounter();

  //Div tres
  const navbarContainerC = document.createElement("div");
  navbarContainerC.className = "third-navbar-container";
  navbarContainer.appendChild(navbarContainerC);


  const homeNavbar = document.createElement("a");
  homeNavbar.className = "navbar-text";
  homeNavbar.href = "#";
  homeNavbar.textContent = "Productos";
  homeNavbar.addEventListener("click", (e) => {
    e.preventDefault();
    goTo("/shop");
  });
  navbarContainerC.appendChild(homeNavbar);

  const KnowUsNavbar = document.createElement("a");
  KnowUsNavbar.className = "navbar-text";
  KnowUsNavbar.href = "/bio";
  KnowUsNavbar.setAttribute("data-link", "");
  KnowUsNavbar.textContent = "¿Quiénes somos?";
  navbarContainerC.appendChild(KnowUsNavbar);

  const blogNavbar = document.createElement("a");
  blogNavbar.className = "navbar-text";
  blogNavbar.href = "/blog";
  blogNavbar.textContent = "Blog";
  navbarContainerC.appendChild(blogNavbar);

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

  navbarContainerB.appendChild(burgerButton);

  //mostrar/ocultar el tercer div
  burgerButton.addEventListener("click", () => {
    navbarContainerC.classList.toggle("visible");
  });
}
