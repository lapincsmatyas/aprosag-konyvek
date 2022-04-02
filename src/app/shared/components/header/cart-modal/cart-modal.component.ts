import {Component, ElementRef, NgModule} from '@angular/core';
import {CartService} from "../../../../services/cart/cart.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

import { faTimesCircle} from "@fortawesome/free-regular-svg-icons";
import {CartItem} from "../../../../model/cart-item.model";

@Component({
  selector: 'aprosag-cart-modal',
  templateUrl: './cart-modal.component.html',
  styleUrls: ['./cart-modal.component.scss']
})
export class CartModalComponent  {
  faTimesCircle = faTimesCircle;

  constructor(public cartService: CartService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private modalService: NgbModal) { }

  openCart() {
    //TODO: solve with self reference modal
    this.modalService.dismissAll();
    this.router.navigateByUrl('cart');
  }

  deleteItemFromCart(item: CartItem) {
    this.cartService.removeAllOfTypeFromCart(item);
    if(this.cartService.count == 0){
      this.router.navigateByUrl('items');
    }
  }
}
