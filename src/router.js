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
  "/orders": () => import("./views/orders.js"),
  "/shop": () => import("./views/shop.js"),
  "/legal-notice": () => import("./legal/legal-notice.js"),
  "/cookie-policy": () => import("./legal/policy-cookies.js"),
  "/sales-conditions": () => import("./legal/sales-conditions.js"),
  "/privacy-policy": () => import("./legal/privacy-policy.js"),
};

export async function loadView(path) {
  const view = routes[path];

  if (!view) {
    document.getElementById("app").innerHTML = "<h1>404 Not Found</h1>";
    console.log("Error: view not found for path:", path);
    return;
  }

  try {
    const module = await view(); 
    const viewModule = module.default || module; 

    viewModule.init?.(); 
    console.log("view loaded succesfully:", view);
  } catch (error) {
    console.error("Error loadind view:", error);
    document.getElementById("app").innerHTML = `<h1>Error loading view</h1>`; 
  }
}

export async function goTo(path) {
  
  history.pushState({}, "", path); 
  await loadView(path); 
  console.log("Navigated to:", path);
}
