import * as fromActions from './localStorage.actions';
import { LocalStorage } from '../Classes/localStorage.reducers';

export function localStorageReducer(state: Array<LocalStorage> = [], action: fromActions.LocalStorageActions) {
  switch (action.type) {
    case fromActions.SET_ITEM:
      if (state.find(x => x.key === action.payload.key)) {
        const newValue =
          state.map(local => local.key === action.payload.key ?
            { key: local.key, value: action.payload.value } :
            local
        );
        return newValue;
      } else {
        return [...state, {
          key: action.payload.key,
          value: action.payload.value
        }];
      }
    case fromActions.REMOVE_ITEM:
      return state.filter(city => city.key !== action.payload.key);
    case fromActions.CLEAR:
      return new Array<LocalStorage>();
    default:
      return state;
  }
}

