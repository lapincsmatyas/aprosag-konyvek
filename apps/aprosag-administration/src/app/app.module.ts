import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { StoreModule } from '@ngrx/store';
import { reducers } from 'items';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { ItemsEffects } from '../../../../libs/items/src/lib/+state/items/items.effects';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { environment } from '../../../aprosag-konyvek/src/environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
            declarations: [AppComponent, SideMenuComponent],
            imports: [
              BrowserModule,
              BrowserAnimationsModule,
              provideFirebaseApp(() => initializeApp(environment.firebase)),
              provideAuth(() => getAuth()),
              provideStorage(() => getStorage()),
              provideFirestore(() => getFirestore()),
              RouterModule.forRoot(
                [
                  {
                    path: 'items',
                    loadChildren: () =>
                      import('./modules/items/items.module').then((m) => m.ItemsModule),
                  },
                ],
                { initialNavigation: 'enabledBlocking' }
              ),
              StoreModule.forRoot(reducers),
              EffectsModule.forRoot([ItemsEffects]),
              StoreDevtoolsModule.instrument(),
              ToastrModule.forRoot({
                                     positionClass: 'toast-top-right'
                                   }),
            ],
            providers: [],
            bootstrap: [AppComponent],
          })
export class AppModule {
}
