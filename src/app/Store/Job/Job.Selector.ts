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
