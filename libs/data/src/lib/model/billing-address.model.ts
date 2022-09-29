export interface BillingAddress {
  firstName: string;
  lastName: string;
  companyName?: string;
  taxNumber?: string;
  country: string;
  city: string;
  address: string;
  zipCode: string;
  emailAddress: string;
  phoneNumber?: string;
  comment?: string;
}
