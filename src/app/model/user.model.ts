import {Roles} from "./roles.model";

export interface User {
  uid?: string | null;
  email?: string | null;
  roles?: Roles;
  password?: string | null;
  username?: string | null;
  lastName?: string | null;
  firstName?: string | null;
  companyName?: string | null;
  taxNumber?: string | null;
  country?: string | null;
  city?: string | null;
  address?: string | null;
  zipCode?: string | null;
  phoneNumber?: string | null;
  emailVerified?: boolean | null;
}