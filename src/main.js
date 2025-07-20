import { userLogin } from "../src/views/login";
import { generatePaymentForm } from "./api/apiPayment";
import { renderSignupView } from './views/signup.js';
import { renderNavbar } from "./components/navbar.js";
import { renderFooter } from "./components/footer.js";

document.addEventListener('DOMContentLoaded', () => {
  userLogin();
  renderSignupView(); // Esta función debe encargarse de montar la vista de registro

  const container = document.getElementById("app");
generatePaymentForm(container);


//UI navbar y footer
  renderNavbar();
  console.log("✅ Navbar DOM insertado completamente");
  renderFooter();
});







