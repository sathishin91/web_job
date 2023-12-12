import { createAction, props } from '@ngrx/store';

export const getDesignationList = createAction(
  '[Job] Get Designation List',
  props<{ designation: object }>()
);

export const setDesignationList = createAction(
  '[Job] Set Designation List',
  props<{ designation: object }>()
);

export const getDepartmentList = createAction(
  '[Job] Get Department List',
  props<{ api_key: string; id: any }>()
);

export const setDepartmentList = createAction(
  '[Job] Set Department List',
  props<{ department: any; category: any }>()
);
