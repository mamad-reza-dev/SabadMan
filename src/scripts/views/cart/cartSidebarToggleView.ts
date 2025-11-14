import { InteractiveView } from '../InteractiveView';
import type { InteractiveViewConfigType } from '../../types';

export class CartSidebarToggleView extends InteractiveView {
  constructor(config: InteractiveViewConfigType) {
    super(config);
  }
}

const CartSidebarToggleViewConfig: InteractiveViewConfigType = {
  activeClassName: 'sidebar--open',
  parentSelector: '#cart-sidebar',
  triggerSelectors: ['#open-cart-sidebar', '#close-cart-sidebar', '#overlay'],
  linkedSelectors: [
    {
      activeClassName: 'overlay--hidden',
      selector: '#overlay',
    },
  ],
};

export const cartSidebarToggleView = new CartSidebarToggleView(CartSidebarToggleViewConfig);
