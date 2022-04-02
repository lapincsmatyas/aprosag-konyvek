import {Component, Input, OnInit} from '@angular/core';
import {Item} from "../../../model/item.model";
import {ImageCacheService} from "../../../services/image-cache/image-cache.service";
import {of} from "rxjs";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {Router} from "@angular/router";
import {CartService} from "../../../services/cart/cart.service";
import {AddedToCartComponent} from "../../../shared/popups/added-to-cart/added-to-cart.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AuthService} from "../../../services/auth/auth.service";
import {UserService} from "../../../services/user/user.service";

@Component({
  selector: 'aprosag-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss']
})
export class ItemCardComponent implements OnInit {
  @Input()
  public item: Item = {};

  isFavourite = false;

  constructor(private router: Router,
              public userService: UserService,
              private cartService: CartService,
              private modalService: NgbModal) {
  }

  ngOnInit() {
    this.userService.user.subscribe((user) => {
      this.isFavourite = !!user?.favorites?.includes(this.item.id || "");
    })
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

  addItemToFavourites() {
    this.userService.addOrRemoveItemAsFavorite(this.item);
  }
}
