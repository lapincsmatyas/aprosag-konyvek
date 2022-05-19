import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ItemsComponent} from "./items.component";
import {ItemComponent} from "./pages/item/item.component";

const routes: Routes = [
  {path: '', component: ItemsComponent},
  {path: ':id', component: ItemComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemsRoutingModule { }
