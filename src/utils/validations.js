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

