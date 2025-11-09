import {formatPrice, eventHandler} from './menuItemsUtils.js';
// Your categories arrays
const products = [
  {
    category: "hot-coffe",
    products: [
      {
        title: "American Coffee",
        image: "./Resources/American-Coffee.png",
        price: 7.99,
      },
      { title: "Latte", image: "./Resources/Latte.png", price: 10.99 },
      {
        title: "Cappuccino",
        image: "./Resources/Cappuccino.png",
        price: 15.99,
      },
    ],
  },
  {
    category: "cold-coffe",
    products: [
      {
        title: "Cold Brew",
        image: "./Resources/Cold-Brew.png",
        price: 7.99,
      },
      {
        title: "Chocolate Cold Brew",
        image: "./Resources/Chocolate-Cold-Brew.png",
        price: 10.99,
      },
      {
        title: "Caramel Cold Brew",
        image: "./Resources/Caramel-Cold-Brew.webp",
        price: 15.99,
      },
    ],
  },
  {
    category: "protein-beverages",
    products: [
      {
        title: "Strawberry Shake",
        image: "./Resources/Strawberry-Shake-Protein.png",
        price: 3.99,
      },      
    ],
  },
  {
    category: "refreshers",
    products: [
      {
        title: "Lemonade",
        image: "./Resources/Lemonade.png",
        price: 2.99,
      },
      {
        title: "Kiwi Juice",
        image: "./Resources/Kiwi-Juice.png",
        price: 2.99,
      },   
    ],
  },
  {
    category: "frappuccino",
    products: [
      {
        title: "Frappuccino",
        image: "./Resources/Frappuccino-Chocolate.png",
        price: 8.99,
      },      
    ],
  },
  {
    category: "hot-chocolate",
    products: [
      {
        title: "Hot Chocolate",
        image: "./Resources/Chocolate.png",
        price: 8.99,
      },      
    ],
  },
  {
    category: "breakfast",
    products: [
      {
        title: "Pancakes",
        image: "./Resources/Pancakes.png",
        price: 5.99,
      },      
    ],
  },
  {
    category: "bakery",
    products: [
      {
        title: "Bread",
        image: "./Resources/Bread.png",
        price: 5.99,
      },      
      {
        title: "Special Bread",
        image: "./Resources/Special-Bread.webp",
        price: 11.99,
      },      
    ],
  },
  {
    category: "treats",
    products: [
      {
        title: "Cupcakes",
        image: "./Resources/Cupcake.png",
        price: 1.99,
      },           
    ],
  },
  {
    category: "lunch",
    products: [
      {
        title: "Grilled Salmon",
        image: "./Resources/Salmon.webp",
        price: 20.99,
      },           
    ],
  },
  {
    category: "snacks",
    products: [
      {
        title: "Mini Snacks",
        image: "./Resources/Mini-Snaks.png",
        price: 13.99,
      },           
    ],
  },
  {
    category: "cookies",
    products: [
      {
        title: "Choco Chips",
        image: "./Resources/Cookies.png",
        price: 4.99,
      },           
    ],
  },
];

const urlParams = new URLSearchParams(window.location.search);
const categoryParam = urlParams.get("category");
const container = document.getElementById(categoryParam + "-container");

function getTemplate() {
  return document.getElementById("product-template");
}

function displayItems(products, container) {  
  products.forEach((product) => {
    const template = getTemplate();
    const item = template.content.cloneNode(true);
    item.querySelector(".product-title").textContent = product.title;
    item.querySelector(".product-image").src = product.image;
    item.querySelector(".product-price").textContent  = formatPrice(product.price);
    item.querySelector(".product-card").dataset.price = product.price;
    container.appendChild(item);
  });
}

function main() {
  const filteredProduct = products.find(
    (product) => product.category === categoryParam
  );
  container.style.display = "block";
  displayItems(filteredProduct.products, container);
}

document.addEventListener("DOMContentLoaded", main);
eventHandler(container);