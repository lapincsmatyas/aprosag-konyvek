import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {canActivate, redirectLoggedInTo, redirectUnauthorizedTo} from "@angular/fire/auth-guard";
import {ProfileComponent} from "./profile.component";
import {PersonalDataComponent} from "./pages/personal-data/personal-data.component";
import {OrdersComponent} from "./pages/orders/orders.component";
import {FavoritesComponent} from "./pages/favorites/favorites.component";

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['auth/login']);

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    ...canActivate(redirectUnauthorizedToLogin),
    children: [
      {path: '', redirectTo: 'personal-data', pathMatch: 'full'},
      {path: 'personal-data', component: PersonalDataComponent},
      {path: 'orders', component: OrdersComponent},
      {path: 'favorites', component: FavoritesComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule {
}
