import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
import {ItemsResolverResolver} from "./shared/resolvers/items-resolver.resolver";

const redirectLoggedInToProfile = () => redirectLoggedInTo(['profile']);
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
  {path: '', redirectTo: 'items', pathMatch: 'full', resolve: {items: ItemsResolverResolver}},
  {path: 'items', component: ItemsComponent, resolve: {items: ItemsResolverResolver}},
  {path: 'items/:id', component: ItemComponent},
  {path: 'cart', component: CartComponent},
  {path: 'cash-desk', component: CashDeskComponent},
  {path: 'login', component: LoginComponent, ...canActivate(redirectLoggedInToProfile)},
  {path: 'profile', component: ProfileComponent, ...canActivate(redirectUnauthorizedToLogin)},
  {path: 'signup', component: RegisterComponent},
  {path: 'about-us', component: AboutUsComponent},
  {path: 'contacts', component: ContactsComponent},
  {path: 'why-is-it-special', component: WhyIsItSpecialComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
