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

    //setTimeout(renderNewsletterForm, 2000);

    if (!localStorage.getItem("newsletterShown")) {
      setTimeout(() => {
        renderNewsletterForm();
        localStorage.setItem("newsletterShown", "true");
      }, 8000);
    }
  },
};