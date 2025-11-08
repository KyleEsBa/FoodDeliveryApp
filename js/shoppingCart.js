import {formatPrice} from './menuItemsUtils.js';

document.addEventListener('DOMContentLoaded', () => {
  const cartData = localStorage.getItem('shoppingCart');
  const cartContainer = document.getElementById('shopping-cart-container');
  const template = document.getElementById('product-template');

  if (cartData && cartContainer && template) {
    const cartItems = JSON.parse(cartData);
    let subtotal = 0;
    cartItems.forEach(item => {
      const clone = template.content.cloneNode(true);

      // Fill product information
      clone.querySelector('.product-title').textContent = item.title;
      clone.querySelector('.product-image').src = item.image || './Resources/default.png';
      clone.querySelector('.product-price').textContent = item.price*item.quantity;
      clone.querySelector('.product-quantity').textContent = item.quantity;
      subtotal += (item.price*item.quantity);
      cartContainer.appendChild(clone);
    });
    let shippingFee = (subtotal*2)/100;
    let taxes = (subtotal*18)/100
    document.querySelector('.products-subtotal').textContent = formatPrice(subtotal);
    document.querySelector('.products-shipping-fee').textContent = formatPrice(shippingFee);
    document.querySelector('.products-taxes').textContent = formatPrice(taxes);
    document.querySelector('.products-total').textContent = formatPrice(subtotal + shippingFee + taxes);
  }
});
