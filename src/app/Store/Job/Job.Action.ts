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

export const setAddJobDetails = createAction(
  '[Job] Set Add Job Details',
  props<{ data: any }>()
);
export const getAddJobDetails = createAction(
  '[Job] Get Add Job Details',
  props<{ addJobDetails: any }>()
);

export const getCityList = createAction(
  '[Job] Get City List',
  props<{ city: object }>()
);

export const setCityList = createAction(
  '[Job] Set City List',
  props<{ city: object }>()
);
