import type { CartItemType } from '../../types';

import { PureView } from '../pureView';
import { formatPrice } from '../../utils';
import { getProductDisplayState } from '../../helpers';

class CartItemMarkup extends PureView<CartItemType> {
  generateMarkup(data: CartItemType): string {
    const { id, title, imageUrl, price, quantityInCart, stock } = data;
    const formattedPrice = formatPrice(quantityInCart * price);
    const { buttonHTML } = getProductDisplayState(stock, quantityInCart, true, 'cartItem');

    return `
      <article data-id="${id}" data-role="cart-item" class="cart-item">
        <figure class="cart-item__thumbnail">
          <img
            class="cart-item__image"
            loading="lazy"
            src="${imageUrl}"
            alt="${title}"
          >
        </figure>

        <div class="cart-item__details">
          <h3 class="cart-item__title">${title}</h3>
          <p class="cart-item__stock">
            تعداد موجود در انبار: ${Intl.NumberFormat('fa-IR').format(stock)}
          </p>

          <div data-role="calc-price" class="cart-item__calc-price">
            ${buttonHTML}
            <span class="cart-item__total-price">${formattedPrice}</span>
          </div>
        </div>
      </article>
    `;
  }
}

export const cartItemMarkup = new CartItemMarkup();
