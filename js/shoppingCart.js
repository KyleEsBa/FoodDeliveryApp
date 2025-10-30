document.addEventListener('DOMContentLoaded', () => {
  const cartData = localStorage.getItem('shoppingCart');
  const cartContainer = document.getElementById('shopping-cart-container');
  const template = document.getElementById('product-template');

  if (cartData && cartContainer && template) {
    const cartItems = JSON.parse(cartData);

    cartItems.forEach(item => {
      const clone = template.content.cloneNode(true);

      // Fill product information
      clone.querySelector('.product-title').textContent = item.title;
      clone.querySelector('.product-image').src = item.image || './Resources/default.png';
      clone.querySelector('.product-price').textContent = item.price;
      clone.querySelector('.product-quantity').textContent = item.quantity;

      cartContainer.appendChild(clone);
    });
  }
});
