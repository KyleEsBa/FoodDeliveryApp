// Your categories arrays
const drinksCategories = [
  {title: 'Hot Coffe', image: './Resources/Hot-Coffee.webp', param: 'hot-coffe'},
  {title: 'Cold Coffe', image: './Resources/Cold-Coffee.webp', param: 'cold-coffe'},
  {title: 'Protein Beverages', image: './Resources/Protein-Beverages.png', param: 'beverages'},
  {title: 'Refreshers', image: './Resources/Refreshers.png', param: 'refreshers'},
  {title: 'Frappucino', image: './Resources/Frappucino.png', param: 'frappucino'},
  {title: 'Hot Chocolate', image: './Resources/Hot-Chocolate.png', param: 'hot-chocolate'}
];

const foodCategories = [
  {title: 'Breakfast', image: './Resources/Breakfast.png', param: 'breakfast'},
  {title: 'Bakery', image: './Resources/Bakery.png', param: 'bakery'},
  {title: 'Treats', image: './Resources/Treats.png', param: 'treats'},
  {title: 'Lunch', image: './Resources/Lunch.png', param: 'lunch'},
  {title: 'Snacks', image: './Resources/Snacks.png', param: 'snacks'},
  {title: 'Cookies', image: './Resources/Cookies.png', param: 'cookies'},
];

// Containers for separation
const drinksContainer = document.getElementById('drinks-categories-container');
const foodContainer = document.getElementById('food-categories-container');

function getTemplate(){
  return document.getElementById('categories-template');  
}

function addCategories(categories, container) {
  const template = getTemplate();
  categories.forEach(category =>{
    const card = generateCategories(category, template);
    container.appendChild(card);
  })
}

function generateCategories(category, template) {
    const clone = template.content.cloneNode(true);
    clone.querySelector('.category-title').textContent = category.title;
    clone.querySelector('.category-image').src = category.image;
    // Modify the href attribute of the <a> tag to include the category param
    const anchor = clone.querySelector('a.menu-category');
    anchor.href = `menuItems.html?category=${encodeURIComponent(category.param)}`;
    return clone;
}

function main(){
// Add cards to separate containers
addCategories(drinksCategories, drinksContainer);
addCategories(foodCategories, foodContainer);
}

document.addEventListener('DOMContentLoaded',main);