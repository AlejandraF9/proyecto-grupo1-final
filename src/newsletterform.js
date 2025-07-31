import { validationName } from './utils/validations';
import { validationEmail } from './utils/validations';
import { validationChecked } from './utils/validations';
import {getAllNewsletterEmails} from "./api/apiNewsletter.js";
import{createUserFromNewsletter} from "./api/apiNewsletter.js";
import { showToast } from "./utils/toastify";
import emailjs from '@emailjs/browser';
emailjs.init('nZaP1NAVYfbs2Z14i'); 




const newsl = document.getElementById("newsl");
export function renderNewsletterForm (){
   

const newsletterDiv = document.createElement("div");
newsletterDiv.className = "newsletter-div";
newsl.appendChild(newsletterDiv);

const newsletterDivHeader = document.createElement("h2");
newsletterDivHeader.className = "newsletter-div-h2";
newsletterDivHeader.textContent = "Obtén un 10% de descuento en tu 1ª compra";
newsletterDiv.appendChild(newsletterDivHeader);

const newsletterDivText = document.createElement("p");
newsletterDivText.className = "newsletter-div-text";
newsletterDivText.textContent = "Obtén un 10% de descuento en tu primera compra. Además, tendrás la exclusiva de nuestras ofertas, promociones, productos del mes y noticias sobre nuestro dulce espacio.Prometemos no bombardearte con spam. No nos gusta el spam... nos gustan los dulces."
newsletterDiv.appendChild(newsletterDivText);

const newsletterForm = document.createElement("form");
newsletterForm.className = "newsletter-form";
newsletterDiv.appendChild(newsletterForm);

const newsletterFormName = document.createElement("input");
newsletterFormName.className = "newsletter-form-input";
newsletterFormName.type = "text";
newsletterFormName.placeholder = "Nombre";
newsletterFormName.required =true;
newsletterFormName.name = "nombre";
newsletterForm.appendChild(newsletterFormName);

const newsletterFormEmail = document.createElement("input");
newsletterFormEmail.type = "email";
newsletterFormEmail.className = "newsletter-form-input";
newsletterFormEmail.placeholder = "Correo electrónico";
newsletterFormEmail.required = true;
newsletterFormEmail.name = "email";
newsletterForm.appendChild(newsletterFormEmail);


const newsletterCheckboxLabel = document.createElement("label");
newsletterCheckboxLabel.className = "newsletter-checkbox-label";
newsletterForm.appendChild(newsletterCheckboxLabel);

const checkboxNewsletter = document.createElement("input");
checkboxNewsletter.type = "checkbox";
checkboxNewsletter.className = "checkbox-newsletter";
checkboxNewsletter.required = true;
checkboxNewsletter.name = "acepta";
newsletterCheckboxLabel.appendChild(checkboxNewsletter);

const textCheckboxNewsletter = document.createElement("a"); //mejor span que p
textCheckboxNewsletter.className = "text-checkbox-newsletter"
textCheckboxNewsletter.innerHTML = "He leído y acepto los términos y condiciones";
textCheckboxNewsletter.href = "/privacy-policy";
newsletterCheckboxLabel.appendChild(textCheckboxNewsletter);

const newsletterButton = document.createElement("button");
newsletterButton.type = "submit";
newsletterButton. className = "newsletter-button";
newsletterButton.textContent = "¡Quiero suscribirme!";
newsletterForm.appendChild(newsletterButton);


newsletterForm.addEventListener('submit', async  (event)=> {
  event.preventDefault();

  

  const inputs = event.target.querySelectorAll('input');
  inputs.forEach(input => {
  });

 // validaciones de formulario
  const nameNewsletter = newsletterFormName.value.trim();
  const emailNewsletter = newsletterFormEmail.value.trim();
  const aceptNewsletter = checkboxNewsletter.checked;
  const emailRegexNewsletter = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!validationName(nameNewsletter, newsletterFormName)) return;
  if (!validationEmail(emailNewsletter, emailRegexNewsletter, newsletterFormEmail)) return;
  if (!validationChecked(checkboxNewsletter)) return;

  try {
    const allSubscribers = await getAllNewsletterEmails();
    const emailExists = allSubscribers.some(
    subscriber => subscriber.email.toLowerCase() === emailNewsletter.toLowerCase()
  );

  if (emailExists) {
    showToast({ text: "Este correo ya está suscrito", type: "error" });
    return;
  }
  
  
  await createUserFromNewsletter({ nombre: nameNewsletter, email: emailNewsletter });

    
 console.log ("voy a llamar a emailjs.send");
await emailjs.send(
  'service_g2s97a6',
  'template_xvh27rf',
  {
    nombre: nameNewsletter,
    email: emailNewsletter
  },
  'nZaP1NAVYfbs2Z14i'  
);

    showToast({ text: "¡Formulario enviado correctamente! Gracias por suscribirte.", type: "success" });
    event.target.reset();

  } catch (error) {
    console.error('Error al enviar el formulario o verificar:', error);
    showToast({ text: "Oops, hubo un problema enviando el formulario. Inténtalo de nuevo.", type: "error" });
  }
});



//evento del botón de cierre del formulario
const closeButton = document.createElement("button");
closeButton.className = "newsletter-close-button";
closeButton.innerHTML = "&times;"; 
closeButton.type = "button"; 
newsletterDiv.appendChild(closeButton);

closeButton.addEventListener("click", () => {
  newsletterDiv.remove(); 
});
}






















