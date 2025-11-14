type ProductButtonState = {
  buttonHTML: string;
  stockHTML?: string;
};

type ProductContext = 'productCard' | 'cartItem';

import { LOW_STOCK_THRESHOLD } from '../config';

const PRODUCT_STATES = {
  outOfStock: (): ProductButtonState => ({
    buttonHTML: ``,
    stockHTML: `
      <span data-role="product-stock" class="product-card__stock product-card__stock--out">
        ناموجود
      </span>`,
  }),

  inCart: (
    stock: number,
    quantityInCart: number,
    context: ProductContext = 'productCard'
  ): ProductButtonState => {
    const isMax = stock === quantityInCart;
    const isSingle = quantityInCart === 1;
    const decreaseIcon = isSingle ? 'trash' : 'minus';
    const decreaseModifier = isSingle
      ? 'quantity-control__btn--delete'
      : 'quantity-control__btn--decrease';

    const wrapperClass = context === 'cartItem' ? 'cart-item' : 'product-card';

    return {
      buttonHTML: `
        <section data-role="${wrapperClass}-button" class="${wrapperClass}__quantity-control quantity-control">
          <button
            data-action="increase"
            class="button quantity-control__btn quantity-control__btn--increase ${
              isMax ? 'button--disabled' : ''
            }"
            aria-label="افزایش تعداد"
            ${isMax ? 'disabled' : ''}
          >
            <svg class="icon quantity-control__btn-icon">
              <use href="#icon-plus"></use>
            </svg>
          </button>

          <span class="quantity-control__value">
            ${Intl.NumberFormat('fa-IR').format(quantityInCart)}
          </span>

          <button
            data-action="${isSingle ? 'delete' : 'decrease'}"
            class="button quantity-control__btn ${decreaseModifier}"
            aria-label="${isSingle ? 'حذف کالا' : 'کاهش تعداد'}"
          >
            <svg class="icon quantity-control__btn-icon">
              <use href="#icon-${decreaseIcon}"></use>
            </svg>
          </button>
        </section>
      `,
      stockHTML:
        context === 'productCard'
          ? stock <= LOW_STOCK_THRESHOLD
            ? `<span data-role="product-stock" class="product-card__stock product-card__stock--low">تنها ${Intl.NumberFormat('fa-IR').format(stock)} عدد در انبار باقی مانده</span>`
            : `<span data-role="product-stock" class="product-card__stock product-card__stock--exist">موجود</span>`
          : undefined,
    };
  },

  available: (stock: number): ProductButtonState => ({
    buttonHTML: `
      <button
        data-role="product-card-button"
        data-action="add-to-cart"
        class="button button--secondary product-card__btn"
      >
        افزودن به سبد خرید
      </button>
    `,
    stockHTML:
      stock <= LOW_STOCK_THRESHOLD
        ? `<span data-role="product-stock" class="product-card__stock product-card__stock--low">تنها ${Intl.NumberFormat('fa-IR').format(stock)} عدد در انبار باقی مانده</span>`
        : `<span data-role="product-stock" class="product-card__stock product-card__stock--exist">موجود</span>`,
  }),
};

export function getProductDisplayState(
  stock: number,
  quantityInCart: number,
  isInCart: boolean,
  context: ProductContext = 'productCard'
): ProductButtonState {
  if (stock === 0) return PRODUCT_STATES.outOfStock();
  if (isInCart) return PRODUCT_STATES.inCart(stock, quantityInCart, context);
  return PRODUCT_STATES.available(stock);
}
