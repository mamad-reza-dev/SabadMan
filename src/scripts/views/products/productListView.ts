import type { EnrichedProductType } from '../../types';

import { RenderableView } from '../renderableView';
import { AppError, selectChildEl, selectClosestEl, selectDataAttr } from '../../utils';
import { getProductDisplayState } from '../../helpers';

export class ProductListView extends RenderableView<EnrichedProductType> {
  constructor(parentSelector: string = '#product-list') {
    super(parentSelector);
  }

  updateProductButton(product: EnrichedProductType) {
    const cardEl = selectChildEl(
      this.parentElement,
      `[data-role="product-card"][data-id="${product.id}"]`,
      'ProductListView.updateProductButton()',
      `No product card element found in the DOM for id="${product.id}". Expected selector: [data-role="product-card"][data-id="${product.id}"]. Possible DOM desync or missing render call.`
    );

    const oldButton = selectChildEl(
      cardEl,
      '[data-role="product-card-button"]',
      'ProductListView.updateProductButton()',
      `Card button element not found inside product card id="${product.id}". Expected selector: [data-role="product-card-button"]. Check if product card markup is up-to-date or button was not rendered.`
    );

    const { buttonHTML } = getProductDisplayState(
      product.stock,
      product.quantityInCart,
      product.isInCart
    );

    if (!buttonHTML.trim()) {
      oldButton.remove();
      return;
    }

    const newButton = RenderableView.createElementFromHTML(buttonHTML);

    if (!newButton)
      throw AppError.dev(
        'ProductListView.updateProductButton()',
        `Failed to create button element from provided HTML for product id="${product.id}".`
      );

    oldButton.replaceWith(newButton);
  }

  updateProductStock(product: EnrichedProductType) {
    const cardEl = selectChildEl(
      this.parentElement,
      `[data-role="product-card"][data-id="${product.id}"]`,
      'ProductListView.updateProductButton()',
      `No product card element found in the DOM for id="${product.id}". Expected selector: [data-role="product-card"][data-id="${product.id}"]. Possible DOM desync or missing render call.`
    );

    const oldStock = selectChildEl(
      cardEl,
      `[data-role="product-stock"]`,
      'ProductListView.updateProductStock()',
      `Stock element not found inside product card id="${product.id}". Expected selector: [data-role="product-stock"]. Check if stock label markup exists or was not rendered.`
    );

    const { stockHTML } = getProductDisplayState(
      product.stock,
      product.quantityInCart,
      product.isInCart
    );

    if (!stockHTML!.trim()) {
      oldStock.remove();
      return;
    }

    const newStock = RenderableView.createElementFromHTML(stockHTML as string);

    if (!newStock)
      throw AppError.dev(
        'ProductListView.updateProductStock()',
        `Failed to create stock element from provided HTML for product id="${product.id}".`
      );

    oldStock.replaceWith(newStock);
  }

  updateProductView(product: EnrichedProductType) {
    this.updateProductStock(product);
    this.updateProductButton(product);
  }

  addHandlerAddToCard(handler: (productId: number, action: string) => void) {
    this.parentElement.addEventListener('click', (ev) => {
      const target = ev.target as HTMLElement;

      const productElement = selectClosestEl(
        target,
        '[data-role="product-card"]',
        'ProductListView.addHandlerAddToCard()',
        `No product card element found for the clicked button. Expected ancestor with class ".product-card". Check your product card markup.`
      );

      const btn = target.closest('[data-action]') as HTMLElement;
      if (!btn) return;

      const productId = selectDataAttr(
        productElement,
        'id',
        'ProductListView.addHandlerAddToCard()',
        `Missing or invalid product id in product card dataset. Expected a valid "data-id" attribute on the product card element.`
      );

      const action = selectDataAttr(
        btn,
        'action',
        'ProductListView.addHandlerAddToCard()',
        `Button missing "data-action" attribute. Cannot determine action type (e.g., 'add', 'remove', etc.).`
      );
      handler(Number(productId), action);
    });
  }

  generateMarkupEmpty(): string {
    return `
          <div class="products__message">
            <svg class="icon products__message-icon">
                <use href="#icon-cog-6-tooth"></use>
            </svg>
            <p class="products__message-text">فعلا داریم روی لیست محصولاتمون کار میکنیم. لطفا بعدا مراجعه کنید.</p>
          </div>
      `;
  }

  //@ts-ignore
  generateMarkup(data: EnrichedProductType | EnrichedProductType[]): string {
    throw AppError.dev('ProductListView.generateMarkup()', 'Method not implemented.');
  }
}

export const productListView = new ProductListView();
