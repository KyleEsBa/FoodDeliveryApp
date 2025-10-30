const urlParams = new URLSearchParams(window.location.search);
const categoryParam = urlParams.get('category');
const template = document.getElementById('product-template');

function addCategories(products, container) {
  products.forEach(product => {
    const clone = template.content.cloneNode(true);
    clone.querySelector('.product-title').textContent = product.title;
    clone.querySelector('.product-image').src = product.image;
    container.appendChild(clone);
  });
}

// Your categories arrays
const hotCoffeeProducts = [
  {title: 'American Coffee', image: './Resources/American-Coffee.png', price: '$7.00'},
  {title: 'Latte', image: './Resources/Latte.png', price: '$10.00'},
  {title: 'Cappuccino', image: './Resources/Cappuccino.png', price: '$15.00'}
];

const coldCoffeeProducts = [
  {title: 'Cold Brew', image: './Resources/Cold-Brew.png', price: '$7.00'},
  {title: 'Chocolate Cold Brew', image: './Resources/Chocolate-Cold-Brew.png', price: '$10.00'},
  {title: 'Caramel Cold Brew', image: './Resources/Caramel-Cold-Brew.webp', price: '$15.00'}
];

// Containers for separation
const hotCoffeeContainer = document.getElementById('hot-coffe-container');
const coldCoffeeContainer = document.getElementById('cold-coffe-container');

// Hide both containers by default before adding content
hotCoffeeContainer.style.display = 'none';
coldCoffeeContainer.style.display = 'none';

// Show only container matching the parameter if provided, else show both
switch (categoryParam) {
  case 'hot-coffe':
    hotCoffeeContainer.style.display = 'block';
    addCategories(hotCoffeeProducts, hotCoffeeContainer); // Add only hot coffee products
    break;
  case 'cold-coffe':
    coldCoffeeContainer.style.display = 'block';
    addCategories(coldCoffeeProducts, coldCoffeeContainer); // Add only cold coffee products
    break;
  default:
    // Show both containers and add all products if no param
    hotCoffeeContainer.style.display = 'block';
    coldCoffeeContainer.style.display = 'block';
    addCategories(hotCoffeeProducts, hotCoffeeContainer);
    addCategories(coldCoffeeProducts, coldCoffeeContainer);
}




// Event delegation for + and - buttons inside all product containers
[hotCoffeeContainer, coldCoffeeContainer].forEach(container => {
  container.addEventListener('click', (event) => {
    const target = event.target;

    // Using closest to detect buttons with specific background color classes (minus: bg-slate-400, plus: bg-slate-800)
    const minusBtn = target.closest('button.bg-slate-400, button.bg-black');
    const plusBtn = target.closest('button.bg-slate-800');

    if (minusBtn || plusBtn) {
      // Find the counter span sibling within the same flex container
      // Assumes structure: button - span - button inside a flex container
      let counterSpan = null;
      // Climb DOM to find the div that contains these buttons and counter span
      const parentDiv = (minusBtn || plusBtn).parentElement;
      if (parentDiv) {
        counterSpan = parentDiv.querySelector('span');
      }
      if (counterSpan) {
        let count = parseInt(counterSpan.textContent) || 0;
        if (minusBtn && count > 0) {
          count--;
          updateCart();
        } else if (plusBtn) {
          count++;
          updateCart();
        }
        counterSpan.textContent = count;
      }
    }


    // Handle size button clicks
    if (target.tagName === 'BUTTON' && target.parentElement && target.parentElement.textContent.includes('Size:')) {
      // Only toggle size buttons inside the same product card
      const productCard = target.closest('.product-card');
      if (!productCard) return;

      // Select all size buttons in the product card
      const sizeButtons = productCard.querySelectorAll('p > button');

      // Remove selection class from all size buttons
      sizeButtons.forEach(btn => {
        btn.classList.remove('selected-size');
        btn.classList.add('bg-white');
        btn.classList.remove('text-white');
        btn.classList.add('text-blue-950');
      });

      // Set selected style for clicked button
      target.classList.add('selected-size', 'bg-blue-800', 'text-white');
      target.classList.remove('bg-white', 'text-blue-950');
    }
  });
});

document.querySelectorAll('.heart-icon').forEach(heart => {
  heart.addEventListener('click', () => {
    if (heart.classList.contains('fill-red-600')) {
      // Optional: To toggle off (unlike), remove red fill:
      // heart.classList.remove('fill-red-600');
      // heart.classList.add('fill-slate-400');
      // If you want it to stay red once clicked, do nothing here.
      return;
    }
    // Remove gray fill, add red fill
    heart.classList.remove('fill-slate-400');
    heart.classList.add('fill-red-600');
  });
});

function updateCart() {
  const cart = [];

  document.querySelectorAll('.product-card').forEach(card => {
    const title = card.querySelector('.product-title')?.textContent;
    const price = card.querySelector('.product-price')?.textContent;
    const image = card.querySelector('.product-image')?.src;
    const countSpan = card.querySelector('span');
    const count = countSpan ? parseInt(countSpan.textContent) : 0;

    if (title && price && count > 0) {
      cart.push({ title, price, image, quantity: count });
    }
  });

  localStorage.setItem('shoppingCart', JSON.stringify(cart));
}

