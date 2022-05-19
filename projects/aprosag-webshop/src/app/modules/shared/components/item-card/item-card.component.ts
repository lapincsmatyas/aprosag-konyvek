import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CartService} from "../../../../services/cart/cart.service";
import {AddedToCartComponent} from "../../popups/added-to-cart/added-to-cart.component";
import {Item} from "../../../../model/item.model";

@Component({
  selector: 'aprosag-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss']
})
export class ItemCardComponent {
  @Input()
  public item: Item;

  constructor(private router: Router,
              private cartService: CartService,
              private modalService: NgbModal) {
    this.item = new Item();
  }

  openItem() {
    this.router.navigate(['/items', this.item.id]);
  }

  addItemToCart() {
    this.cartService.addItemToCart(this.item, 1);

    const modalRef = this.modalService.open(AddedToCartComponent, {
      backdrop: true,
      backdropClass: 'modal-dialog-backdrop',
      modalDialogClass: 'modal-dialog-centered added-to-cart-dialog'
    });
    modalRef.componentInstance.item = this.item;
    modalRef.componentInstance.amount = 1;
  }

}
