import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { ItemsComponent } from './pages/items/items.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { WhyIsItSpecialComponent } from './pages/why-is-it-special/why-is-it-special.component';
import { environment } from "../environments/environment";
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { ItemCardComponent } from '../../../../libs/ui/src/lib/item-card/item-card.component';
import { getStorage, provideStorage } from "@angular/fire/storage";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NewsletterComponent } from './shared/components/newsletter/newsletter.component';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ItemComponent } from "./pages/item/item.component";
import { LoginComponent } from './pages/login/login.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RegisterComponent } from './pages/register/register.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ToastrModule } from "ngx-toastr";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CartModalComponent } from './shared/components/header/cart-modal/cart-modal.component';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from "@angular/material/button";
import { CartComponent } from './pages/cart/cart.component';
import { ShippingOptionsComponent } from './pages/cart/shipping-options/shipping-options.component';
import { CashDeskComponent } from './pages/cash-desk/cash-desk.component';
import { PaymentOptionsComponent } from './pages/cash-desk/payment-options/payment-options.component';
import { AboutUsComponent } from "./pages/about-us/about-us.component";
import { StepperComponent } from './shared/components/stepper/stepper.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatSidenavModule } from "@angular/material/sidenav";
import { SidebarModule } from "primeng/sidebar";
import { AddedToCartComponent } from './shared/popups/added-to-cart/added-to-cart.component';
import { SuccessfulOrderComponent } from './shared/popups/successful-order/successful-order.component';
import { FavoriteComponent } from './shared/components/favorite/favorite.component';
import { FavoritesComponent } from './pages/profile/favorites/favorites.component';
import { OrdersComponent } from './pages/profile/orders/orders.component';
import { PersonalDataComponent } from "./pages/profile/personal-data/personal-data.component";
import { GalleryComponent } from './shared/components/gallery/gallery.component';
import { SwiperModule } from "swiper/angular";
import { EmailSentComponent } from "./pages/contacts/email-sent/email-sent.component";
import { ConfirmationComponent } from './shared/popups/confirmation/confirmation.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { EffectsModule } from "@ngrx/effects";
import { CartSummaryComponent } from './pages/cash-desk/cart-summary/cart-summary.component';
import { BillingDataComponent } from "./pages/cash-desk/billing-data/billing-data.component";
import { OrderSummaryComponent } from './pages/cash-desk/order-summary/order-summary.component';
import { FullscreenImageComponent } from './shared/components/gallery/fullscreen-image/fullscreen-image.component';
import { SettingsEffects } from "../../../../libs/items/src/lib/+state/settings/settings.effects";
import { ItemsEffects } from "../../../../libs/items/src/lib/+state/items/items.effects";

import * as fromCore from "items"
import { ItemsFacade } from "items"
import { cartMetaReducer } from '../../../../libs/items/src/lib/+state/cart/cart.meta-reducer';
import { SettingsService } from '../../../../libs/items/src/lib/services/settings.service';

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
    FavoriteComponent,
    FavoritesComponent,
    OrdersComponent,
    PersonalDataComponent,
    EmailSentComponent,
    GalleryComponent,
    ConfirmationComponent,
    CartSummaryComponent,
    BillingDataComponent,
    OrderSummaryComponent,
    FullscreenImageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    SwiperModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTooltipModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right'
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
    SidebarModule,
    StoreModule.forRoot(fromCore.reducers, {
      metaReducers: [cartMetaReducer],
    }),
    StoreDevtoolsModule.instrument(),
    EffectsModule.forRoot([
      SettingsEffects,
      ItemsEffects
    ]),

    ItemCardComponent
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFactory,
      deps: [SettingsService, ItemsFacade],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

function appInitializerFactory(settingsService: SettingsService, itemsFacade: ItemsFacade): () => void {
  return () => {
    settingsService.loadSettings();
    itemsFacade.loadItems();
  };
}