import {Component, ElementRef, NgModule} from '@angular/core';
import {CartService} from "../../../../services/cart/cart.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";

import { faTimesCircle} from "@fortawesome/free-regular-svg-icons";
import {CartItem} from "../../../../model/cart-item.model";
import {ConfirmationComponent} from "../../../popups/confirmation/confirmation.component";

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
              private activatedModal: NgbActiveModal,
              private modalService: NgbModal) { }

  openCart() {
    this.activatedModal.close();
    this.router.navigateByUrl('cart');
  }

  deleteItemFromCart(item: CartItem) {
    let modalRef = this.modalService.open(ConfirmationComponent, {
      backdropClass: 'modal-dialog-backdrop',
      modalDialogClass: 'modal-dialog-centered'
    });
    modalRef.componentInstance.text = "Biztos törlöd a terméket a kosárból?";
    modalRef.closed.subscribe(result => {
      if(!result) return;
      this.cartService.removeAllOfTypeFromCart(item);
    })
  }
}
