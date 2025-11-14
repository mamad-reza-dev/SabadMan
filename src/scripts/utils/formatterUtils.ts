export function formatPrice(price: number, currency: string = 'ریال') {
  const number = new Intl.NumberFormat('fa-IR').format(price);
  return `${number} ${currency}`;
}
