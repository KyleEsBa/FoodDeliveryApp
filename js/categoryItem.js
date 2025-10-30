const template = document.getElementById('categories-template');

/**
 * Adds category cards to the specified container using the template.
 * @param {Array} categories - Array of category objects with title and image.
 * @param {HTMLElement} container - The container element where cards will be appended.
 */
function addCategories(categories, container) {
  categories.forEach(category => {
    const clone = template.content.cloneNode(true);
    clone.querySelector('.category-title').textContent = category.title;
    clone.querySelector('.category-image').src = category.image;
    // Modify the href attribute of the <a> tag to include the category param
    const anchor = clone.querySelector('a.menu-category');
    anchor.href = `menuItems.html?category=${encodeURIComponent(category.param)}`;
    container.appendChild(clone);
  });
}

// Containers for separation
const initialContainer = document.getElementById('drinks-categories-container');
const moreContainer = document.getElementById('food-categories-container');

// Your categories arrays
const initialCategories = [
  {title: 'Hot Coffe', image: './Resources/Hot-Coffee.webp', param: 'hot-coffe'},
  {title: 'Cold Coffe', image: './Resources/Cold-Coffee.webp', param: 'cold-coffe'},
  {title: 'Protein Beverages', image: './Resources/Protein-Beverages.png', param: 'beverages'},
  {title: 'Refreshers', image: './Resources/Refreshers.png', param: 'refreshers'},
  {title: 'Frappucino', image: './Resources/Frappucino.png', param: 'frappucino'},
  {title: 'Hot Chocolate', image: './Resources/Hot-Chocolate.png', param: 'hot-chocolate'}
];

const moreCategories = [
  {title: 'Breakfast', image: './Resources/Breakfast.png', param: 'breakfast'},
  {title: 'Bakery', image: './Resources/Bakery.png', param: 'bakery'},
  {title: 'Treats', image: './Resources/Treats.png', param: 'treats'},
  {title: 'Lunch', image: './Resources/Lunch.png', param: 'lunch'},
  {title: 'Snacks', image: './Resources/Snacks.png', param: 'snacks'},
  {title: 'Cookies', image: './Resources/Cookies.png', param: 'cookies'},
];

// Add cards to separate containers
addCategories(initialCategories, initialContainer);
addCategories(moreCategories, moreContainer);
