import { showToast } from "../utils/toastify.js";
import { crearTablaConPaginacion } from "../utils/paginacion.js";

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

async function eliminarConfirmacion(id) {
  const res = await fetch(`${API_BASE}/email/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("No se pudo eliminar la confirmación");
  return await res.json();
}

export async function renderConfirmacionesEmail(content) {
  content.innerHTML =
    "<h2 class='admin-pedidos-titulo'>Confirmaciones de Email</h2>";

  try {
    const confirmaciones = await fetchConfirmaciones();

    const filas = confirmaciones.map((conf) => {
      const estado = conf.enviado ? "✅ Enviado" : "❌ Fallido";
      const fecha = conf.fechaEnvio
        ? new Date(conf.fechaEnvio).toLocaleString()
        : "—";
      const total = conf.orderId?.total
        ? `${conf.orderId.total.toFixed(2)}€`
        : "—";

      const contenedorAcciones = document.createElement("div");
      contenedorAcciones.classList.add("acciones-confirmacion");

      if (!conf.enviado) {
        const btnReintentar = document.createElement("button");
        btnReintentar.textContent = "Reintentar";
        btnReintentar.classList.add("admin-btn-reintentar");
        btnReintentar.addEventListener("click", async () => {
          try {
            await reintentarEnvio(conf._id);
            showToast({ text: "Correo reenviado con éxito", type: "success" });
            renderConfirmacionesEmail(content);
          } catch (err) {
            showToast({ text: "Error al reenviar correo", type: "error" });
            console.error(err);
          }
        });
        contenedorAcciones.appendChild(btnReintentar);
      }

      const btnEliminar = document.createElement("button");
      btnEliminar.textContent = "Eliminar";
      btnEliminar.classList.add("admin-btn-eliminar");
      btnEliminar.addEventListener("click", async () => {
        if (confirm("¿Seguro que quieres eliminar esta confirmación?")) {
          try {
            await eliminarConfirmacion(conf._id);
            showToast({ text: "Eliminado correctamente", type: "success" });
            renderConfirmacionesEmail(content);
          } catch (err) {
            showToast({ text: "Error al eliminar", type: "error" });
            console.error(err);
          }
        }
      });
      contenedorAcciones.appendChild(btnEliminar);

      return [conf.email, estado, fecha, total, contenedorAcciones];
    });

    crearTablaConPaginacion({
      titulo: "Confirmaciones de Email",
      lista: filas,
      columnas: [
        "Email",
        "Estado",
        "Fecha de Envío",
        "Total Pedido",
        "Acciones",
      ],
      renderFila: (fila) => fila,
      contenedorDestino: content,
      itemsPorPagina: 10,
    });
  } catch (error) {
    console.error(error);
    content.innerHTML =
      "<p class='admin-error-texto'>Error cargando confirmaciones.</p>";
  }
}
