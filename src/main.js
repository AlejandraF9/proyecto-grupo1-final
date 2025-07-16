import { userLogin } from "../src/views/login";

userLogin();

import { generatePaymentForm } from "./api/apiPayment";

const container = document.getElementById("app");
generatePaymentForm(container);