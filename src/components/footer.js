
import { goTo } from "../router";

export function renderFooter(){

const footerContainer = document.getElementById("footer")
footerContainer.className="footer-container";;
//div uno

const footerDivOneLogo = document.createElement("div");
footerDivOneLogo.className ="footer-logo footer-div-all";
footerDivOneLogo.innerHTML = 
`<svg width="125" xmlns="http://www.w3.org/2000/svg" height="125" id="screenshot-1a2ad72a-1d06-8080-8006-8035f46d34a5" viewBox="473 2599 125 125" style="-webkit-print-color-adjust::exact" xmlns:xlink="http://www.w3.org/1999/xlink" fill="none" version="1.1">
  <g id="shape-1a2ad72a-1d06-8080-8006-8035f46d34a5">
    <defs>
      <pattern patternUnits="userSpaceOnUse" x="473" y="2599" width="125" height="125" id="fill-0-render-135">
        <g>
          <image id="fill-image-render-135-0" href="https://design.penpot.app/assets/by-file-media-id/89fad332-cf98-81af-8006-80442bd4d961" preserveAspectRatio="xMidYMid slice" width="125" height="125" opacity="1">
          </image>
        </g>
      </pattern>
    </defs>
    <g class="fills" id="fills-1a2ad72a-1d06-8080-8006-8035f46d34a5">
      <rect rx="0" ry="0" x="473" y="2599" transform="matrix(1.000000, 0.000000, 0.000000, 1.000000, 0.000000, 0.000000)" width="125" height="125" fill="url(#fill-0-render-135)">
      </rect>
    </g>
  </g>
</svg>
`
footerContainer.appendChild(footerDivOneLogo);

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

//facebook
const facebookLinkFooter = document.createElement("a");
facebookLinkFooter.href = "#"; 
facebookLinkFooter.rel = "noopener noreferrer";
rrssFooterDiv.appendChild(facebookLinkFooter);
const facebookFooter = document.createElement("div");
facebookFooter.className = "footer-rrss";
facebookFooter.innerHTML =`<svg width="30" xmlns="http://www.w3.org/2000/svg" height="30" id="screenshot-1a2ad72a-1d06-8080-8006-80379f5371e9" viewBox="660 2620 20 19.95" style="-webkit-print-color-adjust::exact" xmlns:xlink="http://www.w3.org/1999/xlink" fill="none" version="1.1">
  <g id="shape-1a2ad72a-1d06-8080-8006-80379f5371e9">
    <g class="fills" id="fills-1a2ad72a-1d06-8080-8006-80379f5371e9">
      <path d="M680,2630C680,2624.47998046875,675.52001953125,2620,670,2620C664.47998046875,2620,660,2624.47998046875,660,2630C660,2634.83984375,663.43994140625,2638.8701171875,668,2639.800048828125L668,2633L666,2633L666,2630L668,2630L668,2627.5C668,2625.56982421875,669.570068359375,2624,671.5,2624L674,2624L674,2627L672,2627C671.449951171875,2627,671,2627.449951171875,671,2628L671,2630L674,2630L674,2633L671,2633L671,2639.949951171875C676.050048828125,2639.449951171875,680,2635.18994140625,680,2630" style="fill:#ffffff">
      </path>
    </g>
  </g>
</svg>`
facebookFooter.alt = "logo de facebook Dummie bakery";
facebookLinkFooter.appendChild(facebookFooter);


//Instagram
const instagramLinkFooter = document.createElement("a");
instagramLinkFooter.href = "#"; 
instagramLinkFooter.rel = "noopener noreferrer";
rrssFooterDiv.appendChild(instagramLinkFooter);
const instagramFooter = document.createElement("div");
instagramFooter.className = "footer-rrss";
instagramFooter.innerHTML=
`<svg width="30" xmlns="http://www.w3.org/2000/svg" height="30" id="screenshot-1a2ad72a-1d06-8080-8006-80379f5371e2" viewBox="698 2618 24 24" style="-webkit-print-color-adjust::exact" xmlns:xlink="http://www.w3.org/1999/xlink" fill="none" version="1.1">
  <g id="shape-1a2ad72a-1d06-8080-8006-80379f5371e2" style="fill:#000000" width="24" height="24" rx="0" ry="0">
    <g id="shape-1a2ad72a-1d06-8080-8006-80379f5371e6" style="display:none">
      <g class="fills" id="fills-1a2ad72a-1d06-8080-8006-80379f5371e6">
        <rect rx="0" ry="0" x="698" y="2618" transform="matrix(1.000000, 0.000000, 0.000000, 1.000000, 0.000000, 0.000000)" width="24" height="24" fill="none" style="fill:none">
        </rect>
      </g>
    </g>
    <g id="shape-1a2ad72a-1d06-8080-8006-80379f5371e7">
      <g class="fills" id="fills-1a2ad72a-1d06-8080-8006-80379f5371e7">
        <path d="M705.800048828125,2620L714.199951171875,2620C717.4000244140625,2620,720,2622.60009765625,720,2625.800048828125L720,2634.199951171875C720,2635.73828125,719.388916015625,2637.21337890625,718.30126953125,2638.30126953125C717.2135009765625,2639.388916015625,715.73828125,2640,714.199951171875,2640L705.800048828125,2640C702.5999755859375,2640,700,2637.39990234375,700,2634.199951171875L700,2625.800048828125C700,2622.5966796875,702.5966796875,2620,705.800048828125,2620M705.5999755859375,2622C703.61181640625,2622,702,2623.61181640625,702,2625.60009765625L702,2634.39990234375C702,2636.39013671875,703.6099853515625,2638,705.5999755859375,2638L714.4000244140625,2638C715.354736328125,2638,716.2705078125,2637.62060546875,716.945556640625,2636.945556640625C717.6207275390625,2636.2705078125,718,2635.354736328125,718,2634.39990234375L718,2625.60009765625C718,2623.60986328125,716.3900146484375,2622,714.4000244140625,2622ZM715.25,2623.5C715.9404296875,2623.5,716.5,2624.0595703125,716.5,2624.75C716.5,2625.4404296875,715.9404296875,2626,715.25,2626C714.5595703125,2626,714,2625.4404296875,714,2624.75C714,2624.0595703125,714.5595703125,2623.5,715.25,2623.5M710,2625C712.761474609375,2625,715,2627.238525390625,715,2630C715,2632.761474609375,712.761474609375,2635,710,2635C707.238525390625,2635,705,2632.761474609375,705,2630C705,2627.238525390625,707.238525390625,2625,710,2625M710,2627C708.3431396484375,2627,707,2628.34326171875,707,2630C707,2631.65673828125,708.3431396484375,2633,710,2633C711.6568603515625,2633,713,2631.65673828125,713,2630C713,2628.34326171875,711.6568603515625,2627,710,2627" style="fill:#ffffff">
        </path>
      </g>
    </g>
  </g>
</svg>`
instagramFooter.alt = "logo de instagram Dummie bakery";
instagramLinkFooter.appendChild(instagramFooter);

//bluesky
const blueskyLinkFooter = document.createElement("a");
blueskyLinkFooter.href = "#"; 
blueskyLinkFooter.rel = "noopener noreferrer";
rrssFooterDiv.appendChild(blueskyLinkFooter);
const blueskyFooter = document.createElement("div");
blueskyFooter.className = "footer-rrss";
blueskyFooter.innerHTML=
`<svg width="30" xmlns="http://www.w3.org/2000/svg" height="30" id="screenshot-1a2ad72a-1d06-8080-8006-80379f5371e1" viewBox="738 2618 24 24" style="-webkit-print-color-adjust::exact" xmlns:xlink="http://www.w3.org/1999/xlink" fill="none" version="1.1">
  <g id="shape-1a2ad72a-1d06-8080-8006-80379f5371e1" style="fill:#000000" width="24" height="24" rx="0" ry="0">
    <g id="shape-1a2ad72a-1d06-8080-8006-80379f5371e4" style="display:none">
      <g class="fills" id="fills-1a2ad72a-1d06-8080-8006-80379f5371e4">
        <rect rx="0" ry="0" x="738" y="2618" transform="matrix(1.000000, 0.000000, 0.000000, 1.000000, 0.000000, 0.000000)" width="24" height="24" fill="none" style="fill:none">
        </rect>
      </g>
    </g>
    <g id="shape-1a2ad72a-1d06-8080-8006-80379f5371e5">
      <g class="fills" id="fills-1a2ad72a-1d06-8080-8006-80379f5371e5">
        <path d="M750,2629.387939453125C749.093994140625,2627.626953125,746.6279296875,2624.343994140625,744.3349609375,2622.72607421875C742.137939453125,2621.176025390625,741.301025390625,2621.44287109375,740.751953125,2621.69287109375C740.115966796875,2621.97802734375,740,2622.955078125,740,2623.52783203125C740,2624.10302734375,740.31494140625,2628.237060546875,740.52001953125,2628.927978515625C741.199951171875,2631.2080078125,743.614013671875,2631.97802734375,745.840087890625,2631.73095703125C742.580078125,2632.2138671875,739.6829833984375,2633.40087890625,743.47998046875,2637.62890625C747.657958984375,2641.9541015625,749.2060546875,2636.7021484375,750,2634.0390625C750.7939453125,2636.7021484375,751.7080078125,2641.76513671875,756.4439697265625,2637.62890625C760,2634.0390625,757.4210205078125,2632.2138671875,754.1610107421875,2631.73095703125C756.385986328125,2631.97802734375,758.801025390625,2631.2080078125,759.47998046875,2628.927978515625C759.68505859375,2628.238037109375,760,2624.10302734375,760,2623.529052734375C760,2622.9541015625,759.884033203125,2621.97900390625,759.248046875,2621.69091796875C758.698974609375,2621.44287109375,757.862060546875,2621.173828125,755.6650390625,2622.72412109375C753.3720703125,2624.344970703125,750.905029296875,2627.6279296875,750,2629.387939453125" style="fill:#ffffff">
        </path>
      </g>
    </g>
  </g>
</svg>`
blueskyFooter.alt = "logo de bluesky Dummie bakery";
blueskyLinkFooter.appendChild(blueskyFooter);


//aviso legal
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
footerDivThree.className = "footer-div-all";
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
footerDivFour.className = "footer-div-all"
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
