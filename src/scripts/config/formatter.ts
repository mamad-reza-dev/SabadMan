import type { ProductItemType } from '../types/';

export function formatProductData(apiData: any[]): Array<ProductItemType> {
  return apiData.map((item) => ({
    id: Number(item.id),
    title: item.title?.trim(),
    price: Number(item.price),
    description: item.description || 'توضیحی برای این محصول موجود نیست.',
    category: item.category || 'دسته بندی نشده',
    stock: Number(item.stock) || 0,
    imageUrl: item.image_url,
  }));
}
