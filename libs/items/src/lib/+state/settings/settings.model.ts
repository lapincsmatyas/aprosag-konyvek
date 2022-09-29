import {PaymentType, ShippingType, SliderImage} from "data";

export interface Settings{
  shippingTypes: ShippingType[],
  paymentTypes: PaymentType[],
  sliderImages: SliderImage[]
}
