import { Component, OnInit } from '@angular/core';
import {CartService} from "../../services/cart/cart.service";
import {ImageCacheService} from "../../services/image-cache/image-cache.service";

@Component({
  selector: 'aprosag-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(public cartService: CartService, public imageCache: ImageCacheService) { }

  ngOnInit(): void {

  }
}
