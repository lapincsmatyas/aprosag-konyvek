import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  addItem,
  itemNotFound,
  loadItemByHttp,
  loadItems,
  loadItemsByHttp,
  itemCreated,
  createItem,
  itemDeleted,
  deleteItem,
  editItem,
  itemEdited
} from "./items.actions";
import { ItemsService } from "../../services/items.service";
import { map, switchMap } from "rxjs/operators";

@Injectable()
export class ItemsEffects {
  constructor(private actions$: Actions,
              private itemService: ItemsService) {
  }

  loadItemsByHttp$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadItemsByHttp),
      switchMap(() => {
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

  createItem = createEffect(() => {
    return this.actions$.pipe(
      ofType(createItem),
      switchMap((action => {
        return this.itemService.createItem(action.item).pipe(
          map((item) => {
            console.log(item);
            return itemCreated()
          })
        )
      }))
    )
  })

  editItem = createEffect(() => {
    return this.actions$.pipe(
      ofType(editItem),
      switchMap((action => {
        return this.itemService.editItem(action.item).pipe(
          map((item) => {
            console.log(item);
            return itemEdited()
          })
        )
      }))
    )
  })

  deleteItem = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteItem),
      switchMap((action => {
        return this.itemService.deleteItem(action.id).pipe(
          map(() => {
            return itemDeleted()
          })
        )
      }))
    )
  })
}
