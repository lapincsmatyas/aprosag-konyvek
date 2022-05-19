import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WhyIsItSpecialRoutingModule } from './why-is-it-special-routing.module';
import {WhyIsItSpecialComponent} from "./why-is-it-special.component";

@NgModule({
  declarations: [
    WhyIsItSpecialComponent
  ],
  imports: [
    CommonModule,
    WhyIsItSpecialRoutingModule
  ]
})
export class WhyIsItSpecialModule { }
