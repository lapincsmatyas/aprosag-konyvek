import {Action, ActionReducer, INIT, UPDATE} from "@ngrx/store";
import * as fromCart from "./cart.reducer";

const localStorageKey = 'CART_STATE';

export function cartMetaReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state: any, action: Action) => {
    if(action.type === INIT || action.type === UPDATE){
      const storageState = localStorage.getItem(localStorageKey);
      if(storageState){
        try {
          return JSON.parse(storageState) as fromCart.State;
        } catch {
          localStorage.removeItem(localStorageKey);
        }
      }
    }
    const nextState = reducer(state, action);
    localStorage.setItem(localStorageKey, JSON.stringify(nextState));
    return nextState;
  }
}
