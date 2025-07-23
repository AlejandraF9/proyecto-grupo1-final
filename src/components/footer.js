import footerLogo from"../assets/images/dummie-blanco.webp";
import { renderBio } from "../views/bio";


export function renderFooter(){

const footerContainer = document.getElementById("footer");
//div uno
const footerDivOne = document.createElement ("div");
footerContainer.appendChild(footerDivOne);

const footerDivOneLink = document.createElement("a");
footerDivOne.appendChild(footerDivOneLink);

const footerDivOneLogo = document.createElement("img");
footerDivOneLogo.className = "footer-logo"
footerDivOneLogo.src = footerLogo;
footerDivOneLogo.alt = "logo Dummie bakery";
footerDivOne.appendChild(footerDivOneLogo);


//div dos
const footerDivTwo = document.createElement ("div");
footerContainer.appendChild(footerDivTwo);

const footerDivTwoHeader= document.createElement("h4");
footerDivTwoHeader.className = "footer-header";
footerDivTwoHeader.textContent= "DUMMIE BAKERY";
footerDivTwo.appendChild(footerDivTwoHeader);
const contactFooter = document.createElement("a");

contactFooter.className = "footer-link";


//div tres
const footerDivThree = document.createElement ("div");
footerContainer.appendChild(footerDivThree);

//div cuatro
const footerDivFour = document.createElement ("div");
footerContainer.appendChild(footerDivFour);

//div cinco
const footerDivFive = document.createElement ("div");
footerContainer.appendChild(footerDivFive);
}