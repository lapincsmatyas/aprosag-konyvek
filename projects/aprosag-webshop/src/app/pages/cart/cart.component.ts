import {Component} from '@angular/core';
import {CartService} from "../../services/cart/cart.service";
import {ImageCacheService} from "../../services/image-cache/image-cache.service";
import {DeprecatedCartItem} from "../../model/cart-item.model";
import {Router} from "@angular/router";

import {faTimesCircle} from "@fortawesome/free-solid-svg-icons";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {ConfirmationComponent} from "../../shared/popups/confirmation/confirmation.component";
import firebase from "firebase/compat";
import {Item} from "../../store/item/item.model";

@Component({
  selector: 'aprosag-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  constructor(public cartService: CartService,
              private router: Router,
              private modalService: NgbModal) {
  }

  removeItemFromCart(item: Item) {
    let modalRef = this.modalService.open(ConfirmationComponent, {
      backdropClass: 'modal-dialog-backdrop',
      modalDialogClass: 'modal-dialog-centered'
    });
    modalRef.componentInstance.text = "Biztos törölni szeretnéd a terméket a kosárból?";
    modalRef.closed.subscribe(result => {
      if(!result) return;
      this.cartService.removeItemFromCart(item);
    })
  }

  goToDesk() {
    this.router.navigateByUrl("cash-desk");
  }

  amountChanged(item: Item, amount: number) {
    this.cartService.changeItemAmount(item, amount);
  }

  continueShopping() {
    this.router.navigateByUrl("items");
  }

  openItemPage(item: Item) {
    this.router.navigateByUrl(`items/${item.id}`)
  }
}
