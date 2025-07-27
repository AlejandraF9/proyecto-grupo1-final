import { openModal, closeModal } from "../utils/modal&overlay.js";

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
        alert("Perfil actualizado correctamente");
        closeModal();
      }
    } catch (err) {
      console.error("Error al guardar el perfil:", err);
      alert("No se pudo actualizar tu perfil");
    }
  };

  container.appendChild(form);

  if (showLogout) {
    const logoutBtn = document.createElement("button");
    logoutBtn.textContent = "Cerrar sesión";
    logoutBtn.type = "button";
    logoutBtn.style.marginTop = "1rem";
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("current-user");
      closeModal();
      location.reload();
    });
    container.appendChild(logoutBtn);
  }

  openModal(container);
}
