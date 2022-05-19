import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: 'items', pathMatch: 'full'},

  {path: 'auth', loadChildren: () => import('../authentication/authentication.module').then(m => m.AuthenticationModule)},
  {path: 'cart', loadChildren: () => import('../cart/cart.module').then(m => m.CartModule)},
  {path: 'items', loadChildren: () => import('../items/items.module').then(m => m.ItemsModule)},
  {path: 'about-us', loadChildren: () => import('../about-us/about-us.module').then(m => m.AboutUsModule)},
  {path: 'why-is-it-special', loadChildren: () => import('../why-is-it-special/why-is-it-special.module').then(m => m.WhyIsItSpecialModule)},
  {path: 'contacts', loadChildren: () => import('../contacts/contacts.module').then(m => m.ContactsModule)},
  {path: 'profile', loadChildren: () => import('../profile/profile.module').then(m => m.ProfileModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'top'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
