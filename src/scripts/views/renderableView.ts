import { selectEl } from '../utils';

export abstract class RenderableView<T> {
  protected state?: T | T[] | null;

  protected parentElement: HTMLElement;

  protected constructor(parentSelector: string) {
    const viewName = this.constructor.name;

    this.parentElement = selectEl(
      parentSelector,
      viewName,
      `Parent element with selector "${parentSelector}" not found.`
    );
  }

  protected setState(data: T | T[] | null) {
    this.state = data;
  }

  protected insert(markup: string, position: InsertPosition = 'afterbegin') {
    this.parentElement.insertAdjacentHTML(position, markup);
  }

  renderData(data: T | T[], markupFn?: (item: T) => string): void {
    const isArray = Array.isArray(data);
    const renderItem = markupFn ?? this.generateMarkup.bind(this);

    if (!data || (isArray && data.length === 0)) {
      this.clear();
      this.insert(this.generateMarkupEmpty());
      return;
    }

    const html = isArray ? data.map(renderItem).join('') : renderItem(data);

    this.clear();
    this.insert(html);
  }

  addItem(item: T, markupFn?: (item: T) => string) {
    const emptyEl = this.parentElement.querySelector('[data-role="empty-state"]');
    if (emptyEl) emptyEl.remove();

    const renderItem = markupFn ?? this.generateMarkup.bind(this);
    const markup = renderItem(item);
    this.insert(markup, 'beforeend');
  }

  renderEmptyState(): void {
    const emptyState = Array.isArray(this.state) ? [] : null;
    this.setState(emptyState);
    const html = this.generateMarkupEmpty();
    this.clear();
    this.insert(html);
  }

  renderLoader(additionalClass = '') {
    const loaderMarkup = `<div class="loader ${additionalClass}"> </div>`;
    this.insert(loaderMarkup);
  }

  protected clear() {
    this.parentElement.innerHTML = '';
  }

  abstract generateMarkup(data: T | T[]): string;
  abstract generateMarkupEmpty(): string;

  static createElementFromHTML(html: string) {
    const temp = document.createElement('div');
    temp.innerHTML = html.trim();
    return temp.firstElementChild;
  }
}
