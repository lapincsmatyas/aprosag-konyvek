import {Roles} from "./roles.model";
import {CartItem} from "../store/cart/cart.model";

export class User {
  uid: string = "";
  email: string = "";
  roles: Roles = {user: true};
  password: string = "";
  username: string = "";
  lastName: string = "";
  firstName: string = "";
  companyName: string = "";
  taxNumber: string = "";
  country: string = "";
  city: string = "";
  address: string = "";
  zipCode: string = "";
  phoneNumber: string = "";
  emailVerified: boolean = false;
  favorites: string[] = [];
  cart: CartItem[] = [];
}
