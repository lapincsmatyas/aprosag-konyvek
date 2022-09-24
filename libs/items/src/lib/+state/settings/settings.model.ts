import {PaymentType, ShippingType} from "../../../../../../apps/aprosag-konyvek/src/app/model/cart-item.model";
import {SliderImage} from "../../../../../../apps/aprosag-konyvek/src/app/shared/components/gallery/gallery.component";

export interface Settings{
  shippingTypes: ShippingType[],
  paymentTypes: PaymentType[],
  sliderImages: SliderImage[]
}
