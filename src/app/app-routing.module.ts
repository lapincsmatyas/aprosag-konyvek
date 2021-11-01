import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ItemsComponent} from "./pages/items/items.component";
import {AboutUsComponent} from "./pages/about-us/about-us.component";
import {ContactsComponent} from "./pages/contacts/contacts.component";
import {WhyIsItSpecialComponent} from "./pages/why-is-it-special/why-is-it-special.component";

const routes: Routes = [
  {path: 'items', component: ItemsComponent},
  {path: 'about-us', component: AboutUsComponent},
  {path: 'contacts', component: ContactsComponent},
  {path: 'why-is-it-special', component: WhyIsItSpecialComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
