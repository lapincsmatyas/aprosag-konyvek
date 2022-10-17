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
import { catchError, map, switchMap } from "rxjs/operators";
import { ToastrService } from 'ngx-toastr';
import { EMPTY } from 'rxjs';

@Injectable()
export class ItemsEffects {
  constructor(private actions$: Actions,
              private toastr: ToastrService,
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
              }),
              catchError(error => {
                this.toastr.error("Hiba tortent a termek betoltesekor");
                return EMPTY;
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
          map(() => {
            this.toastr.success("Termek sikeresen letrehozva!");
            return itemCreated()
          }),
          catchError(error => {
            this.toastr.error("Hiba tortent a termek letrehozasakor");
            return EMPTY;
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
          map(() => {
            this.toastr.success("Termek sikeresen szerkesztve!");
            return itemEdited()
          }),
          catchError(error => {
            this.toastr.error("Hiba tortent a termek szerkesztesekor");
            return EMPTY;
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
            this.toastr.success("Termek sikeresen torolve!");
            return itemDeleted()
          }),
          catchError(error => {
            this.toastr.error("Hiba tortent a termek torlesekor");
            return EMPTY;
          })
        )
      }))
    )
  })
}
