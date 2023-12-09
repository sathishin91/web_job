// Token.Actions.ts

import { createAction, props } from '@ngrx/store';

export const getToken = createAction('[Auth] Get Token');
export const setToken = createAction(
  '[Auth] Set Token',
  props<{ token: string }>()
);
export const clearToken = createAction('[Auth] Clear Token');
