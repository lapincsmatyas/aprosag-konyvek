import {Injectable} from '@angular/core';
import {Order, OrderState, PaymentType} from "../../model/order.model";
import {addDoc, collection, collectionData, Firestore, query, where} from "@angular/fire/firestore";
import {CollectionReference, Timestamp} from "@firebase/firestore";
import {User} from "../../model/user.model";
import {CartService} from "../cart/cart.service";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private collection: CollectionReference<Order>;

  paymentTypes: PaymentType[];

  selectedPaymentType: PaymentType;

  constructor(private fireStore: Firestore, private cartService: CartService) {
    this.paymentTypes = [{
      name: "Banki átutalás",
      description: "OTP Bank (SWIFT/BIC köd: OTPVHUHB)\n" +
        "Horváth Áron Ferenc\n" +
        "11773377-00530167 (Nemzetközi utalásnál IBAN kód: HU11 11773377 00530167 00000000)\n" +
        "Közlemény rovatba kérjük tüntesd fel a rendelésszámot.\n" +
        "Ezeket az adatokat elküldjük neked emailben is!"
    }, {
      name: "Utánvét",
      description: "Jelenleg csak személyes átvételnél választható!\n"
    }];
    this.selectedPaymentType = this.paymentTypes[0];

    this.collection = collection(this.fireStore, 'orders');
  }

  placeOrder(user: User) {
    if(this.cartService.count == 0)
      return;

    return addDoc(this.collection, {
      user,
      date: Timestamp.fromDate(new Date()),
      state: OrderState.SENT,
      price: this.cartService.value + this.cartService.selectedShippingType.value,
      cart: this.cartService.items,
      shippingType: this.cartService.selectedShippingType,
      paymentType: this.selectedPaymentType
    }).then((result) => {
      this.cartService.emptyCart();
      return result;
    });
  }

  getOrdersForUser(user: User){
    const q = query(this.collection, where("user.uid","==", user.uid));
    return collectionData(q, {idField: "orderNumber"});
  }
}
