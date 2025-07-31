import { showToast } from "../utils/toastify";

export async function getOrdersUser() {
  const currentUser = JSON.parse(localStorage.getItem("current-user"));
  if (!currentUser || !currentUser._id) {
    showToast({text: "Usuario no registrado.", type: "error"});
    return [];
  }

  const userId = currentUser._id;

  try {
    const response = await fetch(
      `https://api-bakery-production.up.railway.app/orders?userId=${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) throw new Error("Error al obtener pedidos");

    const data = await response.json();
    console.log("Pedidos obtenidos correctamente:", data);
    return data;
  } catch (error) {
    console.error("Error al buscar el pedido:", error);
    showToast({text: "Hubo un problema al buscar el pedido.", type: "error"});
    return [];
  }
}

export function createViewHistoryOrders(orders) {
  const containerOrders = document.createElement("div");
  containerOrders.classList.add("containerHistoryOrders");

  orders.forEach((order) => {
    const orderDiv = document.createElement("div");
    orderDiv.classList.add("order");

    const date = new Date(order.fechaCreacion).toLocaleDateString();
    const status = order.status;
    const total = order.total.toFixed(2);

    orderDiv.innerHTML = `
      <h3>Pedido del ${date}</h3>
      <p>Estado: ${status}</p>
      <p>Total: ${total} €</p>
    `;

    const productsList = document.createElement("div");
    productsList.classList.add("productsList");

    order.productos.forEach((prod) => {
      const productDiv = document.createElement("div");
      productDiv.innerHTML = `
        <img src="${prod.url}" alt="${prod.nombre}" class="product-image" />
        <p><strong>${prod.nombre}</strong></p>
        <p>Cantidad: ${prod.quantity}</p>
        <p>Precio: ${prod.precio} €</p>
        ${prod.size ? `<p>Tamaño: ${prod.size}</p>` : ""}
      `;
      productsList.appendChild(productDiv);
    });

    orderDiv.appendChild(productsList);
    containerOrders.appendChild(orderDiv);
  });

  const app = document.querySelector("#app");
  app.innerHTML = "";
  app.appendChild(containerOrders);
}

async function init() {
  const orders = await getOrdersUser();
  createViewHistoryOrders(orders);
}

export default {
  init,
};
