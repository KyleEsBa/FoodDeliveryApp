export function productItemsEventDelegation(containers, updateCartCallback) {
  containers.forEach((container) => {
    container.addEventListener("click", (event) => {
      const target = event.target;

      // Handle minus and plus buttons
      const minusBtn = target.closest("button.bg-slate-400, button.bg-black");
      const plusBtn = target.closest("button.bg-slate-800");

      if (minusBtn || plusBtn) {
        const parentDiv = (minusBtn || plusBtn).parentElement;
        const counterSpan = parentDiv ? parentDiv.querySelector("span") : null;

        if (counterSpan) {
          let count = parseInt(counterSpan.textContent) || 0;

          if (minusBtn && count > 0) {
            count--;
            if (updateCartCallback) updateCartCallback();
          } else if (plusBtn) {
            count++;
            if (updateCartCallback) updateCartCallback();
          }

          counterSpan.textContent = count;
        }
      }

      // Handle size button toggling
      if (
        target.tagName === "BUTTON" &&
        target.parentElement &&
        target.parentElement.textContent.includes("Size:")
      ) {
        const productCard = target.closest(".product-card");
        if (!productCard) return;

        const sizeButtons = productCard.querySelectorAll("p > button");

        sizeButtons.forEach((btn) => {
          btn.classList.remove("selected-size");
          btn.classList.add("bg-white");
          btn.classList.remove("text-white");
          btn.classList.add("text-blue-950");
        });

        target.classList.add("selected-size", "bg-blue-800", "text-white");
        target.classList.remove("bg-white", "text-blue-950");
      }
    });
  });
}

export function formatPrice(price) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}

export function eventHandler(container) {
  // Event delegation for + and - buttons inside all product containers
  [container].forEach((container) => {
    container.addEventListener("click", (event) => {
      const target = event.target;

      //------QUANTITY BUTTONS
      // Using closest to detect buttons with specific background color classes (minus: bg-slate-400, plus: bg-slate-800)
      const minusBtn = target.closest("button.bg-slate-400, button.bg-black");
      const plusBtn = target.closest("button.bg-slate-800");

      if (minusBtn || plusBtn) {
        let counterSpan = null;
        const parentDiv = (minusBtn || plusBtn).parentElement;
        if (parentDiv) {
          counterSpan = parentDiv.querySelector("span");
        }
        if (counterSpan) {
          let count = parseInt(counterSpan.textContent) || 0;
          if (minusBtn && count > 0) {
            count--;
          } else if (plusBtn) {
            count++;
          }
          counterSpan.textContent = count;
        }
      }

      //------SIZE BUTTONS
      // Handle size button clicks
      if (
        target.tagName === "BUTTON" &&
        target.parentElement &&
        target.parentElement.textContent.includes("Size:")
      ) {
        const productCard = target.closest(".product-card");
        if (!productCard) return;

        // Select all size buttons in the product card
        const sizeButtons = productCard.querySelectorAll("p > button");

        // Remove selection class from all size buttons
        sizeButtons.forEach((btn) => {
          btn.classList.remove("selected-size");
          btn.classList.remove("bg-blue-800");
          btn.classList.remove("text-white");
          btn.classList.add("text-blue-950");
        });

        // Set selected style for clicked button
        target.classList.add("selected-size", "bg-blue-800", "text-white");
        target.classList.remove("bg-white", "text-blue-950");

        productCard.dataset.selectedSize = target.textContent;
      }
      updateCart();

      const heartBtn = target.closest(".heart-icon");
      if (heartBtn) {
        if (!heartBtn.classList.contains("fill-red-600")) {
          heartBtn.classList.remove("fill-slate-400");
          heartBtn.classList.add("fill-red-600");
        } else {
          heartBtn.classList.remove("fill-red-600");
          heartBtn.classList.add("fill-slate-400");
        }
      }
    });
  });
}

function updateCart() {
  const cart = [];

  document.querySelectorAll(".product-card").forEach((card) => {
    const title = card.querySelector(".product-title")?.textContent;
    const priceElement = card.querySelector(".product-price");
    const image = card.querySelector(".product-image")?.src;
    const selectedSize = card.dataset.selectedSize || null;
    const countSpan = card.querySelector("span");
    const count = countSpan ? parseInt(countSpan.textContent) : 0;
    const price = parseFloat(card.dataset.price);

    if (title && price && count > 0 && selectedSize != null) {
      cart.push({ title, price, image, quantity: count, size: selectedSize });
    }
  });

  localStorage.setItem("shoppingCart", JSON.stringify(cart));
  window.dispatchEvent(new Event("cartUpdated"));
}
