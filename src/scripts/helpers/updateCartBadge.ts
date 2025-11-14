import { selectEl } from '../utils/dom.ts';

export function updateCartBadge(count: number) {
  const badge = selectEl(
    '#cart-badge',
    'cart()',
    'Cart badge element not found! Expected a DOM element with id="cart-badge" in the header. Make sure it exists in the HTML.'
  );

  if (count > 0) {
    badge.textContent = String(Intl.NumberFormat('fa-IR').format(count));
    badge.classList.remove('header__cart-badge--hidden');
  } else {
    badge.classList.add('header__cart-badge--hidden');
  }
}
