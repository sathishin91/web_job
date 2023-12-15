// job.reducer.ts
import { createReducer, on } from '@ngrx/store';
import * as JobActions from '../Job/Job.Action';

export interface JobState {
  designation: object;
  department: any;
  category: any;
  addJobDetails: any;
  city: any;
  education: any;
  englishLevel: any;
  experience: any;
}

export const initialState: JobState = {
  designation: {},
  city: {},
  education: {},
  experience: {},
  englishLevel: {},
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
  })),

  on(JobActions.getCityList, (state, { city }) => ({
    ...state,
    city,
  })),

  on(JobActions.setCityList, (state, { city }) => ({
    ...state,
    city,
  })),

  on(JobActions.getEducationList, (state, { education }) => ({
    ...state,
    education,
  })),

  on(JobActions.setEducationList, (state, { education }) => ({
    ...state,
    education,
  })),

  on(JobActions.getEnglishLevelList, (state, { englishLevel }) => ({
    ...state,
    englishLevel,
  })),

  on(JobActions.setEnglishLevelList, (state, { englishLevel }) => ({
    ...state,
    englishLevel,
  })),

  on(JobActions.getExperienceList, (state, { experience }) => ({
    ...state,
    experience,
  })),

  on(JobActions.setExperienceList, (state, { experience }) => ({
    ...state,
    experience,
  }))
);
