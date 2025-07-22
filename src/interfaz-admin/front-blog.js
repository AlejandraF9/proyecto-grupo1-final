const API_BASE = "https://api-bakery-production.up.railway.app";

let entradasBlog = [];
let idAbierto = null; // Mantenemos el estado fuera para que no se pierda

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

export async function renderBlog(content) {
  content.innerHTML = "";

  // Crear formulario
  const form = document.createElement("form");
  form.style.marginBottom = "20px";
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
      renderBlog(content); // Pasamos content para que recargue bien
    } catch (error) {
      alert("Error al guardar la entrada");
      console.error(error);
    }
  };

  // Inputs
  const inputNombre = document.createElement("input");
  inputNombre.placeholder = "Nombre";
  inputNombre.style.width = "100%";
  inputNombre.style.marginBottom = "8px";
  form.appendChild(inputNombre);

  const inputFecha = document.createElement("input");
  inputFecha.type = "date";
  inputFecha.style.marginBottom = "8px";
  form.appendChild(inputFecha);

  const inputImagen = document.createElement("input");
  inputImagen.placeholder = "URL de imagen";
  inputImagen.style.width = "100%";
  inputImagen.style.marginBottom = "8px";
  form.appendChild(inputImagen);

  const inputContenido = document.createElement("textarea");
  inputContenido.placeholder = "Contenido de la entrada";
  inputContenido.style.width = "100%";
  inputContenido.style.height = "100px";
  inputContenido.style.marginBottom = "8px";
  form.appendChild(inputContenido);

  const btnGuardar = document.createElement("button");
  btnGuardar.type = "submit";
  btnGuardar.textContent = "Guardar entrada";
  btnGuardar.style.backgroundColor = "#c56e78";
  btnGuardar.style.color = "white";
  btnGuardar.style.border = "none";
  btnGuardar.style.padding = "10px 15px";
  btnGuardar.style.cursor = "pointer";
  btnGuardar.style.borderRadius = "4px";
  form.appendChild(btnGuardar);

  content.appendChild(form);

  // Listado entradas previas
  entradasBlog = await fetchEntradasBlog();

  const lista = document.createElement("div");
  lista.style.borderTop = "1px solid #ccc";
  lista.style.paddingTop = "10px";

  entradasBlog.forEach((e) => {
    const divEntry = document.createElement("div");
    divEntry.style.borderBottom = "1px solid #eee";
    divEntry.style.padding = "5px 0";

    const titulo = document.createElement("div");
    titulo.textContent = `${e.nombre} - ${e.fecha}`;
    titulo.style.fontWeight = "bold";
    titulo.style.cursor = "pointer";
    titulo.style.color = "#c56e78";

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
      texto.style.marginTop = "8px";
      divEntry.appendChild(texto);
      if (e.imagen) {
        const img = document.createElement("img");
        img.src = e.imagen;
        img.style.maxWidth = "100%";
        img.style.marginTop = "8px";
        divEntry.appendChild(img);
      }
    }

    lista.appendChild(divEntry);
  });

  content.appendChild(lista);
}
