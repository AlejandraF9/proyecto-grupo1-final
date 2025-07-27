import emailjs from "@emailjs/browser";
emailjs.init("nZaP1NAVYfbs2Z14i");
import { validacteContactform } from "../utils/validations";

export function renderContact (){

//(me guié estructuralmente por la página de contacto de Decor internacional: dos bloques. por una lado direcciones y por otro formulario. Un div contenedor engloba a esos dos div, que a su vez luego tienen otro pequeños div)
//container madre
const showContact = document.getElementById("app");
showContact.className = "contact-container"
showContact.innerHTML = "";

//title común
const contactTitle = document.createElement("h2");
contactTitle.className = "title-h2";
contactTitle.textContent = "Contacto";
showContact.appendChild(contactTitle);

//div que tengrá a los dos 
const divDivider = document.createElement("div");
divDivider.className = "div-divider";
showContact.appendChild(divDivider);
//div direcciones
const contactOneDiv = document.createElement("div");
contactOneDiv.className = "primary-div-contact";
divDivider.appendChild(contactOneDiv);

//subtítulo
const contactH3 = document.createElement("h3");
contactH3.className = "title-h3";
contactH3.textContent = "Nuestras tiendas y horarios";
contactOneDiv.appendChild(contactH3);

//div La laguna
const contactOneDivLaguna = document.createElement("div");
contactOneDivLaguna.className = "secondary-div-contact";
contactOneDiv.appendChild(contactOneDivLaguna);
//Contenido la Laguna
const titleLaguna = document.createElement("h4");
titleLaguna.className = "title-h4";
titleLaguna.textContent = "La Laguna";
contactOneDivLaguna.appendChild(titleLaguna);

const addressLaguna = document.createElement("p");
addressLaguna.className = "address-contact";
addressLaguna.innerHTML = `Avenida Bartolomé Cairasco, Nº 4 <br> 
Miércoles a Domingo: 9:30 &ndash; 19:00 <br> 
922 123 456`;
contactOneDivLaguna.appendChild(addressLaguna);

const lagunaMap = document.createElement("a");
lagunaMap.className = "link-map";
lagunaMap.textContent = "Ver mapa";
lagunaMap.href =
  "https://www.google.es/maps/place/Ayuntamiento+de+San+Crist%C3%B3bal+de+La+Laguna/@28.4872516,-16.316552,17z/data=!3m1!4b1!4m6!3m5!1s0xc41cd92f6b6282f:0x8676e823d9daf0d1!8m2!3d28.4872516!4d-16.3139771!16s%2Fg%2F1tv25d4_?entry=ttu&g_ep=EgoyMDI1MDcyMC4wIKXMDSoASAFQAw%3D%3D";
contactOneDivLaguna.appendChild(lagunaMap);

//div Tacoronte
const contactOneDivTacoronte = document.createElement("div");
contactOneDivTacoronte.className = "secondary-div-contact";
contactOneDiv.appendChild(contactOneDivTacoronte);
//Contenido Tacoronte
const titleTacoronte = document.createElement("h4");
titleTacoronte.className = "title-h4";
titleTacoronte.textContent = "Tacoronte";
contactOneDivTacoronte.appendChild(titleTacoronte);

const addressTacoronte = document.createElement("p");
addressTacoronte.className = "address-contact";
addressTacoronte.innerHTML = `C/ La madroña , Nº 25 <br> 
Miércoles a Domingo: 9:30 &ndash; 19:00 <br> 
922 789 123`;
contactOneDivTacoronte.appendChild(addressTacoronte);

const tacoronteMap = document.createElement("a");
tacoronteMap.className = "link-map";
tacoronteMap.textContent = "Ver mapa";
tacoronteMap.href =
  "https://www.google.es/maps/place/Ayuntamiento+De+Tacoronte/@28.4807883,-16.4152628,17z/data=!3m1!4b1!4m6!3m5!1s0xc41d22e2a7529b9:0x82bdc1c6ead95c47!8m2!3d28.4807883!4d-16.4126879!16s%2Fg%2F1q5bm_42n?entry=ttu&g_ep=EgoyMDI1MDcyMC4wIKXMDSoASAFQAw%3D%3D";
contactOneDivTacoronte.appendChild(tacoronteMap);

//div Santa Úrsula
const contactOneDivUrsula = document.createElement("div");
contactOneDivUrsula.className = "secondary-div-contact";
contactOneDiv.appendChild(contactOneDivUrsula);
//Contenido Santa Úrsula
const titleUrsula = document.createElement("h4");
titleUrsula.className = "title-h4";
titleUrsula.textContent = "Santa Úrsula";
contactOneDivUrsula.appendChild(titleUrsula);

const addressUrsula = document.createElement("p");
addressUrsula.className = "address-contact";
addressUrsula.innerHTML = `C/ Las Vistas , Nº 53 <br> 
Miércoles a Domingo: 9:30 &ndash; 19:00 <br> 
922 789 123`;
contactOneDivUrsula.appendChild(addressUrsula);

const ursulaMap = document.createElement("a");
ursulaMap.className = "link-map";
ursulaMap.textContent = "Ver mapa";
ursulaMap.href =
  "https://www.google.es/maps/search/Ayuntamiento+santa+%C3%BArsula/@28.4255478,-16.4944483,17z/data=!3m1!4b1?entry=ttu&g_ep=EgoyMDI1MDcyMC4wIKXMDSoASAFQAw%3D%3D";
contactOneDivUrsula.appendChild(ursulaMap);

//div Icod
const contactOneDivIcod = document.createElement("div");
contactOneDivIcod.className = "secondary-div-contact";
contactOneDiv.appendChild(contactOneDivIcod);
//Contenido Icod
const titleIcod = document.createElement("h4");
titleIcod.className = "title-h4";
titleIcod.textContent = "Icod de los Vinos";
contactOneDivIcod.appendChild(titleIcod);

const addressIcod = document.createElement("p");
addressIcod.className = "address-contact";
addressIcod.innerHTML = `C/ Las Tablas , Nº 14 <br> 
Miércoles a Domingo: 9:30 &ndash; 19:00 <br> 
922 789 123`;
contactOneDivIcod.appendChild(addressIcod);

const icodMap = document.createElement("a");
icodMap.className = "link-map";
icodMap.textContent = "Ver mapa";
icodMap.href =
  "https://www.google.es/maps/place/Ayuntamiento+de+Icod+de+los+Vinos/@28.3676579,-16.7217858,17z/data=!3m1!4b1!4m6!3m5!1s0xc6a7d5500000001:0xfab654561418de8c!8m2!3d28.3676579!4d-16.7192109!16s%2Fg%2F1wk4f9dd?entry=ttu&g_ep=EgoyMDI1MDcyMC4wIKXMDSoASAFQAw%3D%3D";
contactOneDivIcod.appendChild(icodMap);

//div 2
const contactTwoDiv = document.createElement("div");
contactTwoDiv.className = "form-info";
divDivider.appendChild(contactTwoDiv);

//div para separar la info email
const emailContactDiv = document.createElement("div");
emailContactDiv.className = "email-contact-div";
contactTwoDiv.appendChild(emailContactDiv);
//título para email
const emailContactDivH4 = document.createElement("h4");
emailContactDivH4.className = "title-h4";
emailContactDivH4.textContent = "Escríbenos a:";
emailContactDiv.appendChild(emailContactDivH4);
//texto email
const emailContactDivText = document.createElement("p");
emailContactDivText.className = "email-text";
emailContactDivText.textContent = "dummiebakery@gmail.com";
emailContactDiv.appendChild(emailContactDivText);

//título para el formulario
const contactFormH4 = document.createElement("h4");
contactFormH4.className = "contact-form-h4";
contactFormH4.textContent =
  "O si lo prefieres, rellena este formulario y nos pondremos en contacto en la mayor brevedad";
contactTwoDiv.appendChild(contactFormH4);

//form (contact-form)
const contactFormFooter = document.createElement("form");
contactFormFooter.className = "contact-form"; //todos los form tienen la misma clase para facilitar el estilado
contactTwoDiv.appendChild(contactFormFooter);
//interior del form
const contactFormFooterName = document.createElement("input");
contactFormFooterName.className = "contact-form-input";
contactFormFooterName.type = "text";
contactFormFooterName.placeholder = "Nombre";
contactFormFooterName.required = true;
contactFormFooterName.name = "nombre";
contactFormFooter.appendChild(contactFormFooterName);

const contactFormFooterEmail = document.createElement("input");
contactFormFooterEmail.className = "contact-form-input";
contactFormFooterEmail.type = "email";
contactFormFooterEmail.placeholder = "Correo electrónico";
contactFormFooterEmail.required = true;
contactFormFooterEmail.name = "email";
contactFormFooter.appendChild(contactFormFooterEmail);

const contactFormFooterPhone = document.createElement("input");
contactFormFooterPhone.className = "contact-form-input";
contactFormFooterPhone.type = "tel";
contactFormFooterPhone.placeholder = "Teléfono";
contactFormFooterPhone.required = false;
contactFormFooterPhone.name = "teléfono";
contactFormFooter.appendChild(contactFormFooterPhone);

const contactFormFooterMessage = document.createElement("textarea");
contactFormFooterMessage.className =
  "contact-form-input contact-form-footer-message";
contactFormFooterMessage.id = "contact-footer-msj";
contactFormFooterMessage.rows = 5;
contactFormFooterMessage.placeholder = "Escribe aquí tu duda o sugerencia...";
contactFormFooterMessage.required = true;
contactFormFooterMessage.name = "mensaje";
contactFormFooter.appendChild(contactFormFooterMessage);

//evento para que el text área crezca más si así lo necesita el mensaje
contactFormFooterMessage.addEventListener("input", function () {
  this.style.height = "auto"; // Reinicia la altura
  this.style.height = this.scrollHeight + "px"; // Ajusta a la altura necesaria
});

//luego en CSS hay que darle una altura máxima para que no se desmadre
//max-height: loque consideres;

//el checkbox es mejor "envolverlo en un label.
// en algunos mantengo la misma clase que en el newsletter para unificar estilos. Cambié otros por si es necesatrio otro estilo. Si van a ser los mismo estilos mejor unificarlos.

//creo el label
const contactCheckboxLabel = document.createElement("label");
contactCheckboxLabel.className = "contact-checkbox-label";
contactFormFooter.appendChild(contactCheckboxLabel);
//creo el checkbox
const checkboxContact = document.createElement("input");
checkboxContact.type = "checkbox";
checkboxContact.className = "checkbox-contact-form";
checkboxContact.required = true;
checkboxContact.name = "acepta";
contactCheckboxLabel.appendChild(checkboxContact);
//creo el enlace
const termsChedexLink = document.createElement("a");
termsChedexLink.href = "/privacy-policy";
termsChedexLink.target = "_blank";
termsChedexLink.innerHTML =
  "Marca la casilla para aceptar la políticas de privacidad";
contactCheckboxLabel.appendChild(termsChedexLink);

//botón enviar
const contactFormFooterButton = document.createElement("button");
contactFormFooterButton.type = "submit";
contactFormFooterButton.className = "contact-form-button";
contactFormFooterButton.textContent = "Enviar";
contactFormFooter.appendChild(contactFormFooterButton);

//evento
contactFormFooter.addEventListener("submit", function (event) {
  event.preventDefault();

  const nameContactFormFooter = contactFormFooterName.value.trim();
  const emailContactFormFooter = contactFormFooterEmail.value.trim();
  const phoneContactFormFooter = contactFormFooterPhone.value.trim();
  const messageContactFormFooter = contactFormFooterMessage.value.trim();
  const checkedContactFormFooter = checkboxContact.checked;

  ///me falta meter las validaciones

  if(!validacteContactform(nameContactFormFooter, emailContactFormFooter, phoneContactFormFooter, messageContactFormFooter, checkedContactFormFooter)) return;



  emailjs
    .sendForm(
      "service_v2a0nka",
      "template_tq0ffyn",
      contactFormFooter,
      "nZaP1NAVYfbs2Z14i"
    )
    .then(() => {
      alert(
        "¡Formulario enviado correctamente! Nos pondremos en contacto contigo lo antes posible."
      );
      contactFormFooter.reset();
    })
    .catch((error) => {
      console.error("Error al enviar el formulario:", error);
      alert(
        "Oops, hubo un problema enviando el formulario. Inténtalo de nuevo."
      );
    });
})
}
export default {
  init() {
    console.log("Contact init ejecutado");
    renderContact();
  },
};
