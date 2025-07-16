export function userLogin() {
    const app = document.getElementById("app");

    const loginContainer = document.createElement("div");
    loginContainer.className = "login-container";
    loginContainer.id = "login-container";

    const loginForm = document.createElement("form");
    loginForm.className = "login-form";
    loginForm.id = "login-form";

    const loginTitle = document.createElement("h2");
    loginTitle.className = "login-title";
    loginTitle.textContent = "Iniciar sesión";

    const formInputsContainer = document.createElement("div");
    formInputsContainer.className = "inputs-container";
    formInputsContainer.id = "inputs-container";

    const loginEmail = document.createElement("label");
    loginEmail.setAttribute("for", "login-email");
    loginEmail.textContent = "Correo electrónico:";

    const inputEmail = document.createElement("input");
    inputEmail.type = "text";
    inputEmail.className = "login-input"
    inputEmail.id = "login-email"
    inputEmail.placeholder = "Indica tu correo electrónico";

    const loginPassword = document.createElement("label");
    loginPassword.setAttribute("for", "login-password");
    loginPassword.textContent = "Contraseña:";

    const inputPassword = document.createElement("input");
    inputPassword.type = "password";
    inputPassword.className = "password-input";
    inputPassword.id = "login-password";
    inputPassword.placeholder = "Indica tu contraseña";

    const loginButton = document.createElement("button");
    loginButton.type = "submit";
    loginButton.className = "login-button";
    loginButton.textContent = "Iniciar sesión";

    loginForm.addEventListener("submit", async(event) => {
        event.preventDefault();

        try {
            const loginEmailInput = inputEmail.value.trim();
            const loginPasswordInput = inputPassword.value.trim();
            
            const savedUsers = JSON.parse(localStorage.getItem("users")) || [];
            
            const currentUser = savedUsers.find(user => user.email === loginEmailInput && user.password === loginPasswordInput);
            
            if (currentUser) {
                localStorage.setItem("current-user", JSON.stringify(currentUser));
                container.innerHTML = "";

                //Cambiar ventana a home o profile

                } else {
                    alert("Invalid email or password");
                    //Incluir validaciones y toastify
                }
        } catch {
            console.error("Login request failed", error);
        }
    })

    formInputsContainer.appendChild(loginEmail);
    formInputsContainer.appendChild(inputEmail);
    formInputsContainer.appendChild(loginPassword);
    formInputsContainer.appendChild(inputPassword);
    formInputsContainer.appendChild(loginButton);

    loginForm.appendChild(loginTitle);
    loginForm.appendChild(formInputsContainer);

    loginContainer.appendChild(loginForm);

    app.innerHTML = "";
    app.appendChild(loginContainer);
}