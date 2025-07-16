import { userLogin } from "../src/views/login";

userLogin();

import { generatePaymentForm } from "./api/apiPayment";

const container = document.getElementById("app");
generatePaymentForm(container);

import { renderSignupView } from './views/signup.js';

document.addEventListener('DOMContentLoaded', () => {
  renderSignupView(); // Esta función debe encargarse de montar la vista de registro
});