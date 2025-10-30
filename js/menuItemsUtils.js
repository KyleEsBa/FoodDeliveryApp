// cartUtils.js
export function productItemsEventDelegation(containers, updateCartCallback) {
  containers.forEach(container => {
    container.addEventListener('click', (event) => {
      const target = event.target;

      // Handle minus and plus buttons
      const minusBtn = target.closest('button.bg-slate-400, button.bg-black');
      const plusBtn = target.closest('button.bg-slate-800');

      if (minusBtn || plusBtn) {
        const parentDiv = (minusBtn || plusBtn).parentElement;
        const counterSpan = parentDiv ? parentDiv.querySelector('span') : null;

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
      if (target.tagName === 'BUTTON' && target.parentElement && target.parentElement.textContent.includes('Size:')) {
        const productCard = target.closest('.product-card');
        if (!productCard) return;

        const sizeButtons = productCard.querySelectorAll('p > button');

        sizeButtons.forEach(btn => {
          btn.classList.remove('selected-size');
          btn.classList.add('bg-white');
          btn.classList.remove('text-white');
          btn.classList.add('text-blue-950');
        });

        target.classList.add('selected-size', 'bg-blue-800', 'text-white');
        target.classList.remove('bg-white', 'text-blue-950');
      }
    });
  });
}
