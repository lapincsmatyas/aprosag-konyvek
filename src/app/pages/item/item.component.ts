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

@Component({
  selector: 'aprosag-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  faArrowAltCircleLeft = faArrowAltCircleLeft;
  faArrowAltCircleRight = faArrowAltCircleRight;

  public item: Item | undefined;
  public imageUrls: string[] = [];
  public selectedImageIndex = 0;
  amount = 0;

  constructor(private itemService: ItemsService,
              private cartService: CartService,
              private cdRef: ChangeDetectorRef,
              private toastr: ToastrService,
              private activatedRoute: ActivatedRoute) {

    this.activatedRoute.params.subscribe(params => {
      this.itemService.getItemById(params['id']).subscribe(item => {
        this.item = item;
      })
    });
  }

  ngOnInit(): void {

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
      this.toastr.success(`Sikeresen hozzáadtál ${this.amount} terméket a kosárhoz!`);
      this.amount = 0;
    }
  }

  amountChanged(amount: number) {
    this.amount = amount;
  }
}
