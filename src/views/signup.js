import { createNewUser } from "../api/apiUsers";
import { navigate } from "../router";
/*<html lang="es-ES">
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
</html>*/



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
});