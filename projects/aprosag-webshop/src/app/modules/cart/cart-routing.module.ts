import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CartComponent} from "./cart.component";
import {CashDeskComponent} from "./pages/cash-desk/cash-desk.component";
import {CashDeskGuardGuard} from "../../guards/cash-desk-guard.guard";

const routes: Routes = [
  {path: '', component: CartComponent},
  {path: 'cash-desk', component: CashDeskComponent, canActivate: [CashDeskGuardGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartRoutingModule { }
