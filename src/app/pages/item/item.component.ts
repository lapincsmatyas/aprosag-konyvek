import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ItemsService} from "../../services/item/items.service";
import {ActivatedRoute} from "@angular/router";
import {map, switchMap} from "rxjs/operators";
import {Observable} from "rxjs";
import firebase from "firebase/compat";
import {Item} from "../../model/item.model";
import {ImageCacheService} from "../../services/image-cache/image-cache.service";
import {faArrowAltCircleLeft, faArrowAltCircleRight} from '@fortawesome/free-regular-svg-icons';
import {CartService} from "../../services/cart/cart.service";
import {ToastrService} from "ngx-toastr";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AddedToCartComponent} from "../../shared/popups/added-to-cart/added-to-cart.component";
import {UserService} from "../../services/user/user.service";

@Component({
  selector: 'aprosag-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent {
  faArrowAltCircleLeft = faArrowAltCircleLeft;
  faArrowAltCircleRight = faArrowAltCircleRight;

  public item: Item | undefined;
  public selectedImageIndex = 0;
  amount = 1;

  constructor(private itemService: ItemsService,
              private cartService: CartService,
              private modalService: NgbModal,
              private cdRef: ChangeDetectorRef,
              private toastr: ToastrService,
              private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe(params => {
      this.item = this.itemService.getItemById(params['id']);
    });
  }

  selectImage(i: number) {
    this.selectedImageIndex = i;
  }

  nextImage() {
    this.selectedImageIndex++;
    console.log(this.selectedImageIndex)
    if (this.selectedImageIndex >= (this.item?.image_urls ? this.item?.image_urls.length : 0))
      this.selectedImageIndex = 0;
  }

  previousImage() {
    this.selectedImageIndex--;
    if (this.selectedImageIndex < 0)
      this.selectedImageIndex = (this.item?.image_urls ? this.item?.image_urls.length - 1 : 0);
  }

  addItemToCart() {
    if (this.item) {
      this.cartService.addItemToCart(this.item, this.amount);

      const modalRef = this.modalService.open(AddedToCartComponent, {
        backdrop: true,
        backdropClass: 'modal-dialog-backdrop',
        modalDialogClass: 'modal-dialog-centered added-to-cart-dialog'
      });
      modalRef.componentInstance.item = this.item;
      modalRef.componentInstance.amount = this.amount;

      this.amount = 1;
    }
  }

  amountChanged(amount: number) {
    this.amount = amount;
  }
}
