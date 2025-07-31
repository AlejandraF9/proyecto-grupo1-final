import { crearTablaConPaginacion } from "../utils/paginacion";

const API_BASE = "https://api-bakery-production.up.railway.app";

async function fetchUsuarios() {
  const res = await fetch(`${API_BASE}/users`);
  if (!res.ok) throw new Error("Error al cargar usuarios");
  return await res.json();
}

async function eliminarUsuario(id) {
  const res = await fetch(`${API_BASE}/users/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Error al eliminar usuario");
}

export async function renderUsuarios(content) {
  content.innerHTML = "";

  try {
    const usuariosData = await fetchUsuarios();

    const filas = usuariosData.map((u) => {
      const btnEliminar = document.createElement("button");
      btnEliminar.textContent = "Eliminar";
      btnEliminar.classList.add("btnEliminar");
      btnEliminar.onclick = async () => {
        if (confirm(`¿Eliminar usuario ${u.name}?`)) {
          await eliminarUsuario(u._id);
          renderUsuarios(content);
        }
      };

      return [u._id, u.name, u.role, btnEliminar];
    });

    crearTablaConPaginacion({
      titulo: "Usuarios registrados",
      lista: filas,
      columnas: ["ID", "Nombre", "Role", "Eliminar"],
      renderFila: (fila) => fila,
      contenedorDestino: content,
      itemsPorPagina: 10,
    });
  } catch (error) {
    content.textContent = "Error cargando usuarios.";
    console.error(error);
  }
}
