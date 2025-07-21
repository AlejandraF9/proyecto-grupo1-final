import { renderHero } from "./views/hero.js";
import { renderCategorys } from "./views/categorys.js";

import { generatePaymentForm } from "./views/payment.js";

import { renderShop } from "./views/shop.js";

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
});
