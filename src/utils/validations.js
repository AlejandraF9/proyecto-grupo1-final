//validaciones de newsletter
export function validationName(name, inputElement){
if (name.length <=2) {
    alert ("Nombre no válido. Requiere más de 2 caracteres")
    inputElement.focus();
    return false;
}
return true;
} 

export function validationEmail (email,emailRegex,inputElement){
    if(!emailRegex.test(email)){
    alert("Por favor ingresa un correo electrónico válido.");
    inputElement.focus();
    return false;
}return true;
}

export function validationChecked(checkbox){
     if (!checkbox.checked){
      alert("Debes aceptar las condiciones de uso.");
      checkbox.focus();
      return false;
    }return true;
}

//Validaciones signup y profile

export function infoValidations({name, email, password, repeatPassword}) {
    
    const regexName = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/; //Para que no incluyan números o caracteres especiales
    if (name !== undefined) {
        if (name.length < 2 || !name || !regexName.test(name)) {
        alert("El nombre debe contener al menos dos caracteres alfabéticos.");
        //Cambiar por toastify
        return false;
        }
    }

    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (email !== undefined) {
        if (!regexEmail.test(email)) {
            alert("El correo electrónico no tiene un formato válido. Ejemplo: nombre@dominio.com");
            //Cambiar por toastify
        return false;
        }
    }

    const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;

    if (password !== undefined) {
        if (!regexPassword.test(password)) {
            alert("La contraseña debe tener entre ocho y quince caracteres, incluir una mayúscula, una minúscula, un número y un caracter especial.");
            //Cambiar por toastify
            return false;
        }

        if (!repeatPassword) {
            alert("Debes repetir la contraseña");
            //Cambiar por toastify
            return false;
        }

        if (repeatPassword !== password) {
            alert("Las contraseñas no coinciden.");
            //Cambiar por toastify
            return false;
        }
    }

    return true;
    }
    
    
    //Validaciones login
    export function loginValidations(loginEmailInput, loginPasswordInput) {
        if (!loginEmailInput) {
        alert("Por favor, introduce tu correo electrónico.");
        //Cambiar por toastify
        return false;
    }
    
    if (!loginPasswordInput) {
        alert("Por favor, introduce tu contraseña.");
        //Cambiar por toastify
        return false;
    }

    return true;
    }
