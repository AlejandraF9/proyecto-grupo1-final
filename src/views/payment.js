import { sendPaymentRequest } from "../api/apiPayment";
import { shoppingCart } from "../views/shoppingCart";
import { closeModal } from "../utils/modal&overlay";
import { paymentValidations } from "../utils/validations";
import { showToast } from "../utils/toastify";

export function generatePaymentForm(container) {
  const paymentModalOverlay = document.createElement("div");
  paymentModalOverlay.className = "payment-modal-overlay";

  const paymentModalContainer = document.createElement("div");
  paymentModalContainer.className = "payment-modal-container";

  const paymentForm = document.createElement("form");
  paymentForm.className = "payment-form";
  paymentForm.id = "paymentForm";

  const paymentName = document.createElement("input");
  paymentName.className = "payment-name";
  paymentName.type = "text";
  paymentName.placeholder = "Nombre completo";
  paymentName.required = true;

  const paymentAddress = document.createElement("input");
  paymentAddress.className = "payment-address";
  paymentAddress.type = "text";
  paymentAddress.placeholder = "Dirección completa";
  paymentAddress.required = true;

  const orderMethodSelect = document.createElement("select");
  orderMethodSelect.className = "order-select";
  orderMethodSelect.required = true;

  const orderPlaceholder = document.createElement("option");
  orderPlaceholder.disabled = true;
  orderPlaceholder.selected = true;
  orderPlaceholder.textContent = "Selecciona método de entrega";

  const orderStore = document.createElement("option");
  orderStore.value = "store";
  orderStore.textContent = "Recogida en tienda";

  const orderHome = document.createElement("option");
  orderHome.value = "home";
  orderHome.textContent = "Envío a domicilio (3,90€ gastos de envío)";

  orderMethodSelect.appendChild(orderPlaceholder);
  orderMethodSelect.appendChild(orderStore);
  orderMethodSelect.appendChild(orderHome);

  const pickupLocationSelect = document.createElement("select");
  pickupLocationSelect.className = "pickup-location-select";
  pickupLocationSelect.required = true;

  const pickupPlaceholder = document.createElement("option");
  pickupPlaceholder.disabled = true;
  pickupPlaceholder.selected = true;
  pickupPlaceholder.textContent = "Selecciona lugar de recogida";
  pickupLocationSelect.appendChild(pickupPlaceholder);

  ["San Cristóbal de La Laguna", "Tacoronte", "Santa Úrsula", "Icod de los Vinos"].forEach((lugar) => {
    const option = document.createElement("option");
    option.value = lugar;
    option.textContent = lugar;
    pickupLocationSelect.appendChild(option);
  });

  const deliveryLocationSelect = document.createElement("select");
  deliveryLocationSelect.className = "delivery-location-select";
  deliveryLocationSelect.required = true;

  const deliveryPlaceholder = document.createElement("option");
  deliveryPlaceholder.disabled = true;
  deliveryPlaceholder.selected = true;
  deliveryPlaceholder.textContent = "Selecciona tu municipio";
  deliveryLocationSelect.appendChild(deliveryPlaceholder);

  const municipalities = ["Adeje", "Arafo", "Arico", "Arona", "Buenavista del Norte", "Candelaria", "Fasnia", "Garachico", "Granadilla de Abona", "La Guancha", "Guía de Isora", "Güímar", "Icod de los Vinos", "La Matanza", "La Orotava", "Puerto de la Cruz", "Los Realejos", "El Rosario", "San Cristóbal de La Laguna", "San Juan de la Rambla", "San Miguel de Abona", "Santa Cruz de Tenerife", "Santa Úrsula", "Santiago del Teide", "El Sauzal", "Los Silos", "Tacoronte", "El Tanque", "Tegueste", "La Victoria", "Vilaflor"];

  municipalities.forEach((municipio) => {
    const option = document.createElement("option");
    option.value = municipio;
    option.textContent = municipio;
    deliveryLocationSelect.appendChild(option);
  });

  const paymentCard = document.createElement("input");
  paymentCard.className = "payment-card-number";
  paymentCard.type = "text";
  paymentCard.placeholder = "Número de tarjeta";
  paymentCard.required = true;

  const paymentExpiryDate = document.createElement("input");
  paymentExpiryDate.className = "payment-expiry-date";
  paymentExpiryDate.type = "text";
  paymentExpiryDate.placeholder = "Fecha de caducidad";
  paymentExpiryDate.required = true;

  const paymentCvc = document.createElement("input");
  paymentCvc.className = "payment-cvc";
  paymentCvc.type = "text";
  paymentCvc.placeholder = "CVC";
  paymentCvc.required = true;

  const paymentPhone = document.createElement("input");
  paymentPhone.className = "payment-phone";
  paymentPhone.type = "tel";
  paymentPhone.placeholder = "Número de teléfono";
  paymentPhone.required = true;

  const paymentSelect = document.createElement("select");
  paymentSelect.className = "payment-select";
  paymentSelect.required = true;

  const paymentPlaceholder = document.createElement("option");
  paymentPlaceholder.disabled = true;
  paymentPlaceholder.selected = true;
  paymentPlaceholder.textContent = "Selecciona método de pago";

  const paymentOptionCard = document.createElement("option");
  paymentOptionCard.value = "card";
  paymentOptionCard.textContent = "Tarjeta";

  const paymentOptionBizum = document.createElement("option");
  paymentOptionBizum.value = "bizum";
  paymentOptionBizum.textContent = "Bizum";

  paymentSelect.appendChild(paymentPlaceholder);
  paymentSelect.appendChild(paymentOptionCard);
  paymentSelect.appendChild(paymentOptionBizum);

  const paymentButton = document.createElement("button");
  paymentButton.className = "payment-button";
  paymentButton.type = "submit";
  paymentButton.textContent = "Pagar";

  function renderForm() {
    const deliveryMethod = orderMethodSelect.value;
    const paymentMethod = paymentSelect.value;

    paymentForm.innerHTML = "";

    const shippingCosts = (deliveryMethod === "home") ? 3.90 : 0;
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    let discountCode = localStorage.getItem("discountCode");
    let baseTotal = cartItems.reduce((sum, item) => sum + item.precio * item.quantity, 0);

    if (discountCode === "DULCE10") baseTotal *= 0.9;

    const finalOrderTotal = baseTotal + shippingCosts;
    const label = deliveryMethod === "home" ? "Total con envío" : "Total";

    const totalFinalPrice = document.createElement("p");
    totalFinalPrice.className = "total-final-price";
    totalFinalPrice.textContent = `${label}: ${finalOrderTotal.toFixed(2)}€`;

    const deliveryGroup = document.createElement("div");
    deliveryGroup.className = "delivery-group";
    deliveryGroup.appendChild(orderMethodSelect);

    if (deliveryMethod === "store") {
      deliveryGroup.appendChild(pickupLocationSelect);
    } else if (deliveryMethod === "home") {
      deliveryGroup.appendChild(deliveryLocationSelect);
    }

    paymentForm.appendChild(deliveryGroup);
    paymentForm.appendChild(paymentSelect);

    if (paymentMethod === "card" || paymentMethod === "bizum") {
      paymentForm.appendChild(paymentName);

      if (deliveryMethod === "home") {
        paymentForm.appendChild(paymentAddress);
      }

      paymentForm.appendChild(paymentPhone);
    }

    if (paymentMethod === "card") {
      paymentForm.appendChild(paymentCard);
      paymentForm.appendChild(paymentExpiryDate);
      paymentForm.appendChild(paymentCvc);
    }

    paymentForm.appendChild(totalFinalPrice);
    paymentForm.appendChild(paymentButton);
  }

  orderMethodSelect.addEventListener("change", renderForm);
  paymentSelect.addEventListener("change", renderForm);

  paymentForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const deliveryMethod = orderMethodSelect.value;
    const paymentMethod = paymentSelect.value;
    const pickupValue = pickupLocationSelect.value;
    const deliveryValue = deliveryLocationSelect.value;

    if (deliveryMethod === orderPlaceholder.textContent || paymentMethod === paymentPlaceholder.textContent || (deliveryMethod === "store" && (!pickupValue || pickupValue === pickupPlaceholder.textContent)) || (deliveryMethod === "home" && (!deliveryValue || deliveryValue === deliveryPlaceholder.textContent)) || !paymentName.value.trim() || (deliveryMethod === "home" && !paymentAddress.value.trim()) || (paymentMethod === "card" && (!paymentCard.value.trim() || !paymentExpiryDate.value.trim() || !paymentCvc.value.trim())) || !paymentPhone.value.trim()) {
      showToast({text: "Por favor, completa todos los datos necesarios para realizar el pago.", type: "warning"});
      return;
    }

    if (!paymentValidations({
      name: paymentName,
      cardNumber: paymentCard,
      expiryDate: paymentExpiryDate,
      cvc: paymentCvc,
      phone: paymentPhone,
      address: paymentAddress,
      deliveryMethod,
      paymentMethod
    }))
    return;

    const userData = `
    Método de pago: ${paymentSelect.value}
    Método de entrega: ${deliveryMethod}
    Cliente: ${paymentName.value}
    ${deliveryMethod === "home" ? `Dirección: ${paymentAddress.value}, Municipio: ${deliveryValue}` : `Lugar de recogida: ${pickupValue}`}
    ${paymentSelect.value === "card"
    ? `Tarjeta: ${paymentCard.value} Fecha: ${paymentExpiryDate.value} CVC: ${paymentCvc.value}`
    : `Teléfono: ${paymentPhone.value}`}`;

    let lastUserId = parseInt(localStorage.getItem("lastUserId")) || 0;
    let newUserId = lastUserId + 1;
    localStorage.setItem("lastUserId", newUserId);

    try {
      console.log("Pago procesado");
      await sendPaymentRequest(userData, newUserId);
      showToast({text: "¡Pago realizado con éxito!", type: "success"});

      const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
      const purchasedProducts = JSON.parse(localStorage.getItem("purchasedProductsByDate")) || {};

      cartItems.forEach((item) => {
        const date = item.date;
        const sizeKey = item.size ? `${item.nombre} - ${item.size}` : item.nombre;

        if (!purchasedProducts[date]) purchasedProducts[date] = {};
        if (!purchasedProducts[date][sizeKey]) purchasedProducts[date][sizeKey] = 0;

        purchasedProducts[date][sizeKey] += item.quantity;
      });

      localStorage.setItem("purchasedProductsByDate", JSON.stringify(purchasedProducts));
      localStorage.removeItem("cartItems");
      localStorage.removeItem("productsByDate");
      localStorage.removeItem("discountCode");
      localStorage.removeItem("selectedDate");

      const cartCounter = document.querySelector(".cart-counter");
      if (cartCounter) {
        cartCounter.textContent = "";
        cartCounter.classList.remove("visible");
      }

      closeModal();
      shoppingCart();
    } catch (error) {
      showToast({text: "Hubo un error al procesar el pago. Intenta de nuevo más tarde.", type: "error"});
    }
  });

  renderForm();
  paymentModalContainer.appendChild(paymentForm);
  paymentModalOverlay.appendChild(paymentModalContainer);
  container.appendChild(paymentModalOverlay);
}