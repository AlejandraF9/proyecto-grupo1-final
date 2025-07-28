import { openModal } from "../utils/modal&overlay";
import { generatePaymentForm } from "../views/payment";

export function shoppingCart() {
  const app = document.getElementById("app");
  app.innerHTML = "";

  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const productsByDate = JSON.parse(localStorage.getItem("productsByDate")) || {};

  const cartSection = document.createElement("section");
  cartSection.className = "cart-section";

  const cartTitle = document.createElement("h2");
  cartTitle.className = "cart-title";
  cartTitle.textContent = "Tu selección dulce";
  cartSection.appendChild(cartTitle);
  
  const clearCartButton = document.createElement("button");
  clearCartButton.className = "clear-cart-button";
  clearCartButton.innerHTML = `<span>Vaciar carrito</span>
  <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-trash"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>`;

  clearCartButton.addEventListener("click", () => {
    if (cartItems.length === 0) return;

    const confirmClear = confirm("¿Estás seguro de que quieres eliminar todos los productos?");
    if (!confirmClear) return;

    localStorage.removeItem("cartItems");
    localStorage.removeItem("productsByDate");
    localStorage.removeItem("discountCode");

    const cartCounter = document.querySelector(".cart-counter");
    if (cartCounter) {
        cartCounter.classList.remove("visible");
        cartCounter.textContent = "";
    }
    
    alert("Tu carrito se ha quedado vacío.");
    //Cambiar por toastify
    shoppingCart();
  });

  cartSection.appendChild(clearCartButton);

  const cartList = document.createElement("div");
  cartList.className = "cart-list";

  let total = 0;

  if (cartItems.length === 0) {
    const emptyCart = document.createElement("p");
    emptyCart.className = "empty-cart";
    emptyCart.textContent = "Tu carrito está vacío.";
    localStorage.removeItem("discountCode");
    cartSection.appendChild(emptyCart);
  }

  cartItems.forEach((item, index) => {
  const itemCard = document.createElement("div");
  itemCard.className = "item-card";

  const imgCard = document.createElement("img");
  imgCard.className = "image-card";
  imgCard.src = item.url;
  imgCard.alt = item.nombre;

  const itemDetails = document.createElement("div");
  itemDetails.className = "item-details";

  const nameCard = document.createElement("p");
  nameCard.className = "name-card";
  nameCard.textContent = item.nombre;

  const priceCard = document.createElement("p");
  priceCard.className = "price-card";
  priceCard.textContent = `${item.precio.toFixed(2)}€`;

  const quantityContainer = document.createElement("div");
  quantityContainer.className = "quantity-container";

  const decreaseButtonCard = document.createElement("button");
  decreaseButtonCard.className = "decrease-button-card";
  decreaseButtonCard.textContent = "-";

  const quantitySpanCard = document.createElement("span");
  quantitySpanCard.className = "quantity-span-card";
  quantitySpanCard.textContent = item.quantity;

  const increaseButtonCard = document.createElement("button");
  increaseButtonCard.className = "increase-button-card";
  increaseButtonCard.textContent = "+";

  const getProductsLimit = (categoria) => {
    const cat = categoria?.toLowerCase().trim();
    return (cat === "tartas" || cat === "combinados") ? 5 : 20;
  };

  const sizeKey = item.size ? `${item.nombre} - ${item.size}` : item.nombre;
  const purchasedProducts = JSON.parse(localStorage.getItem("purchasedProductsByDate")) || {};
  const purchased = purchasedProducts[item.date]?.[sizeKey] || 0;
  const limit = getProductsLimit(item.categoria);
  const isFullyPaid = purchased >= limit;

  if (isFullyPaid) {
    increaseButtonCard.disabled = true;
    decreaseButtonCard.disabled = true;
    increaseButtonCard.classList.add("disabled");
    decreaseButtonCard.classList.add("disabled");

    const notice = document.createElement("p");
    notice.className = "reserved-notice";
    notice.textContent = "Este producto ya ha sido reservado por completo para ese día.";
    itemDetails.appendChild(notice);
  }

  increaseButtonCard.addEventListener("click", () => {
    const increaseDate = item.date;
    const limit = getProductsLimit(item.categoria);
    const dailyProducts = productsByDate[increaseDate] || {};
    const alreadyPurchased = purchasedProducts[increaseDate]?.[sizeKey] || 0;
    const currentInCart = cartItems.filter(i => i.date === increaseDate && (i.size ? `${i.nombre} - ${i.size}` : i.nombre) === sizeKey).reduce((sum, i) => sum + i.quantity, 0);

    const availableUnits = limit - alreadyPurchased - currentInCart;
  
    if (availableUnits <= 0) {
        alert(`No quedan más unidades disponibles de este producto${item.size ? ` (${item.size})` : ""} para el ${increaseDate}.`);
        //Cambiar por toastify
        return;
    }

    item.quantity++;
    quantitySpanCard.textContent = item.quantity;

    const currentTotal = dailyProducts[sizeKey] || 0;
    dailyProducts[sizeKey] = currentTotal + 1;
    productsByDate[increaseDate] = dailyProducts;

    updateCart(index, item, productsByDate);
  });

  decreaseButtonCard.addEventListener("click", () => {
    const decreaseDate = item.date;

    if (item.quantity > 1) {
      item.quantity--;

      const dailyProducts = productsByDate[decreaseDate] || {};
      const currentTotal = dailyProducts[sizeKey] || 0;
      dailyProducts[sizeKey] = Math.max(0, currentTotal - 1);
      productsByDate[decreaseDate] = dailyProducts;

      updateCart(index, item, productsByDate);
    }
  });

  quantityContainer.appendChild(decreaseButtonCard);
  quantityContainer.appendChild(quantitySpanCard);
  quantityContainer.appendChild(increaseButtonCard);

  const productRemoveButton = document.createElement("button");
  productRemoveButton.className = "remove-button";
  productRemoveButton.textContent = "✖";

  productRemoveButton.addEventListener("click", () => {
    const confirmDelete = confirm(`¿Estás seguro de que quieres eliminar \"${item.nombre}\" del carrito?`);
    if (!confirmDelete) return;

    cartItems.splice(index, 1);

    if (productsByDate[item.date]) {
      delete productsByDate[item.date][sizeKey];
    }

    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    localStorage.setItem("productsByDate", JSON.stringify(productsByDate));

    const cartCounter = document.querySelector(".cart-counter");
    const updatedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const newCount = updatedCartItems.length;

    if (cartCounter) {
      if (newCount > 0) {
        cartCounter.textContent = newCount;
        cartCounter.classList.add("visible");
      } else {
        cartCounter.textContent = "";
        cartCounter.classList.remove("visible");
      }
    }

    alert(`\"${item.nombre}\" ha sido eliminado del carrito.`);
    shoppingCart();
  });

  itemCard.appendChild(imgCard);
  itemCard.appendChild(itemDetails);
  itemDetails.appendChild(nameCard);
  itemDetails.appendChild(priceCard);

  const deliveryDate = document.createElement("p");
  deliveryDate.className = "delivery-date";
  deliveryDate.textContent = `Fecha seleccionada: ${item.date}`;
  itemDetails.appendChild(deliveryDate);

  if (purchased > 0) {
    const purchasedInfo = document.createElement("p");
    purchasedInfo.className = "purchased-info";
    purchasedInfo.textContent = `Unidades ya reservadas para ese día: ${purchased}`;
    itemDetails.appendChild(purchasedInfo);
  }

  if (item.size) {
    const size = document.createElement("p");
    size.className = "cart-item-size";
    size.textContent = `Tamaño: ${item.size}`;
    itemDetails.appendChild(size);
  }

  itemDetails.appendChild(quantityContainer);
  itemCard.appendChild(productRemoveButton);
  cartList.appendChild(itemCard);

  total += item.precio * item.quantity;
  });
  
  cartSection.appendChild(cartList);

  let discountValue = 0;
  const savedCode = localStorage.getItem("discountCode") || "";
  if (cartItems.length > 0 && savedCode === "DULCE10") {
    discountValue = total * 0.10;
  }

  const discountContainer = document.createElement("div");
  discountContainer.className = "discount-container";

  const discountInput = document.createElement("input");
  discountInput.className = "discount-input";
  discountInput.type = "text";
  discountInput.placeholder = "Código de descuento";
  discountInput.value = "";

  const applyDiscountButton = document.createElement("button");
  applyDiscountButton.className = "apply-discount-button";
  applyDiscountButton.textContent = "Aplicar";

  applyDiscountButton.addEventListener("click", () => {
    const code = discountInput.value.trim().toUpperCase();
    const existingDiscount = localStorage.getItem("discountCode");
        
    if (cartItems.length === 0) {
        alert("Debes tener productos en el carrito para aplicar un código de descuento.");
        //Cambiar por toastify
        discountInput.value = "";
        return;
    }

    if (code !== "DULCE10" && !existingDiscount) {
        alert("Código no válido.");
        //Cambiar por toastify
    } else if (code === "DULCE10" && existingDiscount !== "DULCE10") {
        const today = new Date().toISOString().split("T")[0];
        const usedDate = localStorage.getItem("discountUsedDate");

        if (usedDate === today) {
            alert("Ya has utilizado este descuento hoy. Solo puede usarse una vez por día.");
            //Cambiar por toastify
            return;
        }
        
        localStorage.setItem("discountCode", code);
        localStorage.setItem("discountUsedDate", today);
        alert("¡Descuento aplicado correctamente!");
        //Cambiar por toastify
        shoppingCart();
    } else {
      alert("Ya has aplicado un código de descuento. No puedes introducir otro.");
      //Cambiar por toastify
    }
    discountInput.value = "";
  });
    
  discountContainer.appendChild(discountInput);
  discountContainer.appendChild(applyDiscountButton);
  cartSection.appendChild(discountContainer);
    
  const totalPrice = document.createElement("p");
  totalPrice.className = "total-price";
  totalPrice.textContent = `Total: ${(total - discountValue).toFixed(2)}€`;

  if (cartItems.length > 0 && savedCode === "DULCE10") {
    const discountInfo = document.createElement("p");
    discountInfo.className = "discount-info";
    discountInfo.textContent = "Descuento DULCE10 aplicado (-10%)";
    cartSection.appendChild(discountInfo);
  }

  cartSection.appendChild(totalPrice);

  const checkoutButton = document.createElement("button");
  checkoutButton.className = "checkout-button";
  checkoutButton.textContent = "Proceder al pago";

  checkoutButton.addEventListener("click", () => {
    if (cartItems.length === 0) {
      alert("Tu carrito está vacío. Añade productos antes de continuar.");
      //Cambiar por toastify
      return;
    }

    const purchasedProducts =
      JSON.parse(localStorage.getItem("purchasedProductsByDate")) || {};

    cartItems.forEach((item) => {
      const date = item.date;
      const sizeKey = item.size ? `${item.nombre} - ${item.size}` : item.nombre;

      if (!purchasedProducts[date]) {
        purchasedProducts[date] = {};
      }

      if (!purchasedProducts[date][sizeKey]) {
        purchasedProducts[date][sizeKey] = 0;
      }

      purchasedProducts[date][sizeKey] += item.quantity;
    });

    localStorage.setItem(
      "purchasedProductsByDate",
      JSON.stringify(purchasedProducts)
    );

    localStorage.removeItem("cartItems");
    localStorage.removeItem("productsByDate");
    localStorage.removeItem("discountCode");

    const cartCounter = document.querySelector(".cart-counter");
    if (cartCounter) {
      cartCounter.textContent = "";
      cartCounter.classList.remove("visible");
    }

    alert("¡Gracias por tu compra! Tus productos han sido reservados.");

    const currentUser = JSON.parse(localStorage.getItem("current-user"));
    let userEmail = null;

    if (!currentUser) {
      userEmail = prompt("Introduce tu email para confirmar tu pedido:");
      if (!userEmail || !userEmail.includes("@")) {
        alert("Por favor introduce un email válido.");
        return;
      }
    }

    const hoy = new Date().toISOString().slice(0, 10);
    const categoria = cartItems.every((item) => item.date === hoy)
      ? "al día"
      : "encargo";

    const order = {
      productos: cartItems,
      total: Number((total - discountValue).toFixed(2)),
      categoria,
      email: currentUser ? currentUser.email : userEmail,
      user: currentUser ? currentUser._id : null,
    };
    console.log("Productos del carrito:");
    cartItems.forEach((item) => console.log(item.nombre, item.url));
    console.log("Pedido a enviar:", order);

    fetch("https://api-bakery-production.up.railway.app/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Error al enviar el pedido.");
        return response.json();
      })
      .then((data) => {
        console.log("Pedido enviado correctamente:", data);
      })
      .catch((error) => {
        console.error("Error al crear el pedido:", error);
        alert(
          "Hubo un problema al enviar el pedido. Intenta de nuevo más tarde."
        );
      });

    shoppingCart(); // Vuelve a renderizar el carrito vacío

    // Modal pasarela de pago
    const paymentContainer = document.createElement("div");
    paymentContainer.className = "payment-container";
    localStorage.setItem("selectedDate", cartItems[0].date);
    generatePaymentForm(paymentContainer);
    openModal(paymentContainer);

    // shoppingCart();
  });
        
  cartSection.appendChild(checkoutButton);
  app.appendChild(cartSection);
}
    
function updateCart(index, updatedItem, productsByDate) {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  cartItems[index] = updatedItem;
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  localStorage.setItem("productsByDate", JSON.stringify(productsByDate));
  shoppingCart();
}
    
export default {
  init() {
    console.log("Shopping Cart init ejecutado");
    shoppingCart();
  }
};