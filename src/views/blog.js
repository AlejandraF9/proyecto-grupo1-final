import { goTo } from "../router.js";

export async function renderBlogHome(container) {
  container.innerHTML = "";

  const title = document.createElement("h2");
  title.classList.add("blog-title");
  title.textContent = "Últimas del Blog";
  container.appendChild(title);

  try {
    const res = await fetch(
      "https://api-bakery-production.up.railway.app/blog"
    );
    if (!res.ok) throw new Error("No se pudo cargar el blog");
    const entradas = await res.json();
    const ultimas = entradas.slice(-3).reverse();

    ultimas.forEach((e) => {
      const resumen = e.contenido.slice(0, 100) + "...";
      const card = createCardBlog(e.imagen, e.nombre, resumen, e.fecha);
      container.appendChild(card);
    });

    const verMas = document.createElement("button");
    verMas.textContent = "Ver todas las entradas";
    verMas.classList.add("blog-button");
    verMas.onclick = () => {
      goTo("/blog");
    };
    container.appendChild(verMas);
  } catch (error) {
    container.innerHTML += "<p>Error al cargar el blog.</p>";
    console.error(error);
  }
}

export function createCardBlog(imagen, titulo, texto, fecha) {
  const cardContainer = document.createElement("div");
  cardContainer.classList.add("blog-card-container");

  const containerImg = document.createElement("div");
  containerImg.classList.add("blog-image-container");

  const imgBlog = document.createElement("img");
  imgBlog.classList.add("blog-image");
  imgBlog.src = imagen;
  imgBlog.alt = "Imagen de entrada del blog";
  containerImg.appendChild(imgBlog);

  const containerText = document.createElement("div");
  containerText.classList.add("blog-text-container");

  const titleCardBlog = document.createElement("h3");
  titleCardBlog.classList.add("blog-title-card");
  titleCardBlog.textContent = titulo;
  containerText.appendChild(titleCardBlog);

  const textBlog = document.createElement("p");
  textBlog.classList.add("blog-text");
  textBlog.textContent = texto;
  containerText.appendChild(textBlog);

  const dateBlog = document.createElement("span");
  dateBlog.textContent = fecha;

  cardContainer.appendChild(containerImg);
  cardContainer.appendChild(containerText);

  return cardContainer;
}

export async function renderBlogView(container) {
  container.innerHTML = "";

  const title = document.createElement("h2");
  title.classList.add("blog-title");
  title.textContent = "Todas las entradas del Blog";
  container.appendChild(title);

  try {
    const res = await fetch(
      "https://api-bakery-production.up.railway.app/blog"
    );
    if (!res.ok) throw new Error("No se pudo cargar el blog");
    const entradas = await res.json().then((r) => r.reverse()); // más recientes primero

    entradas.forEach((e) => {
      const card = createCardBlog(e.imagen, e.nombre, e.contenido, e.fecha);
      container.appendChild(card);
    });
  } catch (error) {
    container.innerHTML += "<p>Error al cargar las entradas del blog.</p>";
    console.error(error);
  }
}

export default {
  init() {
    const app = document.getElementById("app");
    app.innerHTML = "";

    renderBlogView(app);
  },
};
