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

    const crearTablaPedidos = (titulo, listaPedidos) => {
      const section = document.createElement("section");
      section.classList.add("admin-pedidos-section");

      const heading = document.createElement("h3");
      heading.textContent = titulo;
      heading.classList.add("admin-pedidos-subtitulo");
      section.appendChild(heading);

      const tabla = document.createElement("table");
      tabla.classList.add("admin-pedidos-tabla");

      const thead = document.createElement("thead");
      const headRow = document.createElement("tr");
      ["Nombre", "Precio", "Cantidad", "Email", "Fecha", "Estado"].forEach(
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

      listaPedidos.forEach((pedido) => {
        pedido.productos.forEach((producto) => {
          const row = document.createElement("tr");
          row.classList.add("admin-pedidos-tr");

          const nombre = producto.nombre || "—";
          const precio = producto.precio != null ? `$${producto.precio}` : "—";
          const cantidad = producto.quantity ?? "—";
          const email = pedido.email ?? "—";
          const fecha = pedido.fechaCreacion
            ? new Date(pedido.fechaCreacion).toLocaleDateString()
            : "—";

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
              alert("Estado actualizado correctamente");
            } catch (error) {
              console.error(error);
              alert("Error al actualizar estado");
            }
          });

          [nombre, precio, cantidad, email, fecha].forEach((text) => {
            const td = document.createElement("td");
            td.textContent = text;
            td.classList.add("admin-pedidos-td");
            row.appendChild(td);
          });

          const estadoTd = document.createElement("td");
          estadoTd.classList.add("admin-pedidos-td");
          estadoTd.appendChild(estadoSelect);
          row.appendChild(estadoTd);

          tbody.appendChild(row);
        });
      });

      tabla.appendChild(tbody);
      section.appendChild(tabla);
      content.appendChild(section);
    };

    crearTablaPedidos("Pedidos al día", pedidosAlDia);
    crearTablaPedidos("Pedidos por encargo", pedidosPorEncargo);
  } catch (error) {
    content.innerHTML =
      "<p class='admin-error-texto'>Error cargando pedidos.</p>";
    console.error(error);
  }
}
