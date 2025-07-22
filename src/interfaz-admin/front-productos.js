const API_BASE = "https://api-bakery-production.up.railway.app";

async function fetchProductos(categoria = "", nombre = "") {
  let url = `${API_BASE}/productos?`;
  if (categoria) url += `categoria=${encodeURIComponent(categoria)}&`;
  if (nombre) url += `nombre=${encodeURIComponent(nombre)}&`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Error al cargar productos");
  return await res.json();
}

async function eliminarProducto(id) {
  const res = await fetch(`${API_BASE}/productos/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Error al eliminar producto");
}

export async function renderProductos(content) {
  content.innerHTML = "";

  // Filtros
  const filtrosDiv = document.createElement("div");
  filtrosDiv.style.display = "flex";
  filtrosDiv.style.gap = "10px";
  filtrosDiv.style.marginBottom = "15px";

  // Selector de categoría
  const selectCat = document.createElement("select");
  const optionAll = document.createElement("option");
  optionAll.value = "";
  optionAll.textContent = "Todas las categorías";
  selectCat.appendChild(optionAll);

  const categorias = ["individuales", "tartas", "combinados", "bebidas"];
  categorias.forEach((cat) => {
    const opt = document.createElement("option");
    opt.value = cat;
    opt.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
    selectCat.appendChild(opt);
  });
  filtrosDiv.appendChild(selectCat);

  // Buscador por nombre
  const inputBuscar = document.createElement("input");
  inputBuscar.type = "search";
  inputBuscar.placeholder = "Buscar por nombre...";
  inputBuscar.style.flexGrow = "1";
  inputBuscar.style.padding = "5px 10px";
  filtrosDiv.appendChild(inputBuscar);

  content.appendChild(filtrosDiv);

  // Tabla productos
  const tabla = document.createElement("table");
  tabla.style.width = "100%";
  tabla.style.borderCollapse = "collapse";
  tabla.style.textAlign = "left";

  // Cabecera
  const thead = document.createElement("thead");
  const headRow = document.createElement("tr");
  [
    "Nombre",
    "Precio",
    "Categoría",
    "Ingredientes",
    "Alérgenos",
    "Especial Semanal",
    "Acciones",
  ].forEach((text) => {
    const th = document.createElement("th");
    th.textContent = text;
    th.style.borderBottom = "2px solid #ccc";
    th.style.padding = "8px";
    headRow.appendChild(th);
  });
  thead.appendChild(headRow);
  tabla.appendChild(thead);

  const tbody = document.createElement("tbody");
  tabla.appendChild(tbody);
  content.appendChild(tabla);

  async function filtrarYRenderizar() {
    tbody.innerHTML = "";
    try {
      let productos = await fetchProductos();

      const filtroCategoria = selectCat.value.toLowerCase();
      const filtroNombre = inputBuscar.value.toLowerCase();

      productos = productos.filter((p) => {
        const coincideCategoria =
          !filtroCategoria || p.categoria?.toLowerCase() === filtroCategoria;
        const coincideNombre =
          !filtroNombre || p.nombre?.toLowerCase().includes(filtroNombre);
        return coincideCategoria && coincideNombre;
      });

      if (productos.length === 0) {
        tbody.innerHTML =
          '<tr><td colspan="7">No se encontraron productos.</td></tr>';
        return;
      }

      productos.forEach((p) => {
        const row = document.createElement("tr");
        row.style.borderBottom = "1px solid #eee";

        [
          "nombre",
          "precio",
          "categoria",
          "ingredientes",
          "alergenos",
          "especialSemanal",
        ].forEach((prop) => {
          const td = document.createElement("td");
          td.textContent =
            prop === "precio" ? `$${p[prop].toFixed(2)}` : p[prop] || "";
          td.style.padding = "8px";
          row.appendChild(td);
        });

        const tdAcc = document.createElement("td");
        tdAcc.style.padding = "8px";

        const btnModificar = document.createElement("button");
        btnModificar.textContent = "Modificar";
        btnModificar.style.marginRight = "5px";
        btnModificar.style.backgroundColor = "#c56e78";
        btnModificar.style.color = "white";
        btnModificar.style.border = "none";
        btnModificar.style.padding = "5px 8px";
        btnModificar.style.borderRadius = "4px";
        // Aquí puedes añadir funcionalidad para modificar producto
        tdAcc.appendChild(btnModificar);

        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "Eliminar";
        btnEliminar.style.backgroundColor = "#dc3545";
        btnEliminar.style.color = "white";
        btnEliminar.style.border = "none";
        btnEliminar.style.padding = "5px 8px";
        btnEliminar.style.borderRadius = "4px";
        btnEliminar.onclick = async () => {
          if (confirm(`¿Eliminar producto ${p.nombre}?`)) {
            await eliminarProducto(p._id);
            filtrarYRenderizar();
          }
        };
        tdAcc.appendChild(btnEliminar);

        row.appendChild(tdAcc);
        tbody.appendChild(row);
      });
    } catch (error) {
      tbody.innerHTML =
        '<tr><td colspan="7">Error cargando productos.</td></tr>';
      console.error(error);
    }
  }

  selectCat.onchange = debounce(filtrarYRenderizar, 300);
  inputBuscar.oninput = debounce(filtrarYRenderizar, 300);

  filtrarYRenderizar();
}

// la function debounce sirve para optimizar el rendimiento de las búsquedas, cuando el admin/usuario deja de escribir en el buscador es cuando hace la búsqueda por relación de las letras que haya escrito

function debounce(fn, delay) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
}
