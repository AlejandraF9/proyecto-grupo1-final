import { showToast } from "./toastify";

export function getUserEmail(currentUser) {
  if (currentUser) return currentUser.email;

  const email = prompt("Introduce tu email para confirmar tu pedido:");
  if (!email || !email.includes("@")) {
    showToast({
      text: "Por favor introduce un email válido.",
      type: "error",
    });
    return null;
  }
  return email;
}

export function getOrderObject(cartItems, total, discountValue, email, userId) {
  const hoy = new Date().toISOString().slice(0, 10);
  const categoria = cartItems.every((item) => item.date === hoy)
    ? "al día"
    : "encargo";

  return {
    productos: cartItems,
    total: Number((total - discountValue).toFixed(2)),
    categoria,
    email,
    user: userId || null,
  };
}

export async function enviarPedido(order) {
  const response = await fetch(
    "https://api-bakery-production.up.railway.app/orders",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    }
  );

  if (!response.ok) {
    throw new Error("Error al enviar el pedido.");
  }

  return response.json();
}

export async function enviarEmailConfirmacion(orderId, email) {
  const response = await fetch(
    "https://api-bakery-production.up.railway.app/email/enviar-confirmacion",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId, email }),
    }
  );

  if (!response.ok) {
    throw new Error("Error al enviar el correo de confirmación");
  }

  return response.json();
}

export async function procesarPedido(cartItems, total, discountValue) {
  const currentUser = JSON.parse(localStorage.getItem("current-user"));
  let email = currentUser?.email;

  if (!email) {
    email = prompt("Introduce tu email para confirmar tu pedido:");
    if (!email || !email.includes("@")) {
      showToast({
        text: "Por favor introduce un email válido.",
        type: "error",
      });
      return;
    }
  }

  const order = getOrderObject(
    cartItems,
    total,
    discountValue,
    email,
    currentUser ? currentUser._id : null
  );

  console.log("Productos del carrito:");
  cartItems.forEach((item) => console.log(item.nombre, item.url));
  console.log("Pedido a enviar:", order);

  try {
    const data = await enviarPedido(order);
    console.log("Pedido enviado correctamente:", data);

    if (email && data._id) {
      localStorage.setItem("pendingOrderId", data._id);
      localStorage.setItem("pendingEmail", email);
    }
    showToast({
      text: "Tu pedido ha sido registrado correctamente 🎉",
      type: "success",
    });
  } catch (error) {
    console.error("Error al crear el pedido:", error);
    showToast({
      text: "Hubo un problema al enviar el pedido. Intenta de nuevo más tarde.",
      type: "error",
    });
  }
}
