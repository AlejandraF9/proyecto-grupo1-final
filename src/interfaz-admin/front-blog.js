import { openModal, closeModal } from "../utils/modal&overlay.js";

const API_BASE = "https://api-bakery-production.up.railway.app";

let entradasBlog = [];
let idAbierto = null;

async function fetchEntradasBlog() {
  const res = await fetch(`${API_BASE}/blog`);
  if (!res.ok) throw new Error("Error al cargar entradas de blog");
  return await res.json();
}

async function crearEntradaBlog(data) {
  const res = await fetch(`${API_BASE}/blog`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error al crear entrada de blog");
  return await res.json();
}

async function eliminarEntradaBlog(id) {
  const res = await fetch(`${API_BASE}/blog/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Error al eliminar la entrada");
}

async function modificarEntradaBlog(id, data) {
  const res = await fetch(`${API_BASE}/blog/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error al modificar la entrada");
  return await res.json();
}

function modifyDataBlog(entrada, onSuccess) {
  const containerFormModify = document.createElement("div");
  containerFormModify.classList.add("modal-blog-overlay");

  const formModify = document.createElement("form");
  formModify.classList.add("modal-blog-form");

  const btnClose = document.createElement("button");
  btnClose.classList.add("modal-close-button");
  btnClose.type = "button";
  btnClose.innerHTML = "&times;";
  btnClose.onclick = closeModal;
  formModify.appendChild(btnClose);

  const campos = ["nombre", "fecha", "imagen", "contenido"];

  campos.forEach((key) => {
    const fieldWrapper = document.createElement("div");

    const label = document.createElement("label");
    label.textContent = key;
    label.htmlFor = key;

    const input =
      key === "contenido"
        ? document.createElement("textarea")
        : document.createElement("input");

    input.name = key;
    input.id = key;
    input.value = entrada[key] || "";
    input.classList.add("admin-input-blog");

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
    const dataUpdate = Object.fromEntries(formData.entries());

    try {
      await modificarEntradaBlog(entrada._id, dataUpdate);
      alert("Entrada modificada con éxito");
      closeModal();
      onSuccess();
    } catch (error) {
      console.error("Error modificando entrada:", error);
      alert("No se pudo modificar la entrada");
    }
  };

  containerFormModify.appendChild(formModify);
  openModal(containerFormModify);
}

export async function renderBlog(content) {
  content.innerHTML = "";

  const form = document.createElement("form");
  form.classList.add("admin-blog-form");
  form.onsubmit = async (e) => {
    e.preventDefault();
    const nombre = inputNombre.value.trim();
    const fecha = inputFecha.value;
    const imagen = inputImagen.value.trim();
    const contenido = inputContenido.value.trim();

    if (!nombre || !fecha || !contenido) {
      alert("Rellena nombre, fecha y contenido");
      return;
    }

    try {
      await crearEntradaBlog({ nombre, fecha, imagen, contenido });
      inputNombre.value = "";
      inputFecha.value = "";
      inputImagen.value = "";
      inputContenido.value = "";
      entradasBlog = await fetchEntradasBlog();
      renderBlog(content);
    } catch (error) {
      alert("Error al guardar la entrada");
      console.error(error);
    }
  };

  const inputNombre = document.createElement("input");
  inputNombre.placeholder = "Nombre";
  inputNombre.classList.add("admin-input-blog");
  form.appendChild(inputNombre);

  const inputFecha = document.createElement("input");
  inputFecha.type = "date";
  inputFecha.classList.add("admin-input-blog");
  form.appendChild(inputFecha);

  const inputImagen = document.createElement("input");
  inputImagen.placeholder = "URL de imagen";
  inputImagen.classList.add("admin-input-blog");
  form.appendChild(inputImagen);

  const inputContenido = document.createElement("textarea");
  inputContenido.placeholder = "Contenido de la entrada";
  inputContenido.classList.add("admin-textarea-blog");
  form.appendChild(inputContenido);

  const btnGuardar = document.createElement("button");
  btnGuardar.type = "submit";
  btnGuardar.textContent = "Guardar entrada";
  btnGuardar.classList.add("admin-btn-guardar-blog");
  form.appendChild(btnGuardar);

  content.appendChild(form);

  entradasBlog = await fetchEntradasBlog();

  const lista = document.createElement("div");
  lista.classList.add("admin-blog-lista");

  entradasBlog.forEach((e) => {
    const divEntry = document.createElement("div");
    divEntry.classList.add("admin-blog-entry");

    const titulo = document.createElement("div");
    titulo.textContent = `${e.nombre} - ${e.fecha}`;
    titulo.classList.add("admin-blog-titulo");

    titulo.onclick = () => {
      if (idAbierto === e._id) {
        idAbierto = null;
        renderBlog(content);
      } else {
        idAbierto = e._id;
        renderBlog(content);
      }
    };
    divEntry.appendChild(titulo);

    if (idAbierto === e._id) {
      const texto = document.createElement("p");
      texto.textContent = e.contenido;
      texto.classList.add("admin-blog-contenido");
      divEntry.appendChild(texto);

      if (e.imagen) {
        const img = document.createElement("img");
        img.src = e.imagen;
        img.classList.add("admin-blog-imagen");
        divEntry.appendChild(img);
      }
      const accionesDiv = document.createElement("div");
      accionesDiv.classList.add("admin-blog-acciones");

      const btnModificar = document.createElement("button");
      btnModificar.textContent = "Modificar";
      btnModificar.classList.add("admin-btn-modificar");
      btnModificar.onclick = () => {
        modifyDataBlog(e, async () => {
          entradasBlog = await fetchEntradasBlog();
          renderBlog(content);
        });
      };

      const btnEliminar = document.createElement("button");
      btnEliminar.textContent = "Eliminar";
      btnEliminar.classList.add("admin-btn-eliminar");
      btnEliminar.onclick = async () => {
        if (confirm(`¿Eliminar la entrada "${e.nombre}"?`)) {
          try {
            await eliminarEntradaBlog(e._id);
            entradasBlog = await fetchEntradasBlog();
            renderBlog(content);
          } catch (error) {
            alert("Error al eliminar la entrada");
          }
        }
      };

      accionesDiv.appendChild(btnModificar);
      accionesDiv.appendChild(btnEliminar);
      divEntry.appendChild(accionesDiv);
    }

    lista.appendChild(divEntry);
  });

  content.appendChild(lista);
}
