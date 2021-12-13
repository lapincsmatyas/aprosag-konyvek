import {Component, OnInit} from '@angular/core';
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
              private imageCache: ImageCacheService,
              private toastr: ToastrService,
              private activatedRoute: ActivatedRoute) {

    this.activatedRoute.params.pipe(
      switchMap((params) => {
        return this.itemService.getItemById(params['id'])
      }),
      map((item: Item) => {
        item.image_urls?.forEach((imageUrl) => {
          this.imageCache.getImage(imageUrl).then((url) => {
            this.imageUrls.push(url);
          })
        })
        console.log(item);
        this.item = item;
      })).subscribe();
  }

  ngOnInit(): void {

  }

  selectImage(i: number) {
    this.selectedImageIndex = i;
  }

  nextImage() {
    this.selectedImageIndex++;
    if (this.selectedImageIndex >= this.imageUrls.length)
      this.selectedImageIndex = 0;
  }

  previousImage() {
    this.selectedImageIndex--;
    if (this.selectedImageIndex < 0)
      this.selectedImageIndex = this.imageUrls.length - 1;
  }

  changeAmount(number: number) {
    this.amount += number;

    if (this.amount < 0)
      this.amount = 0;
  }

  addItemToCart() {
    if (this.item) {
      this.cartService.addItemToCart(this.item, this.amount);
      this.toastr.success(`Sikeresen hozzáadtál ${this.amount} terméket a kosárhoz!`);
      this.amount = 0;
    }
  }
}
