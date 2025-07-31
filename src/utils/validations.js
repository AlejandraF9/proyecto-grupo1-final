import { showToast } from "../utils/toastify";

export function validationName(name, inputElement){
if (name.length <=2) {
    showToast({text: "Nombre no válido. Requiere más de 2 caracteres.", type: "error"});
    inputElement.focus();
    return false;
}
return true;
}

export function validationEmail (email,emailRegex,inputElement){
    if(!emailRegex.test(email)){
    showToast({text: "Por favor ingresa un correo electrónico válido.", type: "error"});
    inputElement.focus();
    return false;
}return true;
}

export function validationChecked(checkbox){
     if (!checkbox.checked){
      showToast({text: "Debes aceptar las condiciones de uso.", type: "warning"});
      checkbox.focus();
      return false;
    }return true;
}

export function infoValidations({name, email, password, repeatPassword}) {
    
    const regexName = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,}$/;
    if (name !== undefined) {
        if (name.length < 2 || !name || !regexName.test(name)) {
        showToast({text: "El nombre debe contener al menos dos caracteres, solo alfabéticos.", type: "error"});
        return false;
        }
    }

    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (email !== undefined) {
        if (!regexEmail.test(email)) {
            showToast({text: "El correo electrónico no tiene un formato válido. Ejemplo: nombre@dominio.com", type: "error"});
        return false;
        }
    }

    const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;

    if (password !== undefined) {
        if (!regexPassword.test(password)) {
            showToast({text: "La contraseña debe tener entre 8 y 15 caracteres, incluir una mayúscula, una minúscula, un número y un caracter especial.", type: "error"});
            return false;
        }

        if (!repeatPassword) {
            showToast({text: "Debes repetir la contraseña.", type: "error"});
            return false;
        }

        if (repeatPassword !== password) {
            showToast({text: "Las contraseñas no coinciden.", type: "error"});
            return false;
        }
    }

    return true;
}
    
export function loginValidations(loginEmailInput, loginPasswordInput) {
    if (!loginEmailInput) {
        showToast({text: "Por favor, introduce tu correo electrónico.", type: "error"});
        return false;
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(loginEmailInput.trim())) {
        showToast({text: "Introduce un correo electrónico válido.", type: "error"});
        return false;
    }

    if (!loginPasswordInput) {
        showToast({text: "Por favor, introduce tu contraseña.", type: "error"});
        return false;
    }

    return true;
}

export function validacteContactform(nameContactFormFooter, emailContactFormFooter, phoneContactFormFooter, messageContactFormFooter, checkedContactFormFooter){

    let formOK = true;
    if (!/^[a-zA-Z\s]+$/.test(nameContactFormFooter) || nameContactFormFooter === "") {
        showToast({text: "Por favor, introduce un nombre válido (solo letras y espacios).", type: "error"});
        formOK = false
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(emailContactFormFooter)) {
        showToast({text: "Por favor, introduce un correo electrónico con formato correcto.", type: "error"});
        formOK = false;
    }

    if (phoneContactFormFooter && phoneContactFormFooter !== "") {
        const phoneRegex = /^[0-9]{9}$/;
        if (!phoneRegex.test(phoneContactFormFooter)) {
            showToast({text: "Por favor, introduce un número de teléfono válido (9 dígitos).", type: "error"});
            formOK = false;
        }
    }

    if (messageContactFormFooter === "" || messageContactFormFooter.length < 10) {
        showToast({text: "Por favor, escribe un mensaje con al menos 10 caracteres.", type: "error"});
        formOK = false;
    }

    if (!checkedContactFormFooter) {
        showToast({text: "Debes aceptar la política de privacidad.", type: "warning"});
        formOK = false;
    }
    return formOK;
}

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
        showToast({text: "El nombre debe contener al menos dos caracteres, solo alfabéticos.", type: "error"});
        return false;
    }

    if (deliveryMethod === "home") {
        if (!address.value.trim() || address.value.length < 5) {
        showToast({text: "La dirección debe tener al menos 5 caracteres.", type: "error"});
        return false;
        }
    }

    if (phone.value.trim()) {
        const phoneValue = phone.value.trim();

        if (!/^\d+$/.test(phoneValue)) {
            showToast({text: "El número de teléfono solo puede contener dígitos.", type: "error"});
            return false;
        }

        if (phoneValue.length !== 9) {
            showToast({text: "El número de teléfono debe tener 9 dígitos.", type: "error"});
            return false;
        }

        if (!/^[67]/.test(phoneValue)) {
            showToast({text: "El número de teléfono debe comenzar por 6 o 7.", type: "error"});
            return false;
        }
    }

    if (paymentMethod === "card") {
        const regexCard = /^[0-9]{16}$/;
        const regexExpiry = /^(0[1-9]|1[0-2])\/\d{2}$/;
        const regexCVC = /^[0-9]{3}$/;

        if (!regexCard.test(cardNumber.value.trim())) {
            showToast({text: "El número de tarjeta debe tener 16 dígitos numéricos.", type: "error"});
            return false;
        }
        if (!regexExpiry.test(expiryDate.value.trim())) {
            showToast({text: "La fecha de caducidad debe tener el formato MM/AA.", type: "error"});
            return false;
        }
        if (!regexCVC.test(cvc.value.trim())) {
            showToast({text: "El CVC debe tener 3 dígitos numéricos.", type: "error"});
            return false;
        }
    }
    
    return true;
}