import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AddedToCartComponent} from "./popups/added-to-cart/added-to-cart.component";
import {SwiperModule} from "swiper/angular";
import {StepperComponent} from "./components/stepper/stepper.component";
import {FavoriteComponent} from "./components/favorite/favorite.component";
import {ItemCardComponent} from "./components/item-card/item-card.component";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {ConfirmationComponent} from "./popups/confirmation/confirmation.component";
import {SuccessfulOrderComponent} from "./popups/successful-order/successful-order.component";
import {CartModalComponent} from "../app/components/header/cart-modal/cart-modal.component";
import {NewsletterComponent} from "./components/newsletter/newsletter.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

const COMPONENTS = [
  ItemCardComponent,
  AddedToCartComponent,
  StepperComponent,
  FavoriteComponent,
  AddedToCartComponent,
  ConfirmationComponent,
  CartModalComponent,
  NewsletterComponent,
  SuccessfulOrderComponent,
];

const MODULES = [
  SwiperModule,
  FontAwesomeModule,
  FormsModule,
  ReactiveFormsModule
];

@NgModule({
  declarations: [
    ...COMPONENTS,
  ],
  imports: [
    CommonModule,
    ...MODULES
  ],
  exports: [
    ...COMPONENTS,
    ...MODULES
  ]
})
export class SharedModule { }
