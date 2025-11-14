import type { CartItemType, EnrichedProductType, ProductItemType } from './types';

import { fetchData } from './utils';
import { formatProductData } from './config';

class Model {
  private _products: Array<ProductItemType> = [];
  private _shoppingCart: Array<CartItemType> = [];

  async fetchAllProducts() {
    const rawData = await fetchData<{ products: Array<ProductItemType> }>('/db.json');
    const formatData = formatProductData(rawData.products);
    this._products = formatData;
  }

  get products() {
    return this._products;
  }

  get shoppingCart() {
    return this._shoppingCart;
  }

  get totalItemInCart() {
    return this._shoppingCart.reduce((acc, item) => acc + item.quantityInCart, 0);
  }

  get totalPriceCart() {
    return this._shoppingCart.reduce((acc, item) => acc + item.price * item.quantityInCart, 0);
  }

  get enrichedProducts(): Array<EnrichedProductType> {
    return this._products.map((product) => {
      const cartItem = this._shoppingCart.find((cartItem) => cartItem.id === product.id);
      return {
        ...product,
        quantityInCart: cartItem ? cartItem.quantityInCart : 0,
        isInCart: Boolean(cartItem),
      };
    });
  }

  getEnrichedProductById(id: number): EnrichedProductType | null {
    const product = this._products.find((p) => p.id === id);
    if (!product) return null;
    const cartItem = this._shoppingCart.find((c) => c.id === id);

    return {
      ...product,
      quantityInCart: cartItem ? cartItem.quantityInCart : 0,
      isInCart: Boolean(cartItem),
    };
  }

  getCartItemById(id: number) {
    return this._shoppingCart.find((item) => item.id === id);
  }

  addToCart(productId: number): CartItemType | null {
    const product = this.products.find((p) => p.id === productId);
    if (!product) return null;

    const existing = this._shoppingCart.find((item) => item.id === productId);
    if (existing) {
      existing.quantityInCart += 1;
      return existing;
    }

    const newShoppingCartItem: CartItemType = {
      id: product.id,
      imageUrl: product.imageUrl,
      title: product.title,
      price: product.price,
      stock: product.stock,
      quantityInCart: 1,
    };

    this._shoppingCart.push(newShoppingCartItem);
    return newShoppingCartItem;
  }

  deleteFromCart(productId: number) {
    const deleteItemIndex = this._shoppingCart.findIndex((item) => item.id === productId);
    if (deleteItemIndex === -1) return;
    this._shoppingCart.splice(deleteItemIndex, 1);
  }

  updateCartItemCount(productId: number, delta: number): boolean {
    const item = this._shoppingCart.find((i) => i.id === productId);
    if (!item) return false;

    const newQuantityInCart = item.quantityInCart + delta;

    if (newQuantityInCart < 1 || newQuantityInCart > item.stock) return false;

    if (newQuantityInCart !== item.quantityInCart) {
      item.quantityInCart = newQuantityInCart;
      return true;
    }

    return false;
  }

  checkoutCart() {
    const newProductList = this._products.map((productItem) => {
      const shoppingCartItem = this._shoppingCart.find(
        (cartItem) => cartItem.id === productItem.id
      );
      if (!shoppingCartItem) return productItem;
      return {
        ...productItem,
        stock: productItem.stock - shoppingCartItem.quantityInCart,
      };
    });
    this._products = newProductList;
    this._shoppingCart = [];
  }
}

export const model = new Model();
