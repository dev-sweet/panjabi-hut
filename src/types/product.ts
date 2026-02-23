export interface Product {
  id: string;
  name: string;
  basePrice: number;
  sellingPrice?: number | null;
  description: string;

  sku: string;
  image: string;

  isTrending: boolean;
  isPremium: boolean;
  isNew: boolean;
  isEidCollection: boolean;

  createdAt: Date;
  updatedAt: Date;

  createdBy?: string | null;
  updatedBy?: string | null;
}
