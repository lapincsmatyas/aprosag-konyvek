import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {StoreModule} from "@ngrx/store";
import * as fromCore from "./index";
import {EffectsModule} from "@ngrx/effects";
import { ItemEffects } from './item/item.effects';

@NgModule({
  declarations:[],
  imports:[
    CommonModule,
    StoreModule.forFeature('core', fromCore.reducers),
    EffectsModule.forFeature([
      ItemEffects
    ]),
  ],
})
export class CoreStoreModule {

}
