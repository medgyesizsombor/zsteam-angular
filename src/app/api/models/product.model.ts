import { Category } from '../enums/category.enum';
import { Storage as StorageEnum } from '../enums/storage.enum';

export interface Product {
  id?: string;
  name?: string;
  price?: string;
  category?: Category;
  storage?: StorageEnum;
}
