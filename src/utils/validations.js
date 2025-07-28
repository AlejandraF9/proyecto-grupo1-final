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
    
    const regexName = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,}$/;
    if (name !== undefined) {
        if (name.length < 2 || !name || !regexName.test(name)) {
        alert("El nombre debe contener al menos dos caracteres, solo alfabéticos.");
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

    
//validación del formulario de contacto
export function validacteContactform(nameContactFormFooter, emailContactFormFooter, phoneContactFormFooter, messageContactFormFooter, checkedContactFormFooter){

    let formOK = true;
    if (!/^[a-zA-Z\s]+$/.test(nameContactFormFooter) || nameContactFormFooter === "") {
        alert("Por favor, introduce un nombre válido (solo letras y espacios).");
        //Cambiar por toastify
        formOK = false
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(emailContactFormFooter)) {
        alert("Por favor, introduce un correo electrónico con formato correcto.");
        //Cambiar por toastify
        formOK = false;
    }

    if (phoneContactFormFooter && phoneContactFormFooter !== "") {
        const phoneRegex = /^[0-9]{9}$/; // Validamos que sea un número de 9 dígitos
        if (!phoneRegex.test(phoneContactFormFooter)) {
            alert("Por favor, introduce un número de teléfono válido (9 dígitos).");
            //Cambiar por toastify
            formOK = false;
        }
    }

    if (messageContactFormFooter === "" || messageContactFormFooter.length < 10) {
        alert("Por favor, escribe un mensaje con al menos 10 caracteres.");
        //Cambiar por toastify
        formOK = false;
    }

    if (!checkedContactFormFooter) {
        alert("Debes aceptar la política de privacidad");
        //Cambiar por toastify
        formOK = false;
    }
    return formOK;
}


//Validaciones pasarela de pago

export function paymentValidations({
  name,
  cardNumber,
  expiryDate,
  cvc,
  phone,
  address,
  deliveryMethod,
  paymentMethod
}) {
    
    const regexName = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,}$/;
    if (!regexName.test(name.value.trim())) {
        alert("El nombre debe contener al menos dos caracteres, solo alfabéticos.");
        //Cambiar por toastify
        return false;
    }

    if (deliveryMethod === "home") {
        if (!address.value.trim() || address.value.length < 5) {
        alert("La dirección debe tener al menos 5 caracteres.");
        //Cambiar por toastify
        return false;
        }
    }

    if (paymentMethod === "card") {
        const regexCard = /^[0-9]{16}$/;
        const regexExpiry = /^(0[1-9]|1[0-2])\/\d{2}$/;
        const regexCVC = /^[0-9]{3}$/;

        if (!regexCard.test(cardNumber.value.trim())) {
            alert("El número de tarjeta debe tener 16 dígitos numéricos.");
            //Cambiar por toastify
            return false;
        }
        if (!regexExpiry.test(expiryDate.value.trim())) {
            alert("La fecha de caducidad debe tener el formato MM/AA.");
            //Cambiar por toastify
            return false;
        }
        if (!regexCVC.test(cvc.value.trim())) {
            alert("El CVC debe tener 3 dígitos numéricos.");
            //Cambiar por toastify
            return false;
        }
    }

    if (phone.value.trim()) {
        const phoneValue = phone.value.trim();

        if (!/^\d+$/.test(phoneValue)) {
            alert("El número de teléfono solo puede contener dígitos.");
            //Cambiar por toastify
            return false;
        }

        if (phoneValue.length !== 9) {
            alert("El número de teléfono debe tener 9 dígitos.");
            //Cambiar por toastify
            return false;
        }

        if (!/^[67]/.test(phoneValue)) {
            alert("El número de teléfono debe comenzar por 6 o 7.");
            //Cambiar por toastify
            return false;
        }
    }
    return true;
}