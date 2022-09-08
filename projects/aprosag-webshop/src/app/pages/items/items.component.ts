import { Component, OnInit } from '@angular/core';
import {ItemsService} from "../../services/item/items.service";
import {Observable} from "rxjs";
import {DeprecatedItem} from "../../model/item.model";
import {ActivatedRoute} from "@angular/router";
import {ItemRepository} from "../../services/item/item.repository";
import {Item} from "../../store/item/item.model";
import {SliderImage} from "./gallery/gallery.component";

@Component({
  selector: 'aprosag-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit{
  sliderImages: SliderImage[] =  [
    {src: 'assets/Slider/Slider_1.jpg', url: '/items/JTr5jLNLKU4n14BWyjtG'},
    {src: 'assets/Slider/Slider_2.jpg', url: '/items/6D55n8mtvHT2EKDzQTkn'},
    {src: 'assets/Slider/Slider_3.jpg', site: 'https://www.udvarbongeszo.aprosagkonyvek.hu/'},
    {src: 'assets/Slider/Slider_4.jpg', site: 'https://www.udvarbongeszo.aprosagkonyvek.hu/'}
  ];

  public items$: Observable<Item[]> = this.itemRepository.getItems$();

  constructor(private itemRepository: ItemRepository) {
  }

  ngOnInit() {
  }
}
