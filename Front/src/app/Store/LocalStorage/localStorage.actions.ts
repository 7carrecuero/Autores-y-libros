import { Action } from '@ngrx/store';
import { LocalStorage } from '../Classes/localStorage.reducers';

export const SET_ITEM = '[localStorage] Set';
export const REMOVE_ITEM = '[localStorage] Remove';
export const CLEAR = '[localStorage] Clear';

export class SetItemAction implements Action {
  readonly type = SET_ITEM;
  constructor(public payload: LocalStorage) { }
}

export class RemoveItemAction implements Action {
  readonly type = REMOVE_ITEM;
  constructor(public payload: LocalStorage) { }
}

export class ClearAction implements Action {
  readonly type = CLEAR;
  constructor() { }
}


export type LocalStorageActions = SetItemAction | RemoveItemAction | ClearAction;
