import type { EnrichedProductType } from '../../types';

import { PureView } from '../pureView';
import { getProductDisplayState } from '../../helpers';
import { formatPrice } from '../../utils';

class ProductCardMarkup extends PureView<EnrichedProductType> {
  generateMarkup(data: EnrichedProductType): string {
    const { id, title, description, imageUrl, price, stock, isInCart, quantityInCart } = data;
    const { buttonHTML, stockHTML } = getProductDisplayState(stock, quantityInCart, isInCart);
    const formattedPrice = formatPrice(price);
    return `
      <article data-id="${id}" data-role="product-card" class="product-card">
        <figure class="product-card__thumbnail">
          <img
            class="product-card__image"
            loading="lazy"
            src="${imageUrl}"
            alt="${title}"
          />
        </figure>
        <div  class="product-card__controls">
          <div class="product-card__content">
            <h3 class="product-card__title">${title}</h3>
            <p class="product-card__desc">${description}</p>
            ${stockHTML}
          </div>
          <footer class="product-card__footer">
            <span class="product-card__price">${formattedPrice}</span>
            ${buttonHTML}
          </footer>
        </div>
      </article>
    `;
  }
}

export const productCardMarkup = new ProductCardMarkup();
