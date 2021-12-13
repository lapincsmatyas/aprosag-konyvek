import {Component, ElementRef, NgModule, OnInit} from '@angular/core';
import {CartService} from "../../../services/cart/cart.service";
import {Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'aprosag-cart-modal',
  templateUrl: './cart-modal.component.html',
  styleUrls: ['./cart-modal.component.scss']
})
export class CartModalComponent implements OnInit {

  constructor(public cartService: CartService, private router: Router, private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  openCart() {
    //TODO: solve with self reference modal
    this.modalService.dismissAll();
    this.router.navigateByUrl('cart');
  }
}
