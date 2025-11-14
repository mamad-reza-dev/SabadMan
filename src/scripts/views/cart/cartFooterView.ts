import { RenderableView } from '../renderableView.ts';
import { formatPrice } from '../../utils';
import { selectChildEl } from '../../utils';

export class CartFooterView extends RenderableView<number> {
  constructor(parentSelector: string = '#cart-footer') {
    super(parentSelector);
  }

  addHandlerCheckout(handler: () => void): void {
    this.parentElement.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      const btn = target.closest('[data-action="checkout"]') as HTMLElement | null;
      if (!btn) return;
      handler();
    });
  }

  generateMarkup(data: number): string {
    return `
      <div class="cart__footer-container">
        <div class="cart__footer-summary">
          <p class="cart__footer-label">جمع کل</p>
          <p data-role="cart-total-value" class="cart__footer-value">${formatPrice(data)}</p>
        </div>
        <button data-action="checkout" class="button button--secondary cart__footer-checkout-btn">
          تسویه حساب
        </button>
      </div>
    `;
  }

  generateMarkupEmpty(): string {
    return '';
  }

  updateTotal(total: number): void {
    this.setState(total);
    const valueEl = selectChildEl(
      this.parentElement,
      '[data-role="cart-total-value"]',
      'CartFooterView.updateTotal()',
      'Missing element with [data-role="cart-total-value"] in parent element.'
    );
    valueEl.textContent = formatPrice(this.state as number);
  }

  updateOrRenderFooter(total: number, countItems: number): void {
    if (countItems === 0) {
      this.renderEmptyState();
      return;
    }
    const totalValueEl = this.parentElement.querySelector('[data-role="cart-total-value"]');
    if (totalValueEl) {
      this.updateTotal(total);
    } else {
      this.renderData(total);
    }
  }
}

export const cartFooterView = new CartFooterView();
