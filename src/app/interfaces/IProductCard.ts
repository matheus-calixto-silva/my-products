import { IProduct } from './IProduct';

export interface IProductCard {
  product: IProduct;
  onDelete: (id: string) => void;
}
