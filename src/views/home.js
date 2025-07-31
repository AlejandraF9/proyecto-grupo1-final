import { renderNewsletterForm } from "../newsletterform";
import { renderCategorys } from "./categorys";
import { renderHero } from "./hero";
import { renderShop } from "./shop";
import { renderBlogHome } from "./blog";

export default {
  async init() {
    const app = document.getElementById("app");

    if (!app) {
      console.error("❌ Elemento con id='app' no encontrado en el DOM.");
      return;
    }

    app.innerHTML = "";

    console.log("Home view initialized");

    const container = document.createElement("div");
    container.id = "container";
    app.appendChild(container);

    renderHero(container);
    renderCategorys(container);

    const tienda = await renderShop();

    const blogSection = document.createElement("section");
    blogSection.id = "blog-section";

    tienda.parentNode.insertBefore(blogSection, tienda.nextSibling);
    renderBlogHome(blogSection);

    //que la newsletter solo salga una vez

    setTimeout(() => {
  const alreadyShown = localStorage.getItem("newsletter-shown");

  if (!alreadyShown) {
    renderNewsletterForm();
    localStorage.setItem("newsletter-shown", "true");
  }
}, 8000);

    //setTimeout(renderNewsletterForm, 8000);

  },
};