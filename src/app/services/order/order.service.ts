import {Injectable} from '@angular/core';
import {Order, OrderState, PaymentType} from "../../model/order.model";
import {addDoc, collection, collectionData, Firestore, query, where} from "@angular/fire/firestore";
import {CollectionReference, Timestamp} from "@firebase/firestore";
import {User} from "../../model/user.model";
import {CartService} from "../cart/cart.service";
import {UserDto} from "../../model/dto/user.dto";
import {UserService} from "../user/user.service";
import {throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private collection: CollectionReference<Order>;

  paymentTypes: PaymentType[];

  selectedPaymentType: PaymentType;

  constructor(private fireStore: Firestore,
              private cartService: CartService,
              private userService: UserService) {
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

  placeOrder(user: User, comment: string) {
    if (this.cartService.count == 0 || !this.cartService.selectedShippingType)
      return;

    const date = new Date();
    const randomId = Math.floor(Math.random() * 100) + 100;
    const orderNumber =
      date.getFullYear().toString().slice(-2) + '' +
      ('00' + date.getMonth().toString()).slice(-2) + '' +
      ('00' + date.getDate().toString()).slice(-2) + '' +
      ('00' + date.getHours().toString()).slice(-2) + '' +
      ('00' + date.getMinutes().toString()).slice(-2) + '' +
      date.getMilliseconds().toString().slice(-2) + '' +
      randomId;

    return addDoc(this.collection, {
      user,
      orderNumber: +orderNumber,
      date: Timestamp.fromDate(new Date()),
      state: OrderState.SENT,
      price: this.cartService.value + this.cartService.selectedShippingType.value,
      cart: this.cartService.items,
      shippingType: this.cartService.selectedShippingType,
      paymentType: this.selectedPaymentType
    }).then((result) => {
      return new Promise((resolve) => setTimeout(resolve, 2000))
    })
      .then((result) => {
        this.cartService.emptyCart();
        this.cartService.selectedShippingType = null;
        return orderNumber;
      });
  }

  getOrders() {
    if (this.userService.user.value) {
      const q = query(this.collection, where("user.profile.uid", "==", this.userService.user.value.uid));
      return collectionData(q, {idField: "orderId"});
    } else {
      throw throwError('User not found');
    }
  }
}
