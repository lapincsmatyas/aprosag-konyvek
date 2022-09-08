import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {addItem, itemNotFound, loadItemByHttp, loadItems, loadItemsByHttp} from "./item.actions";
import {ItemsService} from "../../services/item/items.service";
import {map, switchMap} from "rxjs/operators";

@Injectable()
export class ItemEffects {
  constructor(private actions$: Actions,
              private itemService: ItemsService) {
  }

  loadItemsByHttp$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadItemsByHttp),
      switchMap(action => {
        return this.itemService.getAllItems()
          .pipe(
            map(items => {
              return loadItems({items})
            })
          )
      })
    )
  });

  loadItemByHttp$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadItemByHttp),
      switchMap((action => {
          return this.itemService.getItemById(action.id)
            .pipe(
              map(item => {
                if (item) {
                  return addItem({item})
                } else return itemNotFound()
              })
            )
        })
      )
    )
  });
}
