import {Action, ActionReducer} from "@ngrx/store";

function setSavedState(state: any, localStorageKey: string) {
  localStorage.setItem(localStorageKey, JSON.stringify(state));
}
function getSavedState(localStorageKey: string): any {
  return JSON.parse(localStorage.getItem(localStorageKey) || '{}');
}

const localStorageKey = 'CART_STATE';

export function cartMetaReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  let onInit = true;
  return function(state: any, action: Action) {
    const nextState = reducer(state, action);

    if(onInit){
      onInit = false;
      const savedState = getSavedState(localStorageKey);
      nextState.cart = savedState;
    }

    setSavedState(nextState['cart'], localStorageKey);
    return nextState;
  }
}
