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

export const getEducationList = createAction(
  '[Job] Get Education List',
  props<{ education: object }>()
);

export const setEducationList = createAction(
  '[Job] Set Education List',
  props<{ education: object }>()
);

export const getEnglishLevelList = createAction(
  '[Job] Get English Level List',
  props<{ englishLevel: object }>()
);

export const setEnglishLevelList = createAction(
  '[Job] Set English Level List',
  props<{ englishLevel: object }>()
);

export const getExperienceList = createAction(
  '[Job] Get Experience  List',
  props<{ experience: object }>()
);

export const setExperienceList = createAction(
  '[Job] Set Experience List',
  props<{ experience: object }>()
);

export const setAddCandidateDetails = createAction(
  '[Job] Set Add Candidate Details',
  props<{ data: any }>()
);
export const getAddCandidateDetails = createAction(
  '[Job] Get Add Candidate Details',
  props<{ addCandidateDetails: any }>()
);

export const setAddInterviewDetails = createAction(
  '[Job] Set Add Interview Details',
  props<{ data: any }>()
);
export const getAddInterviewDetails = createAction(
  '[Job] Get Add Interview Details',
  props<{ addInterviewDetails: any }>()
);

export const setJobsList = createAction(
  '[Job] Set Job List ',
  props<{ list: any }>()
);
export const getJobsList = createAction(
  '[Job] Get Job List',
  props<{ list: any }>()
);

export const setPreviewDetails = createAction(
  '[Job] Set Preview Details',
  props<{ preview: any }>()
);
export const getPreviewDetails = createAction(
  '[Job] Get Preview Details',
  props<{ preview: any }>()
);

export const setJobDetailsId = createAction(
  '[Job] Set Preview Details',
  props<{ singlejob: any }>()
);
export const getJobDetailsId = createAction(
  '[Job] Get Preview Details',
  props<{ singlejob: any }>()
);

export const setEditJobDetails = createAction(
  '[Job] Set Edit Job Details',
  props<{ data: any }>()
);
export const getEditJobDetails = createAction(
  '[Job] Get Edit Job Details',
  props<{ editJobDetails: any }>()
);

export const setEditCandidateDetails = createAction(
  '[Job] Set Edit Candidate Details',
  props<{ data: any }>()
);
export const getEditCandidateDetails = createAction(
  '[Job] Get Edit Candidate Details',
  props<{ editCandidateDetails: any }>()
);

export const setEditInterviewDetails = createAction(
  '[Job] Set Edit Interview Details',
  props<{ data: any }>()
);
export const getEditInterviewDetails = createAction(
  '[Job] Get Edit Interview Details',
  props<{ editInterviewDetails: any }>()
);
