import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { UsersComponent } from './pages/users/users.component';
import { ItemsComponent } from './pages/items/items.component';
import { NewsletterComponent } from './pages/newsletter/newsletter.component';
import {MenubarModule} from "primeng/menubar";
import {initializeApp, provideFirebaseApp} from "@angular/fire/app";
import {environment} from "../../../aprosag-webshop/src/environments/environment";
import {getAuth, provideAuth} from "@angular/fire/auth";
import {getStorage, provideStorage} from "@angular/fire/storage";
import {getFirestore, provideFirestore} from "@angular/fire/firestore";
import {AngularFireModule} from "@angular/fire/compat";
import {TableModule} from "primeng/table";
import { ItemComponent } from './pages/items/item/item.component';
import { OrderComponent } from './pages/orders/order/order.component';
import {ReactiveFormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {InputTextareaModule} from "primeng/inputtextarea";
import {ButtonModule} from "primeng/button";
import { NewItemComponent } from './pages/items/new-item/new-item.component';

@NgModule({
  declarations: [
    AppComponent,
    OrdersComponent,
    UsersComponent,
    ItemsComponent,
    NewsletterComponent,
    ItemComponent,
    OrderComponent,
    NewItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MenubarModule,
    AngularFireModule.initializeApp(environment.firebase),
    provideAuth(() => getAuth()),
    provideStorage(() => getStorage()),
    provideFirestore(() => getFirestore()),
    TableModule,
    ReactiveFormsModule,
    InputTextModule,
    InputTextareaModule,
    ButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
