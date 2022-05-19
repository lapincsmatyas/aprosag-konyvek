import { Component } from '@angular/core';
import {CartService} from "../../services/cart/cart.service";
import {ActivatedRoute, Router} from "@angular/router";

import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ConfirmationComponent} from "../shared/popups/confirmation/confirmation.component";
import firebase from "firebase/compat";
import Item = firebase.analytics.Item;
import {CartItem} from "../../model/cart-item.model";

@Component({
  selector: 'aprosag-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent  {
  constructor(public cartService: CartService,
              private router: Router,
              private route: ActivatedRoute,
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
    this.router.navigate(["cash-desk"], { relativeTo: this.route});
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
