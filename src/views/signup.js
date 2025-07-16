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
import { navigate } from "../router";

document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');

    //Header
    const heading = document.createElement('h2');
    heading.textContent = 'Registro';
    app.appendChild(heading);

    //Sign up form
    const form = document.createElement('form');
    form.id = 'signupForm';

    //Name field
    const labelName = document.createElement('label');
    labelName.setAttribute('for', 'name');
    labelName.textContent = 'Nombre:';
    const inputName = document.createElement('input');
    inputName.type = 'text';
    inputName.id = 'name';
    inputName.required = true;

    //Password field
    const labelPassword = document.createElement('label');
    labelPassword.setAttribute('for', 'password');
    labelPassword.textContent = 'Contraseña:';
    const inputPassword = document.createElement('input');
    inputPassword.type = 'password';
    inputPassword.id = 'password';
    inputPassword.required = true;

    //Confirm field
    const labelConfirm = document.createElement('label');
    labelConfirm.setAttribute('for', 'confirmPassword');
    labelConfirm.textContent = 'Repite la contraseña:';
    const inputConfirm = document.createElement('input');
    inputConfirm.type = 'password';
    inputConfirm.id = 'confirmPassword';
    inputConfirm.required = true;

    //Register buttom
    const submitBtn = document.createElement('button');
    submitBtn.type = 'submit';
    submitBtn.textContent = 'Regístrate';

    //Elements fields
    form.appenChild(labelName);
    form.appendChild(inputName);
    form.appendChild(labelPassword);
    form.appendChild(inputPassword);
    form.appendChild(labelConfirm);
    form.appendChild(inputConfirm);
    form.appendChild(submitBtn);

    app.appendChild(form);

    //Log in link
    const loginParagraph = document.createElement('p');
    loginParagraph.innerHTML = '¿Ya tienes una cuenta? <a href="login.js"> Inicia sesión aquí</a>';
    app.appendChild(loginParagraph);

    //form function
    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const name = inputName.value.trim();
        const password = inputPassword.value;
        const confirmPassword = inputConfirm.value;

        if (password !== confirmPassword) {
            alert('Las contraseñas no coinciden');
            return;
        }

        const apiUrl = 'https://6874d617dd06792b9c95731e.mockapi.io/users';

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, password })
            });

            if (!response.ok) throw new Error('Se ha producido un error durante el registro');

            const data = await response.json();
            console.log('Usuario registrado:', data);
            alert('¡Te has registrado!');
            form.reset();
        } catch (error) {
            console.error('Error:', error);
            alert('Ocurrió un error en el registro');
        }
    });
});