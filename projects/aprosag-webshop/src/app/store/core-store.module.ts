import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {StoreModule} from "@ngrx/store";
import * as fromCore from "./index";
import {EffectsModule} from "@ngrx/effects";
import {ItemEffects} from './item/item.effects';
import {cartMetaReducer} from "./cart/cart.meta-reducer";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('core', fromCore.reducers,
      {
        metaReducers: [cartMetaReducer]
      }),
    EffectsModule.forFeature([
      ItemEffects
    ]),
  ],
})
export class CoreStoreModule {

}
