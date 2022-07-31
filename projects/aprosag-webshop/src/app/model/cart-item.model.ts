export interface ShippingType {
  id: string,
  name: string,
  price: number,
  description?: string,
}

export interface PaymentType {
  name: string;
  description: string;
}
