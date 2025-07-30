import { showToast } from "../utils/toastify";

const API_BASE = "https://api-bakery-production.up.railway.app";

async function fetchConfirmaciones() {
  const res = await fetch(`${API_BASE}/email/confirmaciones`);
  if (!res.ok) throw new Error("Error al cargar confirmaciones");
  return await res.json();
}

async function reintentarEnvio(id) {
  const res = await fetch(`${API_BASE}/email/reintentar/${id}`, {
    method: "POST",
  });
  if (!res.ok) throw new Error("No se pudo reenviar el correo");
  return await res.json();
}

export async function renderConfirmacionesEmail(content) {
  content.innerHTML =
    "<h2 class='admin-pedidos-titulo'>Confirmaciones de Email</h2>";

  try {
    const confirmaciones = await fetchConfirmaciones();

    const tabla = document.createElement("table");
    tabla.classList.add("admin-pedidos-tabla");

    const thead = document.createElement("thead");
    const headRow = document.createElement("tr");
    ["Email", "Estado", "Fecha de Envío", "Total Pedido", "Reintentar"].forEach(
      (text) => {
        const th = document.createElement("th");
        th.textContent = text;
        th.classList.add("admin-pedidos-th");
        headRow.appendChild(th);
      }
    );
    thead.appendChild(headRow);
    tabla.appendChild(thead);

    const tbody = document.createElement("tbody");

    confirmaciones.forEach((conf) => {
      const row = document.createElement("tr");
      row.classList.add("admin-pedidos-tr");

      const tdEmail = document.createElement("td");
      tdEmail.textContent = conf.email;
      tdEmail.classList.add("admin-pedidos-td");

      const tdEstado = document.createElement("td");
      tdEstado.textContent = conf.enviado ? "✅ Enviado" : "❌ Fallido";
      tdEstado.classList.add("admin-pedidos-td");

      const tdFecha = document.createElement("td");
      tdFecha.textContent = conf.fechaEnvio
        ? new Date(conf.fechaEnvio).toLocaleString()
        : "—";
      tdFecha.classList.add("admin-pedidos-td");

      const tdTotal = document.createElement("td");
      tdTotal.textContent = conf.orderId?.total
        ? `${conf.orderId.total.toFixed(2)}€`
        : "—";
      tdTotal.classList.add("admin-pedidos-td");

      const tdBoton = document.createElement("td");
      tdBoton.classList.add("admin-pedidos-td");

      if (!conf.enviado) {
        const btnReintentar = document.createElement("button");
        btnReintentar.textContent = "Reintentar";
        btnReintentar.classList.add("admin-btn-reintentar");

        btnReintentar.addEventListener("click", async () => {
          try {
            await reintentarEnvio(conf._id);
            showToast({ text: "Correo reenviado con éxito", type: "success" });
            renderConfirmacionesEmail(content); // recargar
          } catch (err) {
            showToast({ text: "Error al reenviar correo", type: "error" });
            console.error(err);
          }
        });

        tdBoton.appendChild(btnReintentar);
      } else {
        tdBoton.textContent = "—";
      }

      row.appendChild(tdEmail);
      row.appendChild(tdEstado);
      row.appendChild(tdFecha);
      row.appendChild(tdTotal);
      row.appendChild(tdBoton);

      tbody.appendChild(row);
    });

    tabla.appendChild(tbody);
    content.appendChild(tabla);
  } catch (error) {
    console.error(error);
    content.innerHTML =
      "<p class='admin-error-texto'>Error cargando confirmaciones.</p>";
  }
}
