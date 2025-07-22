export function renderFooter(){

const footerContainer = document.getElementById("footer");
//div uno
const footerDivOne = document.createElement ("div");
footerContainer.appendChild(footerDivOne);

const footerDivOneLink = document.createElement("a");
footerDivOne.appendChild(footerDivOneLink);

const footerDivOneLogo = document.createElement("img");
//tengoque crear la image
footerDivOne.appendChild(footerDivOneLogo);


//div dos
const footerDivTwo = document.createElement ("div");
footerContainer.appendChild(footerDivTwo);

const footerDivTwoHeader= document.createElement("h4");
footerDivTwoHeader.className = "footer-header";
footerDivTwoHeader.textContent= "REDES SOCIALES";
footerDivTwo.appendChild(footerDivTwoHeader);

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