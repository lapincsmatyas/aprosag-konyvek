import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import {ItemRepository} from "../services/item/item.repository";
import {take} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ItemResolver implements Resolve<boolean> {
  constructor(
    private router: Router,
    private itemRepository: ItemRepository
  ) {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const id = route.paramMap.get('id');
    if(!id) return of(true);

    this.itemRepository.getItemById$(id)
      .pipe(take(1))
      .subscribe((result) => {
        if(!result){
          this.itemRepository.loadItemById(id);
        }
      })

    return of(true);
  }
}
