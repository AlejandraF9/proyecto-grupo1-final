//Cambiar innerHTML y nombres variables a ingles

async function productDetails() {
  const app = document.getElementById("app");
  app.innerHTML = "";

  const product = JSON.parse(localStorage.getItem("selectedProduct"));
  if (!product) {
    alert("Producto no encontrado");
    //Cambiar por toastify
    return;
  }

  const productSection = document.createElement("section");
  productSection.className = "product-section-detail";

  const productImage = document.createElement("img");
  productImage.src = product.url;
  productImage.alt = product.nombre;
  productSection.appendChild(productImage);

  const productDetailsContainer = document.createElement("div");
  productDetailsContainer.className = "product-details-container";

  const productTitle = document.createElement("h2");
  productTitle.textContent = product.nombre;
  productDetailsContainer.appendChild(productTitle);

  const productPrice = document.createElement("p");
  productPrice.textContent = `${product.precio?.toFixed(2) || "0,00"}€`;
  productDetailsContainer.appendChild(productPrice);

  const productCategory = document.createElement("p");
  productCategory.textContent = `Categoría: ${product.categoria || "No especificada"}`;
  productDetailsContainer.appendChild(productCategory);

  if (product.ingredientes) {
    const productIngredients = document.createElement("p");
    productIngredients.textContent = `Ingredientes: ${product.ingredientes}`;
    productDetailsContainer.appendChild(productIngredients);
  }

  if (product.alergenos) {
    const productAllergens = document.createElement("p");
    productAllergens.textContent = `Alérgenos: ${product.alergenos}`;
    productDetailsContainer.appendChild(productAllergens);
  }

  const quantityContainer = document.createElement("div");
  
  const quantityLabel = document.createElement("label");
  quantityLabel.setAttribute("for", "quantity");
  quantityLabel.textContent = "Cantidad:";
  quantityContainer.appendChild(quantityLabel);

  const quantitySelector = document.createElement("div");
  quantitySelector.className = "quantity-selector";

  const decreaseButton = document.createElement("button");
  decreaseButton.id = "decrease";
  decreaseButton.textContent = "-";
  quantitySelector.appendChild(decreaseButton);

  const quantitySpan = document.createElement("span"); //Span para que tenga comportamiento en línea, no en bloque
  quantitySpan.id = "quantity";
  quantitySpan.textContent = "1";
  quantitySelector.appendChild(quantitySpan);

  const increaseButton = document.createElement("button");
  increaseButton.id = "increase";
  increaseButton.textContent = "+";
  quantitySelector.appendChild(increaseButton);

  quantityContainer.appendChild(quantitySelector);
  productDetailsContainer.appendChild(quantityContainer);

  let selectedSize = null;

  if (product.categoria?.toLowerCase().trim() === "tartas") {
    const sizeContainer = document.createElement("div");
 
    const sizeText = document.createElement("p");
    sizeText.textContent = "Size:";
    sizeContainer.appendChild(sizeText);

    const sizeOptionButtons = document.createElement("div");
    sizeOptionButtons.className = "size-buttons";

    const sizesOptions = ["Pequeña", "Mediana", "Grande"];
    sizesOptions.forEach(size => {
      const sizesOptionsbutton = document.createElement("button");
      sizesOptionsbutton.dataset.size = size; //Se sabrá la opción que escogió el usuario
      sizesOptionsbutton.textContent = size;
      sizeOptionButtons.appendChild(sizesOptionsbutton);
    });
    
    sizeContainer.appendChild(sizeOptionButtons);
    productDetailsContainer.appendChild(sizeContainer);

    const sizeButtons = sizeOptionButtons.querySelectorAll("button");
    
    sizeButtons.forEach((button) => {
      button.addEventListener("click", () => {
      sizeButtons.forEach(b => b.classList.remove("selected")); // Visual
      button.classList.add("selected");
      selectedSize = button.dataset.size;
      console.log("Tamaño seleccionado:", selectedSize);
      });
    });
    }
    
    const dateContainer = document.createElement("div");
    dateContainer.className = "date-container";
    
    const dateLabel = document.createElement("label");
    dateLabel.setAttribute("for", "delivery-date");
    dateLabel.textContent = "Selecciona fecha de entrega o recogida:";
    dateContainer.appendChild(dateLabel);

    const dateInput = document.createElement("input");
    dateInput.type = "date";
    dateInput.id = "delivery-date";
    dateInput.min = ""; // Se establecerá más adelante
    dateInput.max = "";
    dateContainer.appendChild(dateInput);

    const dateErrorMessage = document.createElement("p");
    dateErrorMessage.style.display = "none";
    dateContainer.appendChild(dateErrorMessage);

    const dateInfoText = document.createElement("p");
    const infoTextSmall = document.createElement("small");
    infoTextSmall.textContent = "Disponible para recogida o entrega de lunes a viernes, de 10:00 a 17:00.";
    dateInfoText.appendChild(infoTextSmall);
    dateContainer.appendChild(dateInfoText);

    productDetailsContainer.appendChild(dateContainer);
    
    const todayDate = new Date();
    const maxDate = new Date();
    maxDate.setMonth(todayDate.getMonth() + 3);

    function formatDate(date) {
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      
      if (month < 10) {
        month = "0" + month;
      }
      
      if (day < 10) {
        day = "0" + day;
      }
      
      return year + "-" + month + "-" + day;
    }
    
    dateInput.min = formatDate(todayDate);
    dateInput.max = formatDate(maxDate);

    dateInput.addEventListener("change", () => {
  if (!dateInput.value) return;

  const selectedDateInput = new Date(dateInput.value);
  if (isNaN(selectedDateInput)) return;

  const dayDate = selectedDateInput.getDay();

  if (dayDate === 0 || dayDate === 6) {
    alert("Solo se pueden seleccionar días laborables (Lunes a Viernes)");
    dateErrorMessage.style.display = "block";
    dateInput.value = "";
  } else {
    dateErrorMessage.style.display = "none";
  }
});

  const getProductsLimit = () => {
    const productCategory = product.categoria?.toLowerCase().trim();
    return productCategory === "tartas" || productCategory === "combinados" ? 5 : 20;
  };

  const validateQuantity = (quantityToValidate) => {
    const selectedDate = dateInput.value;
    if (!selectedDate) {
      alert("Por favor, selecciona una fecha antes de elegir la cantidad del producto.");
      return false;
    }
    
    const productsByDate = JSON.parse(localStorage.getItem("productsByDate")) || {};
    const dailyProducts = productsByDate[selectedDate] || {};
    const productsQuantity = dailyProducts[product.nombre] || 0;
    const maxProductsUnits = getProductsLimit();
    
    if (productsQuantity + quantityToValidate > maxProductsUnits) {
      alert(`No se pueden agregar más unidades de este producto para el ${selectedDate}.`);
      return false;
    }
    
    return true;
  };

  const addToCartButton = document.createElement("button");
  addToCartButton.textContent = "Agregar al carrito";
  addToCartButton.className = "btn-agregar";
  productDetailsContainer.appendChild(addToCartButton);

  addToCartButton.addEventListener("click", () => {
    const quantity = parseInt(quantitySpan.textContent, 10);
    if (!validateQuantity(quantity)) return;

    const selectedDate = dateInput.value;
    const quantityByDate = JSON.parse(localStorage.getItem("productsByDate")) || {};
    const dailyQuantity = quantityByDate[selectedDate] || {};
    const productsQuantity = dailyQuantity[product.nombre] || 0;

    dailyQuantity[product.nombre] = productsQuantity + quantity;
    quantityByDate[selectedDate] = dailyQuantity;
    localStorage.setItem("productsByDate", JSON.stringify(quantityByDate));

    const cartItem = {
      ...product,
      quantity,
      date: selectedDate,
      ...(selectedSize && { size: selectedSize })
    };

    let shoppingCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    shoppingCart.push(cartItem);
    localStorage.setItem("cartItems", JSON.stringify(shoppingCart));

    goTo("/shoppingCart");
  });

  const orderInfoContainer = document.createElement("div");

  const orderInfo = document.createElement("p");
  orderInfo.textContent = "Recogida disponible en local y envío a domicilio en Tenerife.";
  orderInfoContainer.appendChild(orderInfo);

  const orderDetails = document.createElement("p");
  orderDetails.textContent = "Los gastos de envío y fecha de entrega se seleccionan en la plataforma de pago.";
  orderInfoContainer.appendChild(orderDetails);
  productDetailsContainer.appendChild(orderInfoContainer);

  productSection.appendChild(productDetailsContainer);
  app.appendChild(productSection);
  
  increaseButton.addEventListener("click", () => {
    let quantity = parseInt(quantitySpan.textContent, 10);
    quantity++;
    
    if (!validateQuantity(quantity)) return;
  
    quantitySpan.textContent = quantity;
  });
  
  decreaseButton.addEventListener("click", () => {
    let quantity = parseInt(quantitySpan.textContent, 10);
    if (quantity > 1) {
      quantity--;
      quantitySpan.textContent = quantity;
    }
  });
}

export default {
  init() {
    console.log("Product Details init executed");
    productDetails();
  }
};