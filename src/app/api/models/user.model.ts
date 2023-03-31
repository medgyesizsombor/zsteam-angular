import { Right } from '../enums/right.enum';

export interface User {
  id?: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  right?: Right;
  postalCode?: string;
  address?: string;
  password?: string;
}
