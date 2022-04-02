import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FooterComponent} from './shared/components/footer/footer.component';
import {HeaderComponent} from './shared/components/header/header.component';
import {ItemsComponent} from './pages/items/items.component';
import {ContactsComponent} from './pages/contacts/contacts.component';
import {WhyIsItSpecialComponent} from './pages/why-is-it-special/why-is-it-special.component';
import {environment} from "../environments/environment";
import {initializeApp, provideFirebaseApp} from '@angular/fire/app';
import {provideAuth, getAuth} from '@angular/fire/auth';
import {provideFirestore, getFirestore} from '@angular/fire/firestore';
import {ItemCardComponent} from './pages/items/item-card/item-card.component';
import {getStorage, provideStorage} from "@angular/fire/storage";
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {NewsletterComponent} from './shared/components/newsletter/newsletter.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ItemComponent} from "./pages/item/item.component";
import {LoginComponent} from './pages/login/login.component';
import {RegisterComponent} from './pages/register/register.component';
import {ProfileComponent} from './pages/profile/profile.component';
import {ToastrModule} from "ngx-toastr";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CartModalComponent} from './shared/components/header/cart-modal/cart-modal.component';
import {NgbModal, NgbModalModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MatBadgeModule} from '@angular/material/badge';
import {MatButtonModule} from "@angular/material/button";
import {CartComponent} from './pages/cart/cart.component';
import {ShippingOptionsComponent} from './pages/cart/shipping-options/shipping-options.component';
import {CashDeskComponent} from './pages/cash-desk/cash-desk.component';
import {PaymentOptionsComponent} from './pages/cash-desk/payment-options/payment-options.component';
import {AboutUsComponent} from "./pages/about-us/about-us.component";
import {StepperComponent} from './shared/components/stepper/stepper.component';
import {MatStepperModule} from '@angular/material/stepper';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatSidenavModule} from "@angular/material/sidenav";
import {SidebarModule} from "primeng/sidebar";
import {AddedToCartComponent} from './shared/popups/added-to-cart/added-to-cart.component';
import {SuccessfulOrderComponent} from './shared/popups/successful-order/successful-order.component';
import { FavoriteComponent } from './shared/components/favorite/favorite.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    ItemComponent,
    ItemsComponent,
    AboutUsComponent,
    ContactsComponent,
    WhyIsItSpecialComponent,
    ItemCardComponent,
    NewsletterComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    CartModalComponent,
    CartComponent,
    ShippingOptionsComponent,
    CashDeskComponent,
    PaymentOptionsComponent,
    StepperComponent,
    AddedToCartComponent,
    SuccessfulOrderComponent,
    FavoriteComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    }),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideStorage(() => getStorage()),
    provideFirestore(() => getFirestore()),
    FontAwesomeModule,
    FormsModule,
    MatBadgeModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    NgbModule,
    NgbModalModule,
    MatButtonModule,
    MatFormFieldModule,
    MatStepperModule,
    MatInputModule,
    MatIconModule,
    FlexLayoutModule,
    MatSidenavModule,
    SidebarModule
  ],
  providers: [  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
