import { Component, OnInit } from '@angular/core';
import {ItemsService} from "../../services/items.service";
import {ActivatedRoute} from "@angular/router";
import {map, switchMap} from "rxjs/operators";
import {Observable} from "rxjs";
import firebase from "firebase/compat";
import {Item} from "../../model/item.model";
import {ImageCacheService} from "../../services/image-cache/image-cache.service";
import { faArrowAltCircleLeft, faArrowAltCircleRight } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'aprosag-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  faArrowAltCircleLeft = faArrowAltCircleLeft;
  faArrowAltCircleRight = faArrowAltCircleRight;

  public item$: Observable<Item>;
  public imageUrls: string[] = [];
  public selectedImageIndex = 0;

  constructor(private itemService: ItemsService, private imageCache: ImageCacheService, private activatedRoute: ActivatedRoute) {
    this.item$ = this.activatedRoute.params.pipe(
      switchMap((params) => {
        return this.itemService.getItemById(params['id'])
      }),
      map((item: Item) => {
        item.image_urls?.forEach((imageUrl) => {
          this.imageCache.getImage(imageUrl).then((url) => {
            this.imageUrls.push(url);
          })
        })
        return item;
      })
    );
  }

  ngOnInit(): void {

  }

  selectImage(i: number) {
    this.selectedImageIndex = i;
  }

  nextImage() {
    this.selectedImageIndex++;
    if(this.selectedImageIndex >= this.imageUrls.length)
      this.selectedImageIndex = 0;
  }

  previousImage() {
    this.selectedImageIndex--;
    if(this.selectedImageIndex < 0)
      this.selectedImageIndex = this.imageUrls.length - 1;
  }
}
