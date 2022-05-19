import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import {SharedModule} from "../shared/shared.module";
import {ShippingOptionsComponent} from "./components/shipping-options/shipping-options.component";
import {CashDeskComponent} from "./pages/cash-desk/cash-desk.component";
import {PaymentOptionsComponent} from "./pages/cash-desk/payment-options/payment-options.component";
import {MatStepperModule} from "@angular/material/stepper";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CartComponent} from "./cart.component";

@NgModule({
  declarations: [
    ShippingOptionsComponent,
    CashDeskComponent,
    PaymentOptionsComponent,
    CartComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatStepperModule,
    CartRoutingModule
  ]
})
export class CartModule { }
