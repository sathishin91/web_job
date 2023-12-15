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

// Get the 'category' property from the feature state
export const selectCity = createSelector(
  selectJobState,
  (state: JobState) => state.city
);
