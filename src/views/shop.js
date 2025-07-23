import { goTo } from "../router.js";

const API_URL = "https://api-bakery-production.up.railway.app";

export async function renderShop() {
  
  const seccionTienda = document.createElement("section");
  seccionTienda.setAttribute("id", "tienda");

  // Contenedor de filtros
  const contenedorFiltros = document.createElement("div");
  contenedorFiltros.setAttribute("id", "filtros");

  // Contenedor de productos
  const contenedorProductos = document.createElement("div");
  contenedorProductos.setAttribute("id", "contenedor-productos");

  // Filtros
  const categorias = [
    { texto: "Todo", valor: null },
    { texto: "Individuales", valor: "individuales" },
    { texto: "Tartas", valor: "tartas" },
    { texto: "Combinaciones", valor: "combinados" },
    { texto: "Bebidas", valor: "bebidas" },
  ];

  categorias.forEach((cat) => {
    const btn = document.createElement("button");
    btn.textContent = cat.texto;
    btn.classList.add("filtro-btn");

    btn.addEventListener("click", async () => {
      document
        .querySelectorAll(".filtro-btn")
        .forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const productos = await fetchProductos();

      const filtrados = cat.valor
        ? productos.filter(
            (p) => p.categoria?.toLowerCase().trim() === cat.valor
          )
        : productos;

      renderizarProductos(filtrados, contenedorProductos);
    });

    contenedorFiltros.appendChild(btn);
  });

  // Estructura
  seccionTienda.appendChild(contenedorFiltros);
  seccionTienda.appendChild(contenedorProductos);

  app.appendChild(seccionTienda);

  // Insertar debajo de "De temporada"
  const categoriaSection = document.querySelector(".categorys-container");
  if (categoriaSection && categoriaSection.parentNode) {
    categoriaSection.parentNode.insertBefore(
      seccionTienda,
      categoriaSection.nextSibling
    );
  }

  // Mostrar todos al cargar
  const productos = await fetchProductos();
  renderizarProductos(productos, contenedorProductos);
}

async function fetchProductos() {
  try {
    const res = await fetch(`${API_URL}/productos`);
    if (!res.ok) throw new Error("Error al traer productos");
    return await res.json();
  } catch (err) {
    console.error("Error cargando productos:", err);
    return [];
  }
}

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
    precio.textContent = `$${p.precio?.toFixed(2) ?? "0.00"}`;

    // Evento click para acceder a cada producto
    card.addEventListener("click", () => {
      localStorage.setItem("selectedProduct", JSON.stringify(p));
      goTo("/productsDetails");
    });

    card.appendChild(img);
    card.appendChild(nombre);
    card.appendChild(precio);
    contenedor.appendChild(card);
  });
}
