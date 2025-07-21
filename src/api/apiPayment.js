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
  paymentAddress.className = "payment-addres";
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

  //Funcionalidad para los métodos de pago
  function changeFormInputs(paymentMethod) {
    paymentForm.querySelectorAll("input").forEach(input => input.value = ""); //Borra los input al cambiar de tarjeta a bizum
    paymentForm.innerHTML = ""; //Hace que al cambiar de tarjeta a bizum, no aparezcan inputs como número de tarjeta o CVC
    paymentForm.appendChild(orderMethodSelect);
    paymentForm.appendChild(paymentSelect);
    
    paymentForm.appendChild(paymentName);
    paymentForm.appendChild(paymentAddress); //Inputs comunes

    if (paymentMethod === "card") {
      paymentForm.appendChild(paymentCard); //Inputs específicos de tarjeta
      paymentForm.appendChild(paymentExpiryDate);
      paymentForm.appendChild(paymentCvc);
    } else if (paymentMethod === "bizum") {
      paymentForm.appendChild(paymentPhone); //Inputs específicos de bizum
    }
    paymentForm.appendChild(paymentButton);
  }
  
  paymentSelect.addEventListener("change", (event) => {
    changeFormInputs(event.target.value); //funcionalidad del select Tarjeta/Bium
  });
  
  paymentForm.addEventListener("submit", function (event) {
    event.preventDefault();
    
    //Valores de los datos introducidos por el usuario
    const userData = `
    Método: ${paymentSelect.value}
    Cliente: ${paymentName.value}
    Dirección: ${paymentAddress.value}
    ${paymentSelect.value === "card"
      ? `Tarjeta: ${paymentCard.value} Fecha: ${paymentExpiryDate.value} CVC: ${paymentCvc.value}`
      : `Teléfono: ${paymentPhone.value}`}`;

    let lastUserId = parseInt(localStorage.getItem("lastUserId")) || 0;
    let newUserId = lastUserId + 1; //El id de los usuarios empezará en 0 e irá aumentando por cada compra que se realice
    
    localStorage.setItem("lastUserId", newUserId); //Se guardan los id en localStorage
    
    async function paymentRequest() {
      try {
        const response = await fetch("https://dummyjson.com/posts/add", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: "Payment completed",
            body: userData,
            userId: newUserId
          }),
        });
        
        if (!response.ok) {
          throw new Error("Invalid response", error);
        }
        
        const paymentData = await response.json();
        alert("Pago realizado con éxito");
        //Cambiar por toastify
        console.log(paymentData);
      
      } catch (error) {
        console.error("Error at the request:", error);
      }
    }
    paymentRequest();
  })
  
  changeFormInputs("card"); //Construye el formulario por defecto en el select Tarjeta
  container.innerHTML = "";
  container.appendChild(paymentForm);
}