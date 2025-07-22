import { renderNewsletterForm } from "../newsletterform";
import { renderCategorys } from "./categorys";
import { renderHero } from "./hero";
import { renderShop } from "./shop";
import { renderBlogHome } from "./blog";

setTimeout(renderNewsletterForm, 2000);

export default {
  async init() {
    const app = document.getElementById("app");
    app.innerHTML = "";

    console.log("Home view initialized");

    const container = document.createElement("div");
    container.id = "container";
    app.appendChild(container);

    renderHero(container);
    renderCategorys(container);

    const tienda = await renderShop(); // ✅ ya inserta en el DOM

    const blogSection = document.createElement("section");
    blogSection.id = "blog-section";

    tienda.parentNode.insertBefore(blogSection, tienda.nextSibling); // ✅ insertamos solo el blog
    renderBlogHome(blogSection);
  },
};