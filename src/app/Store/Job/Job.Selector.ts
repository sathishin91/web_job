// job.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { JobState } from './Job.Reducer';

// Get the feature state
export const selectJobState = createFeatureSelector<JobState>('job');

// Get the 'designation' property from the feature state
export const selectDesignation = createSelector(
  selectJobState,
  (state: JobState) => state.designation
);

// Get the 'department' property from the feature state
export const selectDepartment = createSelector(
  selectJobState,
  (state: JobState) => state.department
);

// Get the 'category' property from the feature state
export const selectCategory = createSelector(
  selectJobState,
  (state: JobState) => state.category
);

// Get the 'city' property from the feature state
export const selectCity = createSelector(
  selectJobState,
  (state: JobState) => state.city
);

// Get the 'Education list'
export const selectMinEducation = createSelector(
  selectJobState,
  (state: JobState) => state.education
);

// Get the 'English level list'
export const selectEnglishLevel = createSelector(
  selectJobState,
  (state: JobState) => state.englishLevel
);

// Get the 'Experience level list'
export const selectExpLevel = createSelector(
  selectJobState,
  (state: JobState) => state.experience
);

export const getJobLists = createSelector(
  selectJobState,
  (state: JobState) => state.list
);
