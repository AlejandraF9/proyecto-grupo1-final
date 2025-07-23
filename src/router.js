// Declaramos el objeto de rutas, ejemplo: "/profile" es la clave(ruta del navegador), y "/views/profile.js" es el valor (la ruta interna del archivo de profile).
// “¿Por qué funciones flecha? Porque al usar funciones en lugar de importar directamente, Vite puede analizar todas las rutas en tiempo de compilación(transformación codigo
//  fuente a formato compatible con navegador), evitar warnings, optimizar los módulos y cargar las vistas solo cuando se necesitan (lazy loading).”

export const routes = {
  "/bio": () => import("./views/bio.js"),
  "/blog": () => import("./views/blog.js"),
  "/contact": () => import("./views/contact.js"),
  "/home": () => import("./views/home.js"),
  "/login": () => import("./views/login.js"),
  "/productsDetails": () => import("./views/productsDetails.js"),
  "/shoppingCart": () => import("./views/shoppingCart.js"),
  "/profile": () => import("./views/profile.js"),
  "/signup": () => import("./views/signup.js"),
  "/": () => import("./views/home.js"),
  "/admin": () => import("./views/admin.js"),
};

export async function loadView(path) {
  //Esta function carga la view si existe
  const view = routes[path];

  if (!view) {
    document.getElementById("app").innerHTML = "<h1>404 Not Found</h1>";
    console.log("Error: view not found for path:", path);
    return;
  }

  try {
    const module = await view(); // Importa el modulo de la vista
    const viewModule = module.default || module; // La vista del modulo será igual a modulo por defecto si existe o al modulo completo

    viewModule.init?.(); //usamos ? para que si no existe no lance errores ni rompa la página.
    console.log("view loaded succesfully:", view);
  } catch (error) {
    console.error("Error loadind view:", error);
    document.getElementById("app").innerHTML = `<h1>Error loading view</h1>`; //Muestra mensaje en pantalla, se puede cambiar o eliminar.
  }
}

export async function goTo(path) {
  //Esta function cambia la ruta del navegador y carga la vista que corresponde a esa ruta (redirigimos)
  history.pushState({}, "", path); //Actualiza URL sin recargar página. Tiene 3 argumentos (objeto, titulo, url). Solo necesitamos URL por eso ponemos {} vacías y "" vacías.
  await loadView(path); //Carga la vista correspondiente a la ruta.
  console.log("Navigated to:", path);
}