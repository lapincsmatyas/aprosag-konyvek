import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ItemsComponent} from "./pages/items/items.component";
import {AboutUsComponent} from "./pages/about-us/about-us.component";
import {ContactsComponent} from "./pages/contacts/contacts.component";
import {WhyIsItSpecialComponent} from "./pages/why-is-it-special/why-is-it-special.component";
import {ItemComponent} from "./pages/item/item.component";
import {LoginComponent} from "./pages/login/login.component";
import {RegisterComponent} from "./pages/register/register.component";
import {canActivate, redirectLoggedInTo, redirectUnauthorizedTo} from "@angular/fire/auth-guard";
import {ProfileComponent} from "./pages/profile/profile.component";
import {CartComponent} from "./pages/cart/cart.component";
import {CashDeskComponent} from "./pages/cash-desk/cash-desk.component";
import {ItemsResolver} from './shared/resolvers/items-resolver.service';
import {CashDeskGuardGuard} from "./shared/guards/cash-desk-guard.guard";
import {PersonalDataComponent} from "./pages/profile/personal-data/personal-data.component";
import {OrdersComponent} from "./pages/profile/orders/orders.component";
import {FavoritesComponent} from "./pages/profile/favorites/favorites.component";
import {ItemResolver} from "./resolvers/item.resolver";

const redirectLoggedInToProfile = () => redirectLoggedInTo(['profile']);
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
  {path: '', redirectTo: 'items', pathMatch: 'full'},
  {
    path: 'items',
    component: ItemsComponent,
    resolve: { items: ItemsResolver }
  },
  {
    path: 'items/:id',
    resolve: { item: ItemResolver },
    component: ItemComponent
  },
  {path: 'cart', component: CartComponent},
  {path: 'cash-desk', component: CashDeskComponent, canActivate: [CashDeskGuardGuard]},
  {path: 'login', component: LoginComponent, ...canActivate(redirectLoggedInToProfile)},
  {
    path: 'profile',
    component: ProfileComponent,
    ...canActivate(redirectUnauthorizedToLogin),
    children: [
      {path: '', redirectTo: 'personal-data', pathMatch: 'full'},
      {path: 'personal-data', component: PersonalDataComponent},
      {path: 'orders', component: OrdersComponent},
      {path: 'favorites', component: FavoritesComponent},
    ]
  },
  {path: 'signup', component: RegisterComponent},
  {path: 'about-us', component: AboutUsComponent},
  {path: 'contacts', component: ContactsComponent},
  {path: 'why-is-it-special', component: WhyIsItSpecialComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'top'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
