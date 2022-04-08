import { Component, OnInit } from '@angular/core';
import {ItemsService} from "../../services/item/items.service";
import {Observable} from "rxjs";
import {Item} from "../../model/item.model";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'aprosag-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent{

  sliderImages: string[] = [
    'Product_1/4.jpg',
    'Product_2/4.jpg',
    'Product_3/4.jpg',
    'Product_4/4.jpg',
  ];

  actImage: number = 0;

  public items: Item[] = [];

  constructor(public itemsService: ItemsService) {
    itemsService.items.subscribe((items) => {
      this.items = items;
    })
  }

  nextImage(){
    this.actImage++;
    if(this.actImage >= this.sliderImages.length){
      this.actImage = 0;
    }
  }

  prevImage(){
    this.actImage--;
    if(this.actImage < 0){
      this.actImage = this.sliderImages.length - 1;
    }
  }

}
