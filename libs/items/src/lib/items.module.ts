import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromItems from './+state/items/items.reducer';
import { ItemsEffects } from './+state/items/items.effects';
import { ItemsFacade } from './+state/items/items.facade';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(fromItems.ITEMS_FEATURE_KEY, fromItems.itemsReducer),
    EffectsModule.forFeature([ItemsEffects]),
  ],
  providers: [ItemsFacade],
})
export class ItemsModule {}
