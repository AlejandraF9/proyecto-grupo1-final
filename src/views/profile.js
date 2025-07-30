import { openModal, closeModal } from "../utils/modal&overlay.js";
import { goTo } from "../router.js";
import { showToast } from "../utils/toastify";

export async function renderForm(
  fieldsObj,
  { onSubmit = null, title = "Mi perfil", showLogout = false }
) {
  const container = document.createElement("div");
  container.classList.add("containerForm");

  const titleEl = document.createElement("h2");
  titleEl.textContent = title;
  container.appendChild(titleEl);

  const form = document.createElement("form");
  form.classList.add("formModify");

  Object.entries(fieldsObj).forEach(([key, value]) => {
    const fieldWrapper = document.createElement("div");

    const label = document.createElement("label");
    label.textContent = key;
    label.htmlFor = key;

    const input = document.createElement("input");
    input.name = key;
    input.id = key;
    input.value = value;

    if (key.toLowerCase().includes("password")) {
      input.type = "password";
    }

    fieldWrapper.appendChild(label);
    fieldWrapper.appendChild(input);
    form.appendChild(fieldWrapper);
  });

  const historyOrders = document.createElement("a");
  historyOrders.href = "#";
  historyOrders.textContent = "Historial de pedidos";
  historyOrders.classList.add("link-historyOrders");
  historyOrders.addEventListener("click", async (e) => {
    e.preventDefault();
    closeModal();
    goTo("/orders");
  });
  form.appendChild(historyOrders);

  const submitBtn = document.createElement("button");
  submitBtn.type = "submit";
  submitBtn.textContent = "Guardar";
  form.appendChild(submitBtn);

  form.onsubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      const currentUser = JSON.parse(localStorage.getItem("current-user"));

      if (onSubmit) {
        await onSubmit(data);
      } else {
        const response = await fetch(
          `https://6874d617dd06792b9c95731e.mockapi.io/users/${currentUser.id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          }
        );

        if (!response.ok) throw new Error("Error al actualizar el perfil");

        const updatedUser = await response.json();
        localStorage.setItem("current-user", JSON.stringify(updatedUser));
        showToast({text: "Perfil actualizado correctamente.", type: "success"});
        closeModal();
      }
    } catch (err) {
      console.error("Error al guardar el perfil:", err);
      showToast({text: "No se pudo actualizar tu perfil.", type: "error"});
    }
  };

  container.appendChild(form);

  if (showLogout) {
    const logoutBtn = document.createElement("button");
    logoutBtn.textContent = "Cerrar sesión";
    logoutBtn.type = "button";
    logoutBtn.style.marginTop = "1rem";
    logoutBtn.addEventListener("click", () => {
      const user = JSON.parse(localStorage.getItem("current-user"));
      if (user) {
        const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
        localStorage.setItem(`cart-${user._id}`, JSON.stringify(cartItems));
      }
      
      localStorage.removeItem("current-user");
      localStorage.removeItem("cartItems");
      localStorage.removeItem("productsByDate");
      localStorage.removeItem("discountCode");

      closeModal();
      location.reload();
    });
    
    container.appendChild(logoutBtn);
  }

  openModal(container);
}
