import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OrdersComponent} from "./pages/orders/orders.component";
import {UsersComponent} from "./pages/users/users.component";
import {ItemsComponent} from "./pages/items/items.component";
import {NewsletterComponent} from "./pages/newsletter/newsletter.component";
import {OrderComponent} from "./pages/orders/order/order.component";

const routes: Routes = [
  { path: 'items', component: ItemsComponent},
  {path: 'orders', component: OrdersComponent},
  {path: 'orders/:id', component: OrderComponent},
  {path: 'users', component: UsersComponent},
  {path: 'newsletter', component: NewsletterComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
