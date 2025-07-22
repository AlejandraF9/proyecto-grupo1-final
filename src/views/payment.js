import { sendPaymentRequest } from "../api/apiPayment";

export function generatePaymentForm(container) {
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
  paymentAddress.placeholder = "Dirección";
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
  orderHome.textContent = "Envío a domicilio";

  orderMethodSelect.appendChild(orderPlaceholder);
  orderMethodSelect.appendChild(orderStore);
  orderMethodSelect.appendChild(orderHome);

  const orderLocationSelect = document.createElement("select");
  orderLocationSelect.className = "pickup-location-select";
  orderLocationSelect.required = true;
   
  const orderLocationPlaceholder = document.createElement("option");
  orderLocationPlaceholder.disabled = true;
  orderLocationPlaceholder.selected = true;
  orderLocationPlaceholder.textContent = "Selecciona lugar de recogida";
  
  const orderOptionLaLaguna = document.createElement("option");
  orderOptionLaLaguna.value = "San Cristóbal de La Laguna";
  orderOptionLaLaguna.textContent = "San Cristóbal de La Laguna";
  
  const orderOptionTacoronte = document.createElement("option");
  orderOptionTacoronte.value = "Tacoronte";
  orderOptionTacoronte.textContent = "Tacoronte";
  
  const orderOptionSantaUrsula = document.createElement("option");
  orderOptionSantaUrsula.value = "Santa Úrsula";
  orderOptionSantaUrsula.textContent = "Santa Úrsula";
  
  const orderOptionIcod = document.createElement("option");
  orderOptionIcod.value = "Icod de los Vinos";
  orderOptionIcod.textContent = "Icod de los Vinos";
  
  orderLocationSelect.appendChild(orderLocationPlaceholder);
  orderLocationSelect.appendChild(orderOptionLaLaguna);
  orderLocationSelect.appendChild(orderOptionTacoronte);
  orderLocationSelect.appendChild(orderOptionSantaUrsula);
  orderLocationSelect.appendChild(orderOptionIcod);

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
  paymentOptionCard.className = "payment-option";
  paymentOptionCard.value = "card";
  paymentOptionCard.textContent = "Tarjeta";
  
  const paymentOptionBizum = document.createElement("option");
  paymentOptionBizum.className = "payment-bizum";
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
    
    // Crear contenedor para selects de entrega
    const deliveryGroup = document.createElement("div");
    deliveryGroup.className = "delivery-group"; // Aplica estilos CSS si quieres que estén en línea
    deliveryGroup.appendChild(orderMethodSelect);

    if (deliveryMethod === "store") {
        deliveryGroup.appendChild(orderLocationSelect);
    }

    paymentForm.appendChild(deliveryGroup); // Añade el grupo al form
    paymentForm.appendChild(paymentSelect);
    paymentForm.appendChild(paymentSelect);
  
    if (paymentMethod === "card" || paymentMethod === "bizum") {
        paymentForm.appendChild(paymentName);
    }

    if ((paymentMethod === "card" || paymentMethod === "bizum") && deliveryMethod === "home") {
        paymentForm.appendChild(paymentAddress);
    }

    if (paymentMethod === "card") {
        paymentForm.appendChild(paymentCard);
        paymentForm.appendChild(paymentExpiryDate);
        paymentForm.appendChild(paymentCvc);
    } else if (paymentMethod === "bizum") {
        paymentForm.appendChild(paymentPhone);
    }

    paymentForm.appendChild(paymentButton);
    }
  
    orderMethodSelect.addEventListener("change", renderForm);
    paymentSelect.addEventListener("change", renderForm);
    
    paymentForm.addEventListener("submit", async function (event) {
        event.preventDefault();
        if (orderMethodSelect.value === "store" && (!orderLocationSelect.value || orderLocationSelect.value === orderLocationPlaceholder.value)) {
            alert("Por favor, selecciona un lugar de recogida.");
            //Cambiar por toastify
            return;
        }

    const userData = `
    Método de pago: ${paymentSelect.value}
    Método de entrega: ${orderMethodSelect.value}
    Cliente: ${paymentName.value}
    ${orderMethodSelect.value === "home" ? `Dirección: ${paymentAddress.value}` : ""}
    ${orderMethodSelect.value === "store" ? `Lugar de recogida: ${orderLocationSelect.value}` : ""}
    ${paymentSelect.value === "card"
    ? `Tarjeta: ${paymentCard.value} Fecha: ${paymentExpiryDate.value} CVC: ${paymentCvc.value}`
    : `Teléfono: ${paymentPhone.value}`}`;

    let lastUserId = parseInt(localStorage.getItem("lastUserId")) || 0;
    let newUserId = lastUserId + 1;
    localStorage.setItem("lastUserId", newUserId);

    try {
      const paymentData = await sendPaymentRequest(userData, newUserId);
      alert("Pago realizado con éxito");
      //Cambiar por toastify
      console.log(paymentData);
    } catch (error) {
      alert("Hubo un error en el pago");
      //Cambiar por toastify
    }
  });

renderForm();
container.appendChild(paymentForm);
};