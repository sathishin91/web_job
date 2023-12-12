// job.reducer.ts
import { createReducer, on } from '@ngrx/store';
import * as JobActions from '../Job/Job.Action';

export interface JobState {
  designation: object;
  department: any; // Adjust the type based on your API response structure
  category: any; // Adjust the type based on your API response structure
}

export const initialState: JobState = {
  designation: {},
  department: null, // Adjust the initial value and type based on your needs
  category: null, // Adjust the initial value and type based on your needs
};

export const jobReducer = createReducer(
  initialState,

  on(JobActions.getDesignationList, (state, { designation }) => ({
    ...state,
    designation,
  })),

  on(JobActions.setDesignationList, (state, { designation }) => ({
    ...state,
    designation,
  })),

  on(JobActions.setDepartmentList, (state, { department, category }) => ({
    ...state,
    department,
    category,
  })),
  on(JobActions.getDepartmentList, (state, { api_key, id }) => ({
    ...state,
    department: id,
  }))
);
