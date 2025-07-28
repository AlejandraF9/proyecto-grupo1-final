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
    const tabla = document.createElement("table");
    tabla.classList.add("admin-content");

    const thead = document.createElement("thead");
    const headRow = document.createElement("tr");
    ["ID", "Nombre", "Role", "Eliminar"].forEach((text) => {
      const th = document.createElement("th");
      th.textContent = text;
      headRow.appendChild(th);
    });
    thead.appendChild(headRow);
    tabla.appendChild(thead);

    const tbody = document.createElement("tbody");

    usuariosData.forEach((u) => {
      const row = document.createElement("tr");

      [u._id, u.name, u.role].forEach((text) => {
        const td = document.createElement("td");
        td.textContent = text;
        row.appendChild(td);
      });

      const tdEliminar = document.createElement("td");
      const btnEliminar = document.createElement("button");
      btnEliminar.textContent = "Eliminar";
      btnEliminar.classList.add("btnEliminar");
      btnEliminar.onclick = async () => {
        if (confirm(`¿Eliminar usuario ${u.name}?`)) {
          await eliminarUsuario(u._id);
          renderUsuarios(content);
        }
      };
      tdEliminar.appendChild(btnEliminar);
      row.appendChild(tdEliminar);

      tbody.appendChild(row);
    });

    tabla.appendChild(tbody);
    content.appendChild(tabla);
  } catch (error) {
    content.textContent = "Error cargando usuarios.";
    console.error(error);
  }
}
