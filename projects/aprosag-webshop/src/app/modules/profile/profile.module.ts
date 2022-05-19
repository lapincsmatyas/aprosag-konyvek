import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import {SharedModule} from "../shared/shared.module";
import {ProfileComponent} from "./profile.component";
import {FavoritesComponent} from "./pages/favorites/favorites.component";
import {OrdersComponent} from "./pages/orders/orders.component";
import {PersonalDataComponent} from "./pages/personal-data/personal-data.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    ProfileComponent,
    FavoritesComponent,
    OrdersComponent,
    PersonalDataComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ProfileRoutingModule,
    SharedModule
  ]
})
export class ProfileModule { }
