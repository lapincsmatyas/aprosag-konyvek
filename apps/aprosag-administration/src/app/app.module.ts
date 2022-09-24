import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {RouterModule} from '@angular/router';
import {ItemsListComponent} from './pages/items-list/items-list.component';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import * as fromCore from 'items';
import {EffectsModule} from "@ngrx/effects";
import {ItemsEffects} from "../../../../libs/items/src/lib/+state/items/items.effects";
import {ItemCardComponent} from "../../../../libs/ui/src/lib/item-card/item-card.component";
import {initializeApp, provideFirebaseApp} from "@angular/fire/app";
import {environment} from "../../../aprosag-konyvek/src/environments/environment";
import {getAuth, provideAuth} from "@angular/fire/auth";
import {getStorage, provideStorage} from "@angular/fire/storage";
import {getFirestore, provideFirestore} from "@angular/fire/firestore";
import {TableModule} from "primeng/table";

@NgModule({
  declarations: [AppComponent, ItemsListComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot([]),

    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideStorage(() => getStorage()),
    provideFirestore(() => getFirestore()),

    StoreModule.forRoot(fromCore.reducers),
    StoreDevtoolsModule.instrument(),
    EffectsModule.forRoot([
      ItemsEffects
    ]),

    TableModule,

    ItemCardComponent
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
