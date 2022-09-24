import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import {take} from "rxjs/operators";
import {ItemsFacade} from "../../../../../../libs/items/src/lib/+state/items/items.facade";

@Injectable({
  providedIn: 'root'
})
export class ItemsResolver implements Resolve<any> {
  constructor(
    private readonly itemsFacade: ItemsFacade
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    this.itemsFacade.getItemsLoaded$()
      .pipe(take(1))
      .subscribe(loaded => {
          if(!loaded) this.itemsFacade.loadItems();
      })
    return of(null);
  }
}
