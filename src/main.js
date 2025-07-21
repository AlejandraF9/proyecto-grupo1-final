import { renderHero } from "./views/hero.js";
import { renderCategorys } from "./views/categorys.js";
import { generatePaymentForm } from "./api/apiPayment.js";
import { renderShop } from "./views/shop.js";
import { renderBio } from "./views/bio.js";

document.addEventListener("DOMContentLoaded", async () => {
  //const usuario = JSON.parse(localStorage.getItem("current-user"));

  //if (usuario && usuario.role === "admin") {
  //gotTo("/admin");
  //} else {
  renderHero();
  renderCategorys();
  renderShop();

  const container = document.getElementById("app");
  generatePaymentForm(container);

  //Render Bio
  const bio = renderBio();
  container.appendChild(bio);
});

