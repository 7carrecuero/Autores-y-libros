
import {ActionReducer, Action} from '@ngrx/store';
import {merge, pick} from 'lodash-es';
import * as CryptoJS from 'crypto-js';

const stateKeys = ['localStorage', 'contador'];
const localStorageKey = '__app_storage__';

export function storageMetaReducer<S, A extends Action = Action>(reducer: ActionReducer<S, A>) {
  let onInit = true;
  return (state: S, action: A): S => {
    const nextState = reducer(state, action);
    if (onInit) {
      onInit           = false;
      const savedState = getSavedState(localStorageKey);
      return merge(nextState, savedState);
    }
    const stateToSave = pick(nextState, stateKeys);
    setSavedState(stateToSave, localStorageKey);
    return nextState;
  };
}

function setSavedState(state: any, key: string) {
  return sessionStorage.setItem(key, CryptoJS.TripleDES.encrypt(JSON.stringify(state), 'miclave').toString());
}
function getSavedState(key: string): any {
  if (sessionStorage.getItem(key)) {
    return JSON.parse(CryptoJS.TripleDES.decrypt(sessionStorage.getItem(key), 'miclave').toString(CryptoJS.enc.Utf8));
  } else {
    return {};
  }
}
