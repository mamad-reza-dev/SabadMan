export abstract class PureView<T> {
  abstract generateMarkup(data?: T): string;
}
