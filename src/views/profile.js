import { openModal, closeModal } from "../utils/modal&overlay.js";
import { goTo } from "../router.js";
import { showToast } from "../utils/toastify";
import { userIcon } from "../assets/images/icons.js";

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

  const imgPreview = document.createElement("img");
  imgPreview.id = "avatar-preview";

  const currentUser = JSON.parse(localStorage.getItem("current-user"));
  const defaultAvatar = "src/assets/images/avatar/avatarPredeterminado2.png";
  const currentAvatar = currentUser?.avatar ?? defaultAvatar;

  imgPreview.src = currentAvatar;
  imgPreview.setAttribute("data-selected-avatar", currentAvatar);

  form.appendChild(imgPreview);

  const avatarOptions = createAvatarOptions(imgPreview);
  form.appendChild(avatarOptions);

  const notificationsSection = document.createElement("div");
  notificationsSection.classList.add("notifications-section");

  const notificationsTitle = document.createElement("h3");
  notificationsTitle.textContent = "Notificaciones";
  notificationsSection.appendChild(notificationsTitle);

  const notificationsList = document.createElement("ul");
  notificationsList.classList.add("notifications-list");
  notificationsSection.appendChild(notificationsList);

  form.appendChild(notificationsSection);

  if (currentUser?._id) {
    try {
      const res = await fetch(
        `https://api-bakery-production.up.railway.app/api/notifications/${currentUser._id}`
      );
      const notificaciones = await res.json();

      if (!Array.isArray(notificaciones) || notificaciones.length === 0) {
        const empty = document.createElement("li");
        empty.textContent = "Sin notificaciones por ahora.";
        notificationsList.appendChild(empty);
      } else {
        notificaciones.forEach((n) => {
          const item = document.createElement("li");
          item.textContent = `${new Date(n.createdAt).toLocaleDateString(
            "es-ES"
          )} - ${n.message}`;
          item.classList.add("notification-item");
          if (!n.read) item.classList.add("unread");
          notificationsList.appendChild(item);
        });
      }
    } catch (err) {
      console.error("Error al cargar notificaciones:", err);
    }
  }

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

    if (data.nombre && !data.name) {
      data.name = data.nombre;
      delete data.nombre;
    }

    data.avatar = imgPreview.getAttribute("data-selected-avatar");

    try {
      if (onSubmit) {
        await onSubmit(data);
      } else {
        const response = await fetch(
          `https://api-bakery-production.up.railway.app/users/${currentUser._id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          }
        );

        if (!response.ok) throw new Error("Error al actualizar el perfil");

        const updatedUser = await response.json();
        localStorage.setItem("current-user", JSON.stringify(updatedUser));
        updateNavBarProfile();
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

      updateNavBarProfile();

      const cartCounterProducts = document.querySelector(".cart-counter");
      if (cartCounterProducts) {
        cartCounterProducts.classList.remove("visible");
        cartCounterProducts.textContent = "";
      }

      showToast({ text: "Has cerrado sesión.", type: "success" });

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

export function updateNavBarProfile() {
  const loginLink = document.querySelector(".login-div-navbar a");

  if (!loginLink) return;

  const currentUser = JSON.parse(localStorage.getItem("current-user"));

  loginLink.innerHTML = "";

  if (currentUser) {
    const avatarImg = document.createElement("img");
    avatarImg.src =
      currentUser.avatar ||
      "src/assets/images/avatar/avatarPredeterminado2.png";
    avatarImg.alt = "Avatar";
    avatarImg.classList.add("avatar-navbar");

    const userNameSpan = document.createElement("span");
    userNameSpan.textContent = currentUser.name?.split(" ")[0] || "Usuario";
    userNameSpan.classList.add("username-navbar");

    loginLink.appendChild(avatarImg);
    loginLink.appendChild(userNameSpan);
  } else {
    const loginIconNavbar = document.createElement("div");
    loginIconNavbar.className = "login-icon-navbar";
    loginIconNavbar.innerHTML = userIcon;

    loginLink.appendChild(loginIconNavbar);
  }
}
