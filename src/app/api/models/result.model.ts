import { Product } from './product.model';
import { User } from './user.model';

export interface Result {
  data?: Array<User> | User | Product | Array<Product> | boolean;
  message?: string;
}
