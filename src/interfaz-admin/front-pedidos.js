import { showToast } from "../utils/toastify.js";
import { crearTablaConPaginacion } from "../utils/paginacion.js";

const API_BASE = "https://api-bakery-production.up.railway.app";

async function fetchOrders() {
  const res = await fetch(`${API_BASE}/orders`);
  if (!res.ok) throw new Error("Error al cargar pedidos");
  return await res.json();
}

async function updatePedidoStatus(id, nuevoEstado) {
  const res = await fetch(`${API_BASE}/orders/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status: nuevoEstado }),
  });

  if (!res.ok) {
    throw new Error("Error al actualizar el estado del pedido");
  }
}

export async function renderPedidos(content) {
  content.innerHTML = "<h2 class='admin-pedidos-titulo'>Pedidos</h2>";

  try {
    let pedidos = await fetchOrders();

    pedidos.sort(
      (a, b) =>
        new Date(b.fechaCreacion).getTime() -
        new Date(a.fechaCreacion).getTime()
    );

    const pedidosAlDia = pedidos.filter(
      (p) =>
        p.categoria?.toLowerCase() === "al día" ||
        p.categoria?.toLowerCase() === "al dia" ||
        p.categoria?.toLowerCase() === "dia"
    );

    const pedidosPorEncargo = pedidos.filter(
      (p) =>
        p.categoria?.toLowerCase() === "por encargo" ||
        p.categoria?.toLowerCase() === "encargo"
    );

    const renderFilaPedido = (pedido) => {
      const filas = [];

      pedido.productos.forEach((producto) => {
        const estadoSelect = document.createElement("select");
        estadoSelect.classList.add("admin-pedidos-select");

        [
          "pendiente",
          "procesando",
          "enviado",
          "entregado",
          "cancelado",
        ].forEach((estado) => {
          const option = document.createElement("option");
          option.value = estado;
          option.textContent = estado;
          if (estado === pedido.status) option.selected = true;
          estadoSelect.appendChild(option);
        });

        estadoSelect.addEventListener("change", async () => {
          try {
            await updatePedidoStatus(pedido._id, estadoSelect.value);
            showToast({
              text: "Estado actualizado correctamente",
              type: "success",
            });
          } catch (error) {
            console.error(error);
            showToast({
              text: "Error al actualizar estado",
              type: "error",
            });
          }
        });

        filas.push([
          producto.nombre || "—",
          producto.precio != null ? `$${producto.precio}` : "—",
          producto.quantity ?? "—",
          pedido.email ?? "—",
          pedido.fechaCreacion
            ? new Date(pedido.fechaCreacion).toLocaleDateString()
            : "—",
          estadoSelect,
        ]);
      });

      return filas;
    };

    const renderTablaPedidos = (titulo, lista) => {
      const filasExpandidas = lista.flatMap((pedido) =>
        renderFilaPedido(pedido)
      );

      crearTablaConPaginacion({
        titulo,
        lista: filasExpandidas,
        columnas: ["Nombre", "Precio", "Cantidad", "Email", "Fecha", "Estado"],
        renderFila: (fila) => fila,
        contenedorDestino: content,
        itemsPorPagina: 10,
      });
    };

    renderTablaPedidos("Pedidos al día", pedidosAlDia);
    renderTablaPedidos("Pedidos por encargo", pedidosPorEncargo);
  } catch (error) {
    content.innerHTML =
      "<p class='admin-error-texto'>Error cargando pedidos.</p>";
    console.error(error);
  }
}
