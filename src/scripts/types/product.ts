export type ProductItemType = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  stock: number;
  imageUrl: string;
};

export type EnrichedProductType = ProductItemType & {
  isInCart: boolean;
  quantityInCart: number;
};
