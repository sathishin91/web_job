// job.reducer.ts
import { createReducer, on } from '@ngrx/store';
import * as JobActions from '../Job/Job.Action';

export interface JobState {
  designation: object;
  department: any;
  category: any;
  addJobDetails: any;
}

export const initialState: JobState = {
  designation: {},
  addJobDetails: null,
  department: null,
  category: null,
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
  })),

  // job.reducer.ts
  on(JobActions.getAddJobDetails, (state, { addJobDetails }) => ({
    ...state,
    addJobDetails,
  })),

  on(JobActions.setAddJobDetails, (state, { data }) => ({
    ...state,
    addJobDetails: data,
  }))
);
