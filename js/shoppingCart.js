import { formatPrice, eventHandler } from "./menuItemsUtils.js";

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("shopping-cart-container");
  const cartData = localStorage.getItem("shoppingCart");
  const cartContainer = document.getElementById("shopping-cart-container");
  const template = document.getElementById("product-template");

  if (cartData && cartContainer && template) {
    const cartItems = JSON.parse(cartData);
    cartItems.forEach((item) => {
      const clone = template.content.cloneNode(true);
      const productCard = clone.querySelector(".product-card");

      // Add data attributes
      productCard.dataset.price = item.price;
      productCard.dataset.selectedSize = item.size;

      // Fill product information
      clone.querySelector(".product-title").textContent = item.title;
      clone.querySelector(".product-image").src = item.image;
      clone.querySelector(".product-price").textContent = formatPrice(
        item.price * item.quantity
      );
      clone.querySelector(".product-quantity").textContent = item.quantity;

      // Highlight the selected size button
      const sizeButtons = clone.querySelectorAll("p > button");
      sizeButtons.forEach((btn) => {
        if (btn.textContent.trim() === item.size) {
          btn.classList.add("selected-size", "bg-blue-800", "text-white");
        }
      });
      cartContainer.appendChild(clone);
    });
    eventHandler(container);
    updateCartSummary();
    modalActions();
  }

});

window.addEventListener("cartUpdated", updateCartSummary);

function modalActions() {
  let modal = document.getElementById("modal");
  let openModalBtn = document.getElementById("openModal");
  let closeModalBtns = [
    document.getElementById("closeIcon"),
    document.getElementById("closeButton"),
  ];

  function showModal() {
    modal.classList.remove("hidden");
  }

  function hideModal() {
    modal.classList.add("hidden");
  }

  openModalBtn.addEventListener("click", showModal);

  closeModalBtns.forEach((btn) => btn.addEventListener("click", hideModal));

  // Close modal when clicking outside the modal content
  modal.addEventListener("click", (event) => {
    if (event.target === modal.firstElementChild) {
      hideModal();
    }
  });
}

function updateCartSummary() {
  const cartData = JSON.parse(localStorage.getItem("shoppingCart")) || [];
  let subtotal = 0;
  cartData.forEach((item) => {
    subtotal += item.price * item.quantity;
  });
  let shippingFee = (subtotal * 2) / 100;
  let taxes = (subtotal * 18) / 100;
  let total = subtotal + shippingFee + taxes;
  document.querySelector(".products-subtotal").textContent =
    formatPrice(subtotal);
  document.querySelector(".products-shipping-fee").textContent =
    formatPrice(shippingFee);
  document.querySelector(".products-taxes").textContent = formatPrice(taxes);
  document.querySelector(".products-total").textContent = formatPrice(total);
}
