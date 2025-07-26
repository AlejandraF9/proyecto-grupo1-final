import footerLogo from"../assets/images/dummie-blanco.webp";
import instagramIcon from"../assets/images/instagram_dummie_bakery.png";
import blueskyIcon from "../assets/images/bluesky_dummie_bakery.png";
import youtubeIcon from "../assets/images/youtube_dummie_bakery.png";
import { goTo } from "../router";




export function renderFooter(){

const footerContainer = document.getElementById("footer")
footerContainer.className="footer-container";;
//div uno
const footerDivOne = document.createElement ("div");
footerDivOne.className = "footer-div-all";
footerContainer.appendChild(footerDivOne);

const footerDivOneLink = document.createElement("a");
footerDivOne.appendChild(footerDivOneLink);

const footerDivOneLogo = document.createElement("img");
footerDivOneLogo.className = "footer-logo"
footerDivOneLogo.src = footerLogo;
footerDivOneLogo.alt = "logo Dummie bakery";
footerDivOneLink.appendChild(footerDivOneLogo);


//div dos
const footerDivTwo = document.createElement ("div");
footerDivTwo.className = "footer-div-all";
footerContainer.appendChild(footerDivTwo);

const footerDivTwoHeader= document.createElement("h4");
footerDivTwoHeader.className = "footer-header";
footerDivTwoHeader.textContent= "REDES SOCIALES";
footerDivTwo.appendChild(footerDivTwoHeader);

const rrssFooterDiv = document.createElement("div");
rrssFooterDiv.className = "rrss-footer-div";
footerDivTwo.appendChild(rrssFooterDiv);
//Instagram
const instagramLinkFooter = document.createElement("a");
instagramLinkFooter.href = "#"; 
instagramLinkFooter.rel = "noopener noreferrer";
rrssFooterDiv.appendChild(instagramLinkFooter);
const rrssFooterDivInstagram = document.createElement("img");
rrssFooterDivInstagram.className = "footer-rrss";
rrssFooterDivInstagram.src = instagramIcon;
rrssFooterDivInstagram.alt = "logo de instagram de las redes sociales de Dummie bakery";
instagramLinkFooter.appendChild(rrssFooterDivInstagram);

//bluesky
const blueskyLinkFooter = document.createElement("a");
blueskyLinkFooter.href = "#"; 
blueskyLinkFooter.rel = "noopener noreferrer";
rrssFooterDiv.appendChild(blueskyLinkFooter);
const rrssFooterDivBluesky = document.createElement("img");
rrssFooterDivBluesky.className = "footer-rrss";
rrssFooterDivBluesky.src = blueskyIcon;
rrssFooterDivBluesky.alt = "logo de bluesky de las redes sociales de Dummie bakery";
blueskyLinkFooter.appendChild(rrssFooterDivBluesky);

//youtube
const youtubeLinkFooter = document.createElement("a");
youtubeLinkFooter.href = "#"; 
youtubeLinkFooter.rel = "noopener noreferrer";
rrssFooterDiv.appendChild(youtubeLinkFooter);
const rrssFooterDivYoutube = document.createElement("img");
rrssFooterDivYoutube.className = "footer-rrss";
rrssFooterDivYoutube.src = youtubeIcon;
rrssFooterDivYoutube.alt = "logo de youtube de las redes sociales de Dummie bakery";
youtubeLinkFooter.appendChild(rrssFooterDivYoutube);
//aciso legal
const legalNoticeFooter = document.createElement("a");
legalNoticeFooter.className= "footer-text";
legalNoticeFooter.textContent = "Aviso legal";
legalNoticeFooter.href = "/legal-notice";
legalNoticeFooter.addEventListener("click", (e) => {
  e.preventDefault(); 
  goTo("/legal-notice");
});
footerDivTwo.append(legalNoticeFooter);
//política de cookies
const cookiesFooter = document.createElement("a");
cookiesFooter.className= "footer-text";
cookiesFooter.textContent = "Política de cookies";
cookiesFooter.href = "#";
cookiesFooter.addEventListener("click", (e) => {
  e.preventDefault(); 
  goTo("/cookie-policy");
});
footerDivTwo.append(cookiesFooter);
//política de privacidad
const privacyPolicy = document.createElement("a");
privacyPolicy.className= "footer-text";
privacyPolicy.textContent = "Política de privacidad";
privacyPolicy.href = "/cookie-policy";
privacyPolicy.addEventListener("click", (e) => {
  e.preventDefault(); 
  goTo("/privacy-policy");
});
footerDivTwo.append(privacyPolicy);
//condiciones generales de venta
const salesConditionsFooter = document.createElement("a");
salesConditionsFooter.className= "footer-text";
salesConditionsFooter.textContent = "Condiciones generales de venta";
salesConditionsFooter.href = "/sales-conditions";
salesConditionsFooter.addEventListener("click", (e) => {
  e.preventDefault(); 
  console.log("Click detectado en Condiciones de venta");
  goTo("/sales-conditions").then(() => {
    console.log("Navegación a /sales-conditions completada");
  }).catch(err => {
    console.error("Error en goTo:", err);
  });
});
footerDivTwo.append(salesConditionsFooter);




//div tres
const footerDivThree = document.createElement ("div");
footerContainer.appendChild(footerDivThree);

const footerDivThreeHeader= document.createElement("h4");
footerDivThreeHeader.className = "footer-header";
footerDivThreeHeader.textContent= "DUMMIE BAKERY";
footerDivThree.appendChild(footerDivThreeHeader);

const contactFooter = document.createElement("a");
contactFooter.className = "footer-link";
contactFooter.textContent= "Contacto";
contactFooter.href = "#";
contactFooter.addEventListener("click", (e) => {
  e.preventDefault(); 
  goTo("/contact");
});
footerDivThree.append(contactFooter);

const bioFooter = document.createElement("a");
bioFooter.className = "footer-link";
bioFooter.textContent= "¿Quiénes somos?";
bioFooter.href = "#";
bioFooter.addEventListener("click", (e) => {
  e.preventDefault(); 
  goTo("/bio");
});
footerDivThree.append(bioFooter);

const allergens = document.createElement("a");
allergens.className = "footer-link";
allergens.textContent= "Alérgenos";
allergens.href = "#";
footerDivThree.append(allergens);


//div cuatro
const footerDivFour = document.createElement ("div");
footerContainer.appendChild(footerDivFour);

const footerDivFourHeader= document.createElement("h4");
footerDivFourHeader.className = "footer-header";
footerDivFourHeader.textContent= "TIENDAS";
footerDivFour.appendChild(footerDivFourHeader);

const tacoronteShop = document.createElement("a");
tacoronteShop.className = "footer-link";
tacoronteShop.textContent= "Tacoronte";
tacoronteShop.href ="https://www.google.es/maps/place/Ayuntamiento+De+Tacoronte/@28.4807883,-16.4152628,17z/data=!3m1!4b1!4m6!3m5!1s0xc41d22e2a7529b9:0x82bdc1c6ead95c47!8m2!3d28.4807883!4d-16.4126879!16s%2Fg%2F1q5bm_42n?entry=ttu&g_ep=EgoyMDI1MDcyMC4wIKXMDSoASAFQAw%3D%3D"
footerDivFour.appendChild(tacoronteShop);

const ursulaShop = document.createElement("a");
ursulaShop.className = "footer-link";
ursulaShop.textContent= "Santa Úrsula";
ursulaShop.href ="https://www.google.es/maps/search/Ayuntamiento+santa+%C3%BArsula/@28.4255478,-16.4944483,17z/data=!3m1!4b1?entry=ttu&g_ep=EgoyMDI1MDcyMC4wIKXMDSoASAFQAw%3D%3D";
footerDivFour.appendChild(ursulaShop);

const icodShop = document.createElement("a");
icodShop.className = "footer-link";
icodShop.textContent= "Icod de los Vinos";
icodShop.href ="https://www.google.es/maps/place/Ayuntamiento+de+Icod+de+los+Vinos/@28.3676579,-16.7217858,17z/data=!3m1!4b1!4m6!3m5!1s0xc6a7d5500000001:0xfab654561418de8c!8m2!3d28.3676579!4d-16.7192109!16s%2Fg%2F1wk4f9dd?entry=ttu&g_ep=EgoyMDI1MDcyMC4wIKXMDSoASAFQAw%3D%3D";
footerDivFour.appendChild(icodShop);

const lagunaShop = document.createElement("a");
lagunaShop.className = "footer-link";
lagunaShop.textContent= "La Laguna";
lagunaShop.href ="https://www.google.es/maps/place/Ayuntamiento+de+San+Crist%C3%B3bal+de+La+Laguna/@28.4872516,-16.316552,17z/data=!3m1!4b1!4m6!3m5!1s0xc41cd92f6b6282f:0x8676e823d9daf0d1!8m2!3d28.4872516!4d-16.3139771!16s%2Fg%2F1tv25d4_?entry=ttu&g_ep=EgoyMDI1MDcyMC4wIKXMDSoASAFQAw%3D%3D";
footerDivFour.appendChild(lagunaShop);

const onlineShop = document.createElement("P");
onlineShop.className = "footer-link";
onlineShop.textContent= "Tienda online";
footerDivFour.appendChild(onlineShop);



//div cinco
const footerDivFive = document.createElement ("div");
footerContainer.appendChild(footerDivFive);
const copyright = document.createElement("P");
copyright.className = "copyright-footer";
copyright.textContent= "COPYRIGHT DUMMIE BAKERY";
footerDivFive.appendChild(copyright);
}
