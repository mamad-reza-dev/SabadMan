import type { CartItemType } from '../../types';

import { RenderableView } from '../renderableView';
import { getProductDisplayState } from '../../helpers';
import { AppError, selectChildEl, selectClosestEl, selectDataAttr, formatPrice } from '../../utils';

class CartItemsView extends RenderableView<CartItemType> {
  constructor(parentSelector: string = '#cart-items') {
    super(parentSelector);
  }

  updateCartItemControls(cartItem: CartItemType) {
    const cardEl = selectChildEl(
      this.parentElement,
      `[data-id="${cartItem.id}"]`,
      'CartItemsView.updateCartItemControls()',
      `No element found for cart item [data-id="${cartItem.id}"].`
    );

    const btnContainer = selectChildEl(
      cardEl,
      '[data-role="calc-price"]',
      'CartItemsView.updateCartItemControls()',
      `Missing element with [data-role="calc-price"] inside cart item [data-id="${cartItem.id}"].`
    );

    const { buttonHTML } = getProductDisplayState(
      cartItem.stock,
      cartItem.quantityInCart,
      true,
      'cartItem'
    );

    btnContainer.innerHTML = `
      ${buttonHTML}
      <span class="cart-item__total-price">${formatPrice(cartItem.price * cartItem.quantityInCart)}</span>
    `;
  }

  deleteItem(id: number) {
    const cartElement = selectChildEl(
      this.parentElement,
      `[data-id="${id}"]`,
      'CartItemsView.deleteItem()',
      `No cart item element found in the DOM for [data-id="${id}"]`
    );
    cartElement.remove();
  }

  addHandlerQuantityChange(handler: (id: number, action: string) => void) {
    this.parentElement.addEventListener('click', (ev) => {
      const target = ev.target as HTMLElement;

      const btn = target.closest('[data-action]') as HTMLElement | null;
      if (!btn) return;

      const action = selectDataAttr(
        btn,
        'action',
        'CartItemsView.addHandlerQuantityChange()',
        'Missing [data-action] attribute on clicked button.'
      );

      const itemEl = selectClosestEl(
        btn,
        '[data-role="cart-item"]',
        'CartItemsView.addHandlerQuantityChange()',
        'Missing parent element [data-role="cart-item"] for clicked button.'
      );

      const id = selectDataAttr(
        itemEl,
        'id',
        'CartItemsView.addHandlerQuantityChange()',
        'Missing [data-id] attribute on [data-role="cart-item"].'
      );

      handler(Number(id), action);
    });
  }

  //@ts-ignore
  generateMarkup(data: CartItemType | CartItemType[]): string {
    throw AppError.dev(
      'CartItemsView.generateMarkup()',
      'Called but not implemented. Override this method to render cart items.'
    );
  }

  generateMarkupEmpty(): string {
    return `
      <section data-role="empty-state" class="cart__empty">
        <svg class="icon cart__empty-icon">
          <use href="#icon-shopping-bag"></use>
        </svg>
        <p class="cart__empty-text">سبد خرید شما خالی است.</p>
      </section>
    `;
  }
}

export const cartItemsView = new CartItemsView();
