import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {WhyIsItSpecialComponent} from "./why-is-it-special.component";

const routes: Routes = [
  { path: '', component: WhyIsItSpecialComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WhyIsItSpecialRoutingModule { }
