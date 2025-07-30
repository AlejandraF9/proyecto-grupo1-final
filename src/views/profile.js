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

  // 1. Crear imagen de preview
  const imgPreview = document.createElement("img");
  imgPreview.id = "avatar-preview";

  // 2. Establecer avatar por defecto si no hay uno seleccionado
  const currentUser = JSON.parse(localStorage.getItem("current-user"));
  const defaultAvatar = "src/assets/images/avatar/avatarPredeterminado2.png";
  const currentAvatar = currentUser?.avatar ?? defaultAvatar;

  imgPreview.src = currentAvatar;
  imgPreview.setAttribute("data-selected-avatar", currentAvatar);

  form.appendChild(imgPreview);

  // 3. Crear opciones de avatar y agregarlas al formulario
  const avatarOptions = createAvatarOptions(imgPreview);
  form.appendChild(avatarOptions);

  // 4. Agregar campos del formulario
  Object.entries(fieldsObj).forEach(([key, value]) => {
    const fieldWrapper = document.createElement("div");

    const label = document.createElement("label");
    label.textContent = key;
    label.htmlFor = key;

    const input = document.createElement("input");
    input.name = key;
    input.id = key;
    input.value = value ?? "";

    if (key.toLowerCase().includes("password")) {
      input.type = "password";
    }

    fieldWrapper.appendChild(label);
    fieldWrapper.appendChild(input);
    form.appendChild(fieldWrapper);
  });

  // 5. Enlace a historial
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

  // 6. Botón de enviar
  const submitBtn = document.createElement("button");
  submitBtn.type = "submit";
  submitBtn.textContent = "Guardar";
  form.appendChild(submitBtn);

  // 7. Manejo del submit
  form.onsubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // Añadir el avatar seleccionado al objeto a enviar
    data.avatar = imgPreview.getAttribute("data-selected-avatar");

    try {
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
        showToast({
          text: "Perfil actualizado correctamente.",
          type: "success",
        });
        closeModal();
      }
    } catch (err) {
      console.error("Error al guardar el perfil:", err);
      showToast({ text: "No se pudo actualizar tu perfil.", type: "error" });
    }
  };

  container.appendChild(form);

  // 8. Logout
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

      const cartCounterProducts = document.querySelector(".cart-counter");
      if (cartCounterProducts) {
        cartCounterProducts.classList.remove("visible");
        cartCounterProducts.textContent = "";
      }

      showToast({text: "Has cerrado sesión.", type: "success"});

      closeModal();
      goTo("/");
    });
    
    container.appendChild(logoutBtn);
  }

  openModal(container);
}

export function createAvatarOptions(imgPreview) {
  const avatarSection = document.createElement("section");
  avatarSection.id = "avatar-options";

  const avatars = ["muffin", "pastel", "roll", "tarta"].map((type) => ({
    src: `src/assets/images/avatar/${type}.png`,
    alt: `Avatar ${type}`,
  }));

  avatars.forEach(({ src, alt }) => {
    const avatarImg = document.createElement("img");
    avatarImg.src = src;
    avatarImg.alt = alt;
    avatarImg.classList.add("avatar-option");

    if (imgPreview.getAttribute("data-selected-avatar") === src) {
      avatarImg.classList.add("selected");
    }

    avatarImg.addEventListener("click", () => {
      imgPreview.src = src;
      imgPreview.setAttribute("data-selected-avatar", src);
      avatarSection
        .querySelectorAll("img")
        .forEach((img) => img.classList.remove("selected"));
      avatarImg.classList.add("selected");
    });

    avatarSection.appendChild(avatarImg);
  });

  return avatarSection;
}
