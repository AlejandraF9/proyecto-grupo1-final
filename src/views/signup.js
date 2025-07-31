import { createNewUser } from "../api/apiUsers";
import { closeModal, openModal } from "../utils/modal&overlay";
import { infoValidations } from "../utils/validations";
import { goTo } from "../router";
import { showToast } from "../utils/toastify";

export function renderSignupView() {
  const app = document.getElementById("app");
  app.innerHTML = ""; 

  // Modal
  const signupContainer = document.createElement("div");
  signupContainer.id = "signup-container";

  // Header
  const heading = document.createElement("h2");
  heading.textContent = "Registro";
  signupContainer.appendChild(heading);

  // Formulario de registro
  const form = document.createElement("form");
  form.id = "signupForm";

  // Nombre
  const labelName = document.createElement("label");
  labelName.setAttribute("for", "name");
  const inputName = document.createElement("input");
  inputName.type = "text";
  inputName.id = "name";
  inputName.required = true;
  inputName.placeholder = "Tu nombre";

  // Email
  const labelEmail = document.createElement("label");
  labelEmail.setAttribute("for", "email");
  const inputEmail = document.createElement("input");
  inputEmail.type = "email";
  inputEmail.id = "email";
  inputEmail.required = true;
  inputEmail.placeholder = "Tu correo electrónico";

  // Contraseña
  const labelPassword = document.createElement("label");
  labelPassword.setAttribute("for", "password");
  const inputPassword = document.createElement("input");
  inputPassword.type = "password";
  inputPassword.id = "password";
  inputPassword.required = true;
  inputPassword.placeholder = "Contraseña";

  // Confirmar contraseña
  const labelConfirm = document.createElement("label");
  labelConfirm.setAttribute("for", "confirmPassword");
  const inputConfirm = document.createElement("input");
  inputConfirm.type = "password";
  inputConfirm.id = "confirmPassword";
  inputConfirm.required = true;
  inputConfirm.placeholder = "Repite la contraseña";

  // Botón de envío
  const submitBtn = document.createElement("button");
  submitBtn.type = "submit";
  submitBtn.textContent = "Regístrate";

  form.appendChild(labelName);
  form.appendChild(inputName);
  form.appendChild(labelEmail);
  form.appendChild(inputEmail);
  form.appendChild(labelPassword);
  form.appendChild(inputPassword);
  form.appendChild(labelConfirm);
  form.appendChild(inputConfirm);
  form.appendChild(submitBtn);


  // Meter form y link dentro del modal
  signupContainer.appendChild(form);

  // Mostrar modal
  openModal(signupContainer);

  // Submit del formulario
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = inputName.value.trim();
    const email = inputEmail.value.trim();
    const password = inputPassword.value;
    const confirmPassword = inputConfirm.value;

    const validRegister = infoValidations({
      name,
      email,
      password,
      repeatPassword: confirmPassword,
    });

    if (!validRegister) return;

    try {
      const data = await createNewUser({ name, email, password, role: "user" });
      console.log("Usuario registrado:", data);
      showToast({text: "¡Te has registrado!", type: "success"});
      form.reset();
      closeModal();
      goTo("/login");
    } catch (error) {
      console.error("Error:", error);
      showToast({text: "Ocurrió un error en el registro", type: "error"});
    }
  });
}

export default {
  init() {
    console.log("Login init ejecutado");
    renderSignupView();
  },
};