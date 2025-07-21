/*import { createNewUser } from "../api/apiUsers";
import { navigate } from "../router";

<html lang="es-ES">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Sign up</title>
        <link rel= "stylesheet" href="signup.css">
    </head>
    <body>
        <div id="app"></div> //Aquí se inyecta el formulario
        <script src="signup.js"></script>
    </body>
</html>



document.addEventListener('DOMContentLoaded', () => {
    const app = document. getElementById('app');
    
    //INYECCIÓN DEL FORMULARIO - CAROLINA
    app.innerHTML = `
        <h2>Registro</h2>
        <form id="signupForm">
        <label for="name">Nombre:</label>
        <input type="text" id="name" required>
        <label for="password">Contraseña:</label>
        <input type="password" id="password" required>
        <label for="confirmPassword">Repite la contraseña:</label>
        <input type="password" id="confirmPassword" required>
        <button type="submit">Regístrate</button>
        </form>
        <p>¿Ya tienes una cuenta? <a href="login.js">Inicia sesión aquí</a></p>
    `;

    //FUNCIONALIDAD FORMULARIO
    const signupform = document.getElementById('signup-form');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const name = document.getElementById('name').value.trim();
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (password !== confirmPassword) {
            alert('Las contraseñas no coinciden');
            return;
        }

        //MOCKAPI TEMPORAL 
        const apiUrl = 'https://6874d617dd06792b9c95731e.mockapi.io/users'

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    password: password
                })
            });
            
            if (!response.ok) throw new Error('Se ha producido un error durante el registro');

            const data = await response.json();
            console.log('Usuario registrado:', data);
            alert('¡Te has registrado!');
            form.reset()
        } catch (error) {
            console.error('Error:', error);
            alert('Ocurrió un error al registrarse');
        }
    });
});*/



import { createNewUser } from "../api/apiUsers";
import { closeModal, openModal } from "../utils/modal&overlay";
import { infoValidations } from "../utils/validations";
import { goTo } from "../router";

export function renderSignupView() {
  const app = document.getElementById('app');
  app.innerHTML = ''; // Limpiar vista anterior

  // Modal
  const signupContainer = document.createElement("div");
  signupContainer.id = "signup-container";

  // Header
  const heading = document.createElement('h2');
  heading.textContent = 'Registro';
  signupContainer.appendChild(heading);

  // Formulario de registro
  const form = document.createElement('form');
  form.id = 'signupForm';

  // Campo nombre
  const labelName = document.createElement('label');
  labelName.setAttribute('for', 'name');
  const inputName = document.createElement('input');
  inputName.type = 'text';
  inputName.id = 'name';
  inputName.required = true;
  inputName.placeholder = 'Tu nombre';

  // Campo email
  const labelEmail = document.createElement('label');
  labelEmail.setAttribute('for', 'email');
  const inputEmail = document.createElement('input');
  inputEmail.type = 'email';
  inputEmail.id = 'email';
  inputEmail.required = true;
  inputEmail.placeholder = 'Tu correo electrónico';

  // Campo contraseña
  const labelPassword = document.createElement('label');
  labelPassword.setAttribute('for', 'password');
  const inputPassword = document.createElement('input');
  inputPassword.type = 'password';
  inputPassword.id = 'password';
  inputPassword.required = true;
  inputPassword.placeholder = 'Contraseña';

  // Campo confirmar contraseña
  const labelConfirm = document.createElement('label');
  labelConfirm.setAttribute('for', 'confirmPassword');
  const inputConfirm = document.createElement('input');
  inputConfirm.type = 'password';
  inputConfirm.id = 'confirmPassword';
  inputConfirm.required = true;
  inputConfirm.placeholder = 'Repite la contraseña';

  // Botón de envío
  const submitBtn = document.createElement('button');
  submitBtn.type = 'submit';
  submitBtn.textContent = 'Regístrate';

  // Agregar campos al formulario
  form.appendChild(labelName);
  form.appendChild(inputName);
  form.appendChild(labelEmail);
  form.appendChild(inputEmail);
  form.appendChild(labelPassword);
  form.appendChild(inputPassword);
  form.appendChild(labelConfirm);
  form.appendChild(inputConfirm);
  form.appendChild(submitBtn);

  // Enlace de login
//   const loginParagraph = document.createElement('p');
//   loginParagraph.innerHTML = '¿Ya tienes una cuenta? <a href="/login">Inicia sesión aquí</a>';
//   const loginLink = loginParagraph.querySelector('a');
//   loginLink.addEventListener('click', (event) => {
//     event.preventDefault();
//     goTo('/login');
//   });

  // Meter form y link dentro del modal
  signupContainer.appendChild(form);
//   signupContainer.appendChild(loginParagraph);

  // Mostrar modal
  openModal(signupContainer);

  // Evento submit del formulario
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = inputName.value.trim();
    const email = inputEmail.value.trim();
    const password = inputPassword.value;
    const confirmPassword = inputConfirm.value;

    const validRegister = infoValidations({
      name,
      email,
      password,
      repeatPassword: confirmPassword
    });

    if (!validRegister) return;

    try {
      const data = await createNewUser({ name, email, password });
      console.log('Usuario registrado:', data);
      alert('¡Te has registrado!');
      form.reset();
      closeModal();
      goTo("/login");
    } catch (error) {
      console.error('Error:', error);
      alert('Ocurrió un error en el registro');
    }
  });
}

export default {
  init() {
    console.log("Login init ejecutado");
    renderSignupView();
  }
};