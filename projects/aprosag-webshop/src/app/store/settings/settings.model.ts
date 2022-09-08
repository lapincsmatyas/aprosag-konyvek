import {PaymentType, ShippingType} from "../../model/cart-item.model";
import {SliderImage} from "../../shared/components/gallery/gallery.component";

export interface Settings{
  shippingTypes: ShippingType[],
  paymentTypes: PaymentType[],
  sliderImages: SliderImage[]
}
