import { showToast } from "../utils/toastify";

export async function productDetails() {
  const app = document.getElementById("app");
  app.innerHTML = "";

  const product = JSON.parse(localStorage.getItem("selectedProduct"));
  const basePrice = product.precio;

  if (!product) {
    showToast({ text: "Producto no encontrado.", type: "error" });
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
  productPrice.className = "product-price";
  const formatPrice = (price) => `${price.toFixed(2)}€`;
  productPrice.textContent = formatPrice(basePrice);
  productDetailsContainer.appendChild(productPrice);

  const productCategory = document.createElement("p");
  productCategory.textContent = `Categoría: ${
    product.categoria || "No especificada"
  }`;
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

  const quantitySpan = document.createElement("span");
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
    sizeText.textContent = "Tamaño:";
    sizeContainer.appendChild(sizeText);

    const sizeOptionButtons = document.createElement("div");
    sizeOptionButtons.className = "size-buttons";

    const sizesOptions = ["Pequeña", "Mediana", "Grande"];
    sizesOptions.forEach((size) => {
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
        const alreadySelected = button.classList.contains("selected");

        sizeButtons.forEach((b) => b.classList.remove("selected"));

        if (alreadySelected) {
          selectedSize = null;
          productPrice.textContent = formatPrice(basePrice);
          quantitySpan.textContent = "1";
        } else {
          button.classList.add("selected");
          selectedSize = button.dataset.size;
          quantitySpan.textContent = "1";
          switch (selectedSize) {
            case "Pequeña":
              productPrice.textContent = formatPrice(basePrice);
              break;
            case "Mediana":
              productPrice.textContent = formatPrice(34);
              break;
            case "Grande":
              productPrice.textContent = formatPrice(40);
              break;
          }
        }
      });
    });
  }

  const dateContainer = document.createElement("div");
  dateContainer.className = "date-container";

  const dateLabel = document.createElement("label");
  dateLabel.setAttribute("for", "delivery-date");
  dateLabel.textContent = "Selecciona fecha de entrega o recogida:";
  dateContainer.appendChild(dateLabel);

  const orderInfo = document.createElement("small");
  orderInfo.textContent =
    "Recogida en local y envíos a domicilio disponibles en Tenerife, de lunes a viernes, en horario de 10:00 a 17:00.";
  dateContainer.appendChild(orderInfo);

  const dateInput = document.createElement("input");
  dateInput.type = "date";
  dateInput.id = "delivery-date";
  dateInput.min = "";
  dateInput.max = "";
  dateContainer.appendChild(dateInput);

  const dateErrorMessage = document.createElement("p");
  dateErrorMessage.style.display = "none";
  dateContainer.appendChild(dateErrorMessage);

  productDetailsContainer.appendChild(dateContainer);

  const nowDateTime = new Date();
  const todayDate = new Date();

  const currentHours = nowDateTime.getHours();
  const currentMinutes = nowDateTime.getMinutes();

  if (currentHours > 16 || (currentHours === 16 && currentMinutes >= 30)) {
    todayDate.setDate(todayDate.getDate() + 1);
  }

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
      showToast({
        text: "Solo se pueden seleccionar días laborables (lunes a viernes).",
        type: "info",
      });
      dateErrorMessage.style.display = "block";
      dateInput.value = "";
    } else {
      dateErrorMessage.style.display = "none";
    }
  });

  const getProductsLimit = (categoria, size = "") => {
    const cat = categoria?.toLowerCase().trim();
    return cat === "tartas" || cat === "combinados" ? 5 : 20;
  };

  const validateQuantity = (quantityToValidate) => {
    const selectedDate = dateInput.value;
    const sizeKey = selectedSize
      ? `${product.nombre} - ${selectedSize}`
      : product.nombre;
    const productsByDate =
      JSON.parse(localStorage.getItem("productsByDate")) || {};
    const dailyProducts = productsByDate[selectedDate] || {};
    const cartCount = dailyProducts[sizeKey] || 0;

    const purchasedProducts =
      JSON.parse(localStorage.getItem("purchasedProductsByDate")) || {};
    const alreadyPurchased = purchasedProducts[selectedDate]?.[sizeKey] || 0;

    const maxProductsUnits = getProductsLimit(product.categoria, selectedSize);
    const currentTotal = cartCount + alreadyPurchased;

    if (currentTotal >= maxProductsUnits) {
      showToast({
        text: `No quedan unidades disponibles de este producto${
          selectedSize ? ` (${selectedSize})` : ""
        } para el ${selectedDate}.`,
        type: "error",
      });
      return false;
    }

    if (currentTotal + quantityToValidate > maxProductsUnits) {
      const availableUnits = maxProductsUnits - currentTotal;
      const unitOrUnits = availableUnits === 1 ? "unidad" : "unidades";
      showToast({
        text: `Quedan ${availableUnits} ${unitOrUnits} disponibles para este producto${
          selectedSize ? ` (${selectedSize})` : ""
        } en la fecha seleccionada (${selectedDate}).`,
        type: "info",
      });
      return false;
    }
    return true;
  };

  const addToCartButton = document.createElement("button");
  addToCartButton.textContent = "Agregar al carrito";
  addToCartButton.className = "btn-agregar";
  productDetailsContainer.appendChild(addToCartButton);

  addToCartButton.addEventListener("click", () => {
    const selectedDate = dateInput.value;
    const quantity = parseInt(quantitySpan.textContent, 10);

    if (
      !selectedDate &&
      product.categoria?.toLowerCase().trim() === "tartas" &&
      !selectedSize
    ) {
      showToast({
        text: "Selecciona los detalles del producto antes de agregarlo al carrito.",
        type: "warning",
      });
      return;
    }

    if (!selectedDate) {
      showToast({
        text: "Selecciona una fecha válida antes de continuar.",
        type: "warning",
      });
      return;
    }

    if (product.categoria?.toLowerCase().trim() === "tartas" && !selectedSize) {
      showToast({
        text: "Selecciona un tamaño antes de agregar el producto al carrito.",
        type: "warning",
      });
      return;
    }

    if (!validateQuantity(quantity)) return;

    localStorage.setItem("selectedDate", selectedDate);

    const quantityByDate =
      JSON.parse(localStorage.getItem("productsByDate")) || {};
    const dailyQuantity = quantityByDate[selectedDate] || {};

    const sizeKey = selectedSize
      ? `${product.nombre} - ${selectedSize}`
      : product.nombre;
    const productsQuantity = dailyQuantity[sizeKey] || 0;

    dailyQuantity[sizeKey] = productsQuantity + quantity;
    quantityByDate[selectedDate] = dailyQuantity;
    localStorage.setItem("productsByDate", JSON.stringify(quantityByDate));

    let shoppingCart = JSON.parse(localStorage.getItem("cartItems")) || [];

    const existingIndex = shoppingCart.findIndex(item => item.nombre === product.nombre && item.date === selectedDate && ((item.size || null) === (selectedSize || null)));

    if (existingIndex !== -1) {
      shoppingCart[existingIndex].quantity += quantity;
    } else {
      let finalPrice = basePrice;

      if (
        product.categoria?.toLowerCase().trim() === "tartas" &&
        selectedSize
      ) {
        switch (selectedSize) {
          case "Pequeña":
            finalPrice = product.precio;
            break;
          case "Mediana":
            finalPrice = 34;
            break;
          case "Grande":
            finalPrice = 40;
            break;
        }
      }

      const cartItem = {
        ...product,
        precio: finalPrice,
        quantity,
        date: selectedDate,
        ...(selectedSize && { size: selectedSize }),
      };
      shoppingCart.push(cartItem);
    }

    localStorage.setItem("cartItems", JSON.stringify(shoppingCart));

    const cartCounter = document.querySelector(".cart-counter");
    const cartProductCounter = shoppingCart.reduce((acc, item) => acc + item.quantity, 0);

    if (cartCounter) {
      if (cartProductCounter > 0) {
        cartCounter.textContent = cartProductCounter;
        cartCounter.style.display = "inline-block";
      } else {
        cartCounter.style.display = "none";
      }
    }
    showToast({
      text: "¡Producto añadido correctamente al carrito!",
      type: "success",
    });
    quantitySpan.textContent = "1";
  });

  const orderInfoContainer = document.createElement("div");

  const oderTimeLimit = document.createElement("p");
  oderTimeLimit.textContent =
    "*Para garantizar una correcta gestión, los pedidos que se deseen recibir o recoger el mismo día deberán realizarse en nuestra web antes de las 16:30.";
  orderInfoContainer.appendChild(oderTimeLimit);

  const orderDetails = document.createElement("p");
  orderDetails.textContent =
    "*Los gastos de envío se seleccionan en la plataforma de pago.";
  orderInfoContainer.appendChild(orderDetails);
  productDetailsContainer.appendChild(orderInfoContainer);

  productSection.appendChild(productDetailsContainer);
  app.appendChild(productSection);

  increaseButton.addEventListener("click", () => {
    let quantity = parseInt(quantitySpan.textContent, 10);

    if (!dateInput.value) {
      showToast({
        text: "Selecciona una fecha antes de elegir la cantidad del producto.",
        type: "warning",
      });
      return;
    }

    if (product.categoria?.toLowerCase().trim() === "tartas" && !selectedSize) {
      showToast({
        text: "Selecciona un tamaño antes de elegir la cantidad.",
        type: "warning",
      });
      return;
    }

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
  },
};