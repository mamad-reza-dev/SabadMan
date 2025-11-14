export type InteractiveViewConfigType = {
  parentSelector: string;
  activeClassName?: string;
  triggerSelectors?: string[];
  linkedSelectors?: LinkedSelectorType[];
};

export type LinkedElementType = {
  element: HTMLElement;
  activeClassName: string;
};

export type LinkedSelectorType = {
  selector: string;
  activeClassName: string;
};
