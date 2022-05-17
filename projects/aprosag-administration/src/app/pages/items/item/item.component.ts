import {Component, Input, EventEmitter, OnInit, Output} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Item} from "../../../model/item.model";
import {ItemsService} from "../../../services/items.service";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  @Input()
  item: Item;

  @Output()
  newItem = new EventEmitter<Item>();

  itemForm: FormGroup | null = null;

  constructor(private route: ActivatedRoute, private itemService: ItemsService, private formBuilder: FormBuilder) {
    this.item = new Item();
  }

  ngOnInit(): void {
    this.itemForm = this.formBuilder.group({
      title: [this.item.title],
      subtitle: [this.item.subtitle],
      description: [this.item.description],
      price: [this.item.price],
      discount_price: [this.item.discount_price],
      discount_percentage: [this.item.discount_percentage],
      isbn: [this.item.ISBN],
      cover_type: [this.item.cover_type],
      page_count: [this.item.page_count],
      publication_date: [this.item.publication_date],
      weight: [this.item.weight],
      image_urls: [this.item.image_urls]
  })
  };

  saveItem() {
    this.newItem.next({...this.itemForm?.value, id: this.item.id});
  }

  deleteItem() {
    console.log("törlés");
  }
}
