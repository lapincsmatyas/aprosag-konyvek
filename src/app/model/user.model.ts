import {Roles} from "./roles.model";

export interface User {
  uid?: string | null;
  email?: string | null;
  roles?: Roles;
}
