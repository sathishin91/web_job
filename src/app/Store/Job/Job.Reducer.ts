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
  addCandidateDetails: any;
  addInterviewDetails: any;
  list: any;
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
  addCandidateDetails: null,
  addInterviewDetails: null,
  list: null,
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
  })),

  on(JobActions.getAddJobDetails, (state, { addJobDetails }) => ({
    ...state,
    addJobDetails,
  })),

  on(JobActions.setAddJobDetails, (state, { data }) => ({
    ...state,
    addJobDetails: data,
  })),

  on(JobActions.getAddCandidateDetails, (state, { addCandidateDetails }) => ({
    ...state,
    addCandidateDetails,
  })),

  on(JobActions.setAddCandidateDetails, (state, { data }) => ({
    ...state,
    addCandidateDetails: data,
  })),
  on(JobActions.getAddInterviewDetails, (state, { addInterviewDetails }) => ({
    ...state,
    addInterviewDetails,
  })),

  on(JobActions.setAddInterviewDetails, (state, { data }) => ({
    ...state,
    addInterviewDetails: data,
  })),
  on(JobActions.getJobsList, (state, { list }) => ({
    ...state,
    list,
  })),

  on(JobActions.setJobsList, (state, { list }) => ({
    ...state,
    list: list,
  })),
  on(JobActions.setPreviewDetails, (state, { preview }) => ({
    ...state,
    preview,
  })),

  on(JobActions.getPreviewDetails, (state, { preview }) => ({
    ...state,
    preview,
  }))
);
