import {Component, Input, OnInit} from '@angular/core';
import {Item} from "../../../model/item.model";
import {ImageCacheService} from "../../../services/image-cache/image-cache.service";
import {of} from "rxjs";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {Router} from "@angular/router";

@Component({
  selector: 'aprosag-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss']
})
export class ItemCardComponent implements OnInit{
  @Input()
  public item: Item = {};

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  openItem() {
    this.router.navigate(['/items',this.item.id]);
  }
}
