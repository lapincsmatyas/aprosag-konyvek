import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import {take} from "rxjs/operators";
import {ItemsFacade} from "../../../../../libs/items/src/lib/+state/items/items.facade";

@Injectable({
  providedIn: 'root'
})
export class ItemResolver implements Resolve<boolean> {
  constructor(
    private router: Router,
    private itemsFacade: ItemsFacade
  ) {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const id = route.paramMap.get('id');
    if(!id) return of(true);

    this.itemsFacade.getItemById$(id)
      .pipe(take(1))
      .subscribe((result) => {
        if(!result){
          this.itemsFacade.loadItemById(id);
        }
      })

    return of(true);
  }
}
