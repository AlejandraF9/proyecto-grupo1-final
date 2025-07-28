import { openModal, closeModal } from "../utils/modal&overlay";

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

  const filtrosDiv = document.createElement("div");
  filtrosDiv.classList.add("admin-filtros");

  const selectCat = document.createElement("select");
  selectCat.classList.add("admin-select");
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

  const inputBuscar = document.createElement("input");
  inputBuscar.type = "search";
  inputBuscar.placeholder = "Buscar por nombre...";
  inputBuscar.classList.add("admin-input-buscar");
  filtrosDiv.appendChild(inputBuscar);

  content.appendChild(filtrosDiv);

  const tabla = document.createElement("table");
  tabla.classList.add("admin-table");

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
          row.appendChild(td);
        });

        const tdAcc = document.createElement("td");

        const btnModificar = document.createElement("button");
        btnModificar.textContent = "Modificar";
        btnModificar.classList.add("admin-btn-modificar");
        btnModificar.onclick = () => {
          modifyData(p);
        };

        tdAcc.appendChild(btnModificar);

        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "Eliminar";
        btnEliminar.classList.add("admin-btn-eliminar");
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

function debounce(fn, delay) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
}

function modifyData(p) {
  const containerFormModify = document.createElement("div");
  containerFormModify.classList.add("modal-productos-overlay");

  const formModify = document.createElement("form");
  formModify.classList.add("modal-productos-form");

  const btnClose = document.createElement("button");
  btnClose.classList.add("modal-close-button");
  btnClose.type = "button";
  btnClose.innerHTML = "&times;";
  btnClose.onclick = closeModal;
  formModify.appendChild(btnClose);

  Object.entries(p).forEach(([key, valor]) => {
    if (["_id", "__v"].includes(key)) return;

    const fieldWrapper = document.createElement("div");

    const label = document.createElement("label");
    label.textContent = key;
    label.htmlFor = key;

    const input = document.createElement("input");
    input.name = key;
    input.id = key;
    input.value = valor;

    fieldWrapper.appendChild(label);
    fieldWrapper.appendChild(input);
    formModify.appendChild(fieldWrapper);
  });

  const btnSave = document.createElement("button");
  btnSave.classList.add("btnSaveModify");
  btnSave.type = "submit";
  btnSave.textContent = "Guardar";
  formModify.appendChild(btnSave);

  formModify.onsubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(formModify);
    const dataUpdateRaw = Object.fromEntries(formData.entries());

    const cleanDataUpdate = {};
    for (const [key, value] of Object.entries(dataUpdateRaw)) {
      if (["temporal1", "temporal2", "temporal3", "temporal4"].includes(key)) {
        cleanDataUpdate[key] = value === "true";
      } else if (key === "precio") {
        cleanDataUpdate[key] = parseFloat(value);
      } else if (value.trim() !== "") {
        cleanDataUpdate[key] = value;
      }
    }

    try {
      const response = await fetch(`${API_BASE}/productos/${p._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cleanDataUpdate),
      });

      if (!response.ok) throw new Error("Error al guardar cambios");

      alert("Producto guardado correctamente");
      closeModal();
    } catch (error) {
      console.error("Error en la actualización:", error);
      alert("Hubo un problema al guardar los cambios");
    }
  };

  containerFormModify.appendChild(formModify);
  openModal(containerFormModify);
}
