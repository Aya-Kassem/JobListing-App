import { createReducer, on } from '@ngrx/store';
import * as JobActions from '../AppliedJobs/appliedJobs.actions';
import { initialState } from './appliedJobs.state'

export const appliedJobsReducer = createReducer(
  initialState,
  on(JobActions.submitApplication, state => ({
    ...state,
    isApplied: false,
    jobId: ''
  })),
  on(JobActions.submitApplicationSuccess, (state, { id }) => ({
    ...state,
    isApplied: true,
    jobId: id
  })),
  on(JobActions.submitApplicationFailure, (state, { error }) => ({
    ...state,
    isApplied: true,
    jobId: '',
    Errortext: state.Errortext
  }))
);
