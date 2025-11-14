import { AppError } from './appError.ts';

export function selectEl(
  selector: string,
  context: string,
  errorMessage: string = `Element '${selector}' not found`
) {
  const el = document.querySelector(selector);
  if (!el) AppError.dev(context, errorMessage);
  return el as HTMLElement;
}

export function selectChildEl(
  root: HTMLElement,
  selector: string,
  context: string,
  errorMessage: string = `Element '${selector}' not found`
) {
  const el = root.querySelector(selector);
  if (!el) AppError.dev(context, errorMessage);
  return el as HTMLElement;
}

export function selectClosestEl(
  root: HTMLElement,
  selector: string,
  context: string,
  errorMessage: string = `Element '${selector}' not found`
) {
  const el = root.closest(selector);
  if (!el) AppError.dev(context, errorMessage);
  return el as HTMLElement;
}

export function selectDataAttr(
  el: HTMLElement,
  attr: string,
  context: string,
  errorMessage: string = `Missing [data-${attr}] attribute on element.`
) {
  const value = el.dataset[attr as keyof DOMStringMap];
  if (!value) AppError.dev(context, errorMessage);
  return value as string;
}
