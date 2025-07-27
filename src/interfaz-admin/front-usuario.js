const API_BASE = "https://api-bakery-production.up.railway.app";

// Gestión usuarios
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
    tabla.style.width = "100%";
    tabla.style.borderCollapse = "collapse";
    tabla.style.textAlign = "left";

    const thead = document.createElement("thead");
    const headRow = document.createElement("tr");
    ["ID", "Nombre", "Role", "Eliminar"].forEach((text) => {
      const th = document.createElement("th");
      th.textContent = text;
      th.style.borderBottom = "2px solid #ccc";
      th.style.padding = "8px";
      headRow.appendChild(th);
    });
    thead.appendChild(headRow);
    tabla.appendChild(thead);

    const tbody = document.createElement("tbody");

    usuariosData.forEach((u) => {
      const row = document.createElement("tr");
      row.style.borderBottom = "1px solid #eee";

      [u._id, u.name, u.role].forEach((text) => {
        const td = document.createElement("td");
        td.textContent = text;
        td.style.padding = "8px";
        row.appendChild(td);
      });

      const tdEliminar = document.createElement("td");
      tdEliminar.style.padding = "8px";
      const btnEliminar = document.createElement("button");
      btnEliminar.textContent = "Eliminar";
      btnEliminar.style.backgroundColor = "#c56e78";
      btnEliminar.style.color = "white";
      btnEliminar.style.border = "none";
      btnEliminar.style.padding = "5px 10px";
      btnEliminar.style.cursor = "pointer";
      btnEliminar.style.borderRadius = "4px";
      btnEliminar.onclick = async () => {
        if (confirm(`¿Eliminar usuario ${u.name}?`)) {
          await eliminarUsuario(u._id);
          renderUsuarios(content); // ✅ pasamos el parámetro
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
