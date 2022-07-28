import {Injectable} from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {Observable, of} from 'rxjs';
import {ItemsService} from "../../services/item/items.service";
import {DeprecatedItem} from "../../model/item.model";
import {delay, map, take} from "rxjs/operators";
import {ItemRepository} from "../../services/item/item.repository";

@Injectable({
  providedIn: 'root'
})
export class ItemsResolver implements Resolve<any> {
  constructor(
    private readonly itemRepository: ItemRepository
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    this.itemRepository.getItemsLoaded$()
      .pipe(take(1))
      .subscribe(loaded => {
          if(!loaded) this.itemRepository.loadItems();
      })
    return of(null);
  }
}
