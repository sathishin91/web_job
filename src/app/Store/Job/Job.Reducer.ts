import { createReducer, on } from '@ngrx/store';
import * as JobActions from '../Job/Job.Action';

export interface JobState {
  designation: object;
  department: object; // Add department to the state
}

export const initialState: JobState = {
  designation: {},
  department: {}, // Initialize department in the state
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

  on(JobActions.setDepartmentList, (state, { department }) => ({
    ...state,
    department,
  })),

  on(JobActions.getDepartmentList, (state, { api_key, id }) => ({
    ...state,
    department: id,
  }))
);
