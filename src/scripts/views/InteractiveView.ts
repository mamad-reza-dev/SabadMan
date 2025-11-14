import type { InteractiveViewConfigType, LinkedElementType } from '../types/';

import { selectEl } from '../utils';

export abstract class InteractiveView {
  protected parentElement: HTMLElement;
  protected linkedElements: LinkedElementType[] = [];
  protected triggers: HTMLElement[] = [];
  protected activeClassName: string;

  protected constructor({
    parentSelector,
    activeClassName = 'active',
    triggerSelectors = [],
    linkedSelectors = [],
  }: InteractiveViewConfigType) {
    const viewName = this.constructor.name;

    // Parent
    this.parentElement = selectEl(
      parentSelector,
      viewName,
      `Parent element "${parentSelector}" not found.`
    );

    this.activeClassName = activeClassName;

    // Triggers
    this.triggers = triggerSelectors.map((selector) =>
      selectEl(selector, viewName, `Trigger "${selector}" not found.`)
    );

    // Linked elements
    this.linkedElements = linkedSelectors.map(({ selector, activeClassName }) => ({
      element: selectEl(selector, viewName, `Linked element "${selector}" not found.`),
      activeClassName,
    }));

    this.addTriggerListeners();
  }

  private addTriggerListeners() {
    this.triggers.forEach((trigger) => trigger.addEventListener('click', () => this.toggle()));
  }

  show(): void {
    this.parentElement.classList.add(this.activeClassName);
    this.linkedElements.forEach(({ element, activeClassName }) =>
      element.classList.remove(activeClassName)
    );
  }

  hide(): void {
    this.parentElement.classList.remove(this.activeClassName);
    this.linkedElements.forEach(({ element, activeClassName }) =>
      element.classList.add(activeClassName)
    );
  }

  toggle(): void {
    const isActive = this.parentElement.classList.toggle(this.activeClassName);

    this.linkedElements.forEach(({ element, activeClassName }) =>
      element.classList.toggle(activeClassName, !isActive)
    );
  }
}
