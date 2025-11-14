import type { InteractiveViewConfigType } from '../../types';

import { InteractiveView } from '../InteractiveView';

type notificationType = 'success' | 'error';
type notificationViewConfigType = InteractiveViewConfigType & {
  duration: number;
};

export class NotificationView extends InteractiveView {
  private duration: number;

  constructor(config: notificationViewConfigType) {
    super({ parentSelector: config.parentSelector, activeClassName: config.activeClassName });
    this.duration = config.duration;
  }

  showNotification(message: string, type: notificationType) {
    this.parentElement.textContent = message;
    this.parentElement.classList.remove('notification--success', 'notification--error');
    this.parentElement.classList.add(`notification--${type}`);

    this.show();

    setTimeout(() => {
      this.hide();
    }, this.duration);
  }
}

const NotificationViewConfig: notificationViewConfigType = {
  parentSelector: '#notification',
  activeClassName: 'notification--show',
  duration: 3000,
};

export const notificationView = new NotificationView(NotificationViewConfig);
