import { openModal, closeModal } from "../utils/modal&overlay.js";
import { showToast } from "../utils/toastify.js";
import { crearTablaConPaginacion } from "../utils/paginacion.js";

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

  const tablaContenedor = document.createElement("div");
  content.appendChild(tablaContenedor);

  async function filtrarYRenderizar() {
    tablaContenedor.innerHTML = "";
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
        tablaContenedor.innerHTML =
          '<p class="admin-mensaje-vacio">No se encontraron productos.</p>';
        return;
      }

      function createMiniImage(url) {
        const img = document.createElement("img");
        img.src = url;
        img.alt = "Producto";
        img.style.width = "50px";
        img.style.height = "50px";
        img.style.objectFit = "cover";
        img.style.borderRadius = "5px";
        return img;
      }

      const filas = productos.map((p) => {
        const acciones = document.createElement("div");

        const btnModificar = document.createElement("button");
        btnModificar.textContent = "Modificar";
        btnModificar.classList.add("admin-btn-modificar");
        btnModificar.onclick = () => modifyData(p);
        acciones.appendChild(btnModificar);

        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "Eliminar";
        btnEliminar.classList.add("admin-btn-eliminar");
        btnEliminar.onclick = async () => {
          if (confirm(`¿Eliminar producto ${p.nombre}?`)) {
            await eliminarProducto(p._id);
            filtrarYRenderizar();
          }
        };
        acciones.appendChild(btnEliminar);

        return [
          createMiniImage(p.url),
          p.nombre,
          `€${p.precio.toFixed(2)}`,
          p.categoria,
          p.ingredientes,
          p.alergenos,
          p.especialSemanal ? "Sí" : "No",
          acciones,
        ];
      });

      crearTablaConPaginacion({
        titulo: "Lista de productos",
        lista: filas,
        columnas: [
          "Imagen",
          "Nombre",
          "Precio",
          "Categoría",
          "Ingredientes",
          "Alérgenos",
          "Especial Semanal",
          "Acciones",
        ],
        renderFila: (fila) => fila,
        contenedorDestino: tablaContenedor,
        itemsPorPagina: 10,
      });
    } catch (error) {
      tablaContenedor.innerHTML =
        "<p class='admin-error-texto'>Error cargando productos.</p>";
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

    if (key === "url") {
      const label = document.createElement("label");
      label.textContent = "Imagen actual:";
      label.htmlFor = key;

      const preview = document.createElement("img");
      preview.src = valor;
      preview.alt = "Imagen actual";
      preview.style.maxWidth = "150px";
      preview.style.marginBottom = "10px";

      const fileInput = document.createElement("input");
      fileInput.type = "file";
      fileInput.accept = "image/*";
      fileInput.name = "imagenNueva";
      fileInput.id = "imagenNueva";
      fileInput.classList.add("input-file-visible");

      fieldWrapper.appendChild(label);
      fieldWrapper.appendChild(preview);
      fieldWrapper.appendChild(fileInput);

      fileInput.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (file) {
          preview.src = URL.createObjectURL(file);
        }
      });
    } else {
      const label = document.createElement("label");
      label.textContent = key;
      label.htmlFor = key;

      const input = document.createElement("input");
      input.name = key;
      input.id = key;
      input.value = valor;

      fieldWrapper.appendChild(label);
      fieldWrapper.appendChild(input);
    }

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
    const file = formData.get("imagenNueva");

    if (file && file.size > 0) {
      try {
        const { uploadImageToCloudinary } = await import(
          "../api/apiCloudinary.js"
        );
        const imageUrl = await uploadImageToCloudinary(file);
        formData.set("url", imageUrl);
      } catch (err) {
        console.error("Error subiendo imagen a Cloudinary", err);
        showToast({
          text: "Error al subir la imagen",
          type: "error",
        });
        return;
      }
    }

    const dataUpdateRaw = Object.fromEntries(formData.entries());
    const cleanDataUpdate = {};

    for (const [key, value] of Object.entries(dataUpdateRaw)) {
      if (["temporal1", "temporal2", "temporal3", "temporal4"].includes(key)) {
        cleanDataUpdate[key] = value === "true";
      } else if (key === "precio") {
        cleanDataUpdate[key] = parseFloat(value);
      } else if (key === "url") {
        cleanDataUpdate[key] = value;
      } else if (typeof value === "string" && value.trim() !== "") {
        cleanDataUpdate[key] = value.trim();
      }
    }

    try {
      const response = await fetch(`${API_BASE}/productos/${p._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cleanDataUpdate),
      });

      if (!response.ok) throw new Error("Error al guardar cambios");

      showToast({
        text: "Producto guardado correctamente",
        type: "success",
      });
      closeModal();
      filtrarYRenderizar();
    } catch (error) {
      console.error("Error en la actualización:", error);
      showToast({
        text: "Hubo un problema al guardar los cambios",
        type: "error",
      });
    }
  };

  containerFormModify.appendChild(formModify);
  openModal(containerFormModify);
}
