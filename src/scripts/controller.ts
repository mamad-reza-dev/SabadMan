// @ts-ignore
import 'virtual:svg-icons-register';
import { updateCartBadge } from './helpers';
import { model } from './model';
import { Views } from './views';
import { AppError } from './utils';

async function init() {
  try {
    await controlDisplayAllProducts();

    Views.Product.productListView.addHandlerAddToCard(controlQuantityChange);
    Views.Cart.cartItemsView.addHandlerQuantityChange(controlQuantityChange);
    Views.Cart.cartFooterView.addHandlerCheckout(controlCheckoutCart);
  } catch (error: unknown) {
    handleError(error);
  }
}

init();

async function controlDisplayAllProducts() {
  Views.Product.productListView.renderLoader('span-full');
  await model.fetchAllProducts();
  Views.Product.productListView.renderData(
    model.enrichedProducts,
    Views.Product.productCardMarkup.generateMarkup
  );
}

function controlQuantityChange(id: number, action: string) {
  switch (action) {
    case 'add-to-cart':
      handleAddToCart(id);
      break;

    case 'increase':
      handleIncreaseCount(id);
      break;

    case 'decrease':
      handleDecreaseCount(id);
      break;

    case 'delete':
      handleDeleteCount(id);
      break;
  }
}

function controlCheckoutCart() {
  const affectedIds = model.shoppingCart.map((item) => item.id);

  model.checkoutCart();
  Views.Cart.cartFooterView.renderEmptyState();
  updateCartBadge(model.totalItemInCart);
  Views.Cart.cartItemsView.renderEmptyState();
  Views.Notification.showNotification(
    'سفارش شما ثبت شد و در حال پردازش است. از اعتماد شما سپاسگزاریم',
    'success'
  );
  Views.Cart.cartSidebarToggleView.hide();
  refreshProductCardControls(affectedIds);
}

function handleAddToCart(id: number) {
  const newItem = model.addToCart(id);
  if (!newItem) return;

  Views.Cart.cartFooterView.updateOrRenderFooter(model.totalPriceCart, model.shoppingCart.length);

  Views.Cart.cartItemsView.addItem(newItem, Views.Cart.cartItemMarkup.generateMarkup);

  updateCartBadge(model.totalItemInCart);

  updateProductCardButton(id);
}

function handleIncreaseCount(id: number) {
  const updated = model.updateCartItemCount(id, +1);
  if (!updated) return;

  updateCartBadge(model.totalItemInCart);
  Views.Cart.cartFooterView.updateTotal(model.totalPriceCart);

  updateProductCardButton(id);

  updateCartItemControls(id);
}

function handleDecreaseCount(id: number) {
  const updated = model.updateCartItemCount(id, -1);
  if (!updated) return;

  updateCartBadge(model.totalItemInCart);
  Views.Cart.cartFooterView.updateTotal(model.totalPriceCart);

  updateProductCardButton(id);

  updateCartItemControls(id);
}

function handleDeleteCount(id: number) {
  model.deleteFromCart(id);

  Views.Cart.cartItemsView.deleteItem(id);

  Views.Cart.cartFooterView.updateOrRenderFooter(model.totalPriceCart, model.shoppingCart.length);
  if (model.shoppingCart.length === 0) Views.Cart.cartItemsView.renderEmptyState();

  updateCartBadge(model.totalItemInCart);

  updateProductCardButton(id);
}

function handleError(error: unknown) {
  if (error instanceof AppError) {
    switch (error.code) {
      case 'USER_ERROR':
        Views.Notification.showNotification(error.message, 'error');
        break;
      case 'DEV_ERROR':
        console.error(error.message);
        break;
    }
  } else {
    console.error('Unknown error:', error);
  }
}

function updateProductCardButton(id: number) {
  const enrichedProduct = model.getEnrichedProductById(id);
  if (!enrichedProduct) return;
  Views.Product.productListView.updateProductButton(enrichedProduct);
}

function updateCartItemControls(id: number) {
  const cartItem = model.getCartItemById(id);
  if (!cartItem) return;
  Views.Cart.cartItemsView.updateCartItemControls(cartItem);
}

function refreshProductCardControls(ids: number[]) {
  ids.forEach((id) => {
    const enrichedProduct = model.getEnrichedProductById(id);
    if (!enrichedProduct) return;
    Views.Product.productListView.updateProductView(enrichedProduct);
  });
}
