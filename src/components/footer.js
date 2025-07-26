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

const rrssFooterDivInstagram = document.createElement("img");
rrssFooterDivInstagram.className = "footer-rrss";
rrssFooterDivInstagram.src = instagramIcon;
rrssFooterDivInstagram.alt = "logo de instagram de las redes sociales de Dummie bakery";
rrssFooterDiv.appendChild(rrssFooterDivInstagram);

const rrssFooterDivBluesky = document.createElement("img");
rrssFooterDivBluesky.className = "footer-rrss";
rrssFooterDivBluesky.src = blueskyIcon;
rrssFooterDivBluesky.alt = "logo de bluesky de las redes sociales de Dummie bakery";
rrssFooterDiv.appendChild(rrssFooterDivBluesky);

const rrssFooterDivYoutube = document.createElement("img");
rrssFooterDivYoutube.className = "footer-rrss";
rrssFooterDivYoutube.src = youtubeIcon;
rrssFooterDivYoutube.alt = "logo de youtube de las redes sociales de Dummie bakery";
rrssFooterDiv.appendChild(rrssFooterDivYoutube);

const legalNoticeFooter = document.createElement("a");
legalNoticeFooter.className= "footer-text";
legalNoticeFooter.textContent = "Aviso legal";
legalNoticeFooter.href = "/legal-notice";
legalNoticeFooter.addEventListener("click", (e) => {
  e.preventDefault(); 
  goTo("/legal-notice");
});
footerDivTwo.append(legalNoticeFooter);

const cookiesFooter = document.createElement("a");
cookiesFooter.className= "footer-text";
cookiesFooter.textContent = "Política de cookies";
cookiesFooter.href = "/cookie-policy";
cookiesFooter.addEventListener("click", (e) => {
  e.preventDefault(); 
  goTo("/cookie-policy");
});
footerDivTwo.append(cookiesFooter);

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

//div cuatro
const footerDivFour = document.createElement ("div");
footerContainer.appendChild(footerDivFour);

//div cinco
const footerDivFive = document.createElement ("div");
footerContainer.appendChild(footerDivFive);
}