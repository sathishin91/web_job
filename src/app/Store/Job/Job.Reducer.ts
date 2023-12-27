import { createReducer, on, Action } from '@ngrx/store';
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
  preview: any;
  singlejob: any;
  editJobDetails: any;
  editCandidateDetails: any;
  editInterviewDetails: any;
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
  preview: null,
  singlejob: null,
  editJobDetails: null,
  editCandidateDetails: null,
  editInterviewDetails: null,
};

export const jobReducer = createReducer(
  initialState,

  on(
    JobActions.getDesignationList,
    (state, { designation }): JobState => ({
      ...state,
      designation,
    })
  ),

  on(
    JobActions.setDesignationList,
    (state, { designation }): JobState => ({
      ...state,
      designation,
    })
  ),

  on(
    JobActions.setDepartmentList,
    (state, { department, category }): JobState => ({
      ...state,
      department,
      category,
    })
  ),
  on(
    JobActions.getDepartmentList,
    (state, { api_key, id }): JobState => ({
      ...state,
      department: id,
    })
  ),

  on(
    JobActions.getCityList,
    (state, { city }): JobState => ({
      ...state,
      city,
    })
  ),

  on(
    JobActions.setCityList,
    (state, { city }): JobState => ({
      ...state,
      city,
    })
  ),

  on(
    JobActions.getEducationList,
    (state, { education }): JobState => ({
      ...state,
      education,
    })
  ),

  on(
    JobActions.setEducationList,
    (state, { education }): JobState => ({
      ...state,
      education,
    })
  ),

  on(
    JobActions.getEnglishLevelList,
    (state, { englishLevel }): JobState => ({
      ...state,
      englishLevel,
    })
  ),

  on(
    JobActions.setEnglishLevelList,
    (state, { englishLevel }): JobState => ({
      ...state,
      englishLevel,
    })
  ),

  on(
    JobActions.getExperienceList,
    (state, { experience }): JobState => ({
      ...state,
      experience,
    })
  ),

  on(
    JobActions.setExperienceList,
    (state, { experience }): JobState => ({
      ...state,
      experience,
    })
  ),

  on(
    JobActions.getAddJobDetails,
    (state, { addJobDetails }): JobState => ({
      ...state,
      addJobDetails,
    })
  ),

  on(
    JobActions.setAddJobDetails,
    (state, { data }): JobState => ({
      ...state,
      addJobDetails: data,
    })
  ),

  on(
    JobActions.getAddCandidateDetails,
    (state, { addCandidateDetails }): JobState => ({
      ...state,
      addCandidateDetails,
    })
  ),

  on(
    JobActions.setAddCandidateDetails,
    (state, { data }): JobState => ({
      ...state,
      addCandidateDetails: data,
    })
  ),

  on(
    JobActions.getAddInterviewDetails,
    (state, { addInterviewDetails }): JobState => ({
      ...state,
      addInterviewDetails,
    })
  ),

  on(
    JobActions.setAddInterviewDetails,
    (state, { data }): JobState => ({
      ...state,
      addInterviewDetails: data,
    })
  ),

  on(
    JobActions.getJobsList,
    (state, { list }): JobState => ({
      ...state,
      list,
    })
  ),

  on(
    JobActions.setJobsList,
    (state, { list }): JobState => ({
      ...state,
      list: list,
    })
  ),

  on(
    JobActions.setPreviewDetails,
    (state, { preview }): JobState => ({
      ...state,
      preview,
    })
  ),

  on(
    JobActions.getPreviewDetails,
    (state, { preview }): JobState => ({
      ...state,
      preview,
    })
  ),
  on(
    JobActions.setJobDetailsId,
    (state, { singlejob }): JobState => ({
      ...state,
      singlejob,
    })
  ),

  on(
    JobActions.getJobDetailsId,
    (state, { singlejob }): JobState => ({
      ...state,
      singlejob,
    })
  ),
  on(
    JobActions.getEditJobDetails,
    (state, { editJobDetails }): JobState => ({
      ...state,
      editJobDetails,
    })
  ),

  on(
    JobActions.setEditJobDetails,
    (state, { data }): JobState => ({
      ...state,
      editJobDetails: data,
    })
  ),
  on(
    JobActions.getEditCandidateDetails,
    (state, { editCandidateDetails }): JobState => ({
      ...state,
      editCandidateDetails,
    })
  ),

  on(
    JobActions.setEditCandidateDetails,
    (state, { data }): JobState => ({
      ...state,
      editCandidateDetails: data,
    })
  ),
  on(
    JobActions.getEditInterviewDetails,
    (state, { editInterviewDetails }): JobState => ({
      ...state,
      editInterviewDetails,
    })
  ),

  on(
    JobActions.setEditInterviewDetails,
    (state, { data }): JobState => ({
      ...state,
      editInterviewDetails: data,
    })
  )
);

// Explicitly specify the return type for the reducer function
export function reducer(state: JobState | undefined, action: Action) {
  return jobReducer(state, action);
}
