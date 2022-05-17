import { Component } from '@angular/core';
import {CartService} from "../../services/cart/cart.service";
import {ImageCacheService} from "../../services/image-cache/image-cache.service";
import {CartItem} from "../../model/cart-item.model";
import {Router} from "@angular/router";

import {faTimesCircle} from "@fortawesome/free-solid-svg-icons";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {ConfirmationComponent} from "../../shared/popups/confirmation/confirmation.component";
import firebase from "firebase/compat";
import Item = firebase.analytics.Item;

@Component({
  selector: 'aprosag-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent  {
  faTimesCircle = faTimesCircle;

  constructor(public cartService: CartService,
              public imageCache: ImageCacheService,
              private router: Router,
              private modalService: NgbModal) { }

  removeItemFromCart(item: CartItem) {
    let modalRef = this.modalService.open(ConfirmationComponent, {
      backdropClass: 'modal-dialog-backdrop',
      modalDialogClass: 'modal-dialog-centered'
    });
    modalRef.componentInstance.text = "Biztos törölni szeretnéd a terméket a kosárból?";
    modalRef.closed.subscribe(result => {
      if(!result) return;

      this.cartService.removeAllOfTypeFromCart(item);
    })
  }

  goToDesk() {
    this.router.navigateByUrl("cash-desk");
  }

  amountChanged(newValue: number, item: CartItem | null) {
    if(!item)
      return;

    if(item.amount > newValue){
      this.cartService.removeItemCart(item);
    } else if(item.amount < newValue) {
      this.cartService.addItemToCart(item.item, 1);
    }
  }

  continueShopping() {
    this.router.navigateByUrl("items");
  }

  openItemPage(item: Item) {
    this.router.navigateByUrl(`items/${item.id}`)
  }
}
