import { createReducer, on } from '@ngrx/store';
import {submitApplication, submitApplicationSuccess, submitApplicationFailure} from '../AppliedJobs/appliedJobs.actions';
import { initialState } from './appliedJobs.state'

export const appliedJobsReducer = createReducer(
  initialState,
  on(submitApplication, state => ({
    ...state,
    isApplied: false,
    jobId: ''
  })),
  on(submitApplicationSuccess, (state, { id, submitStatus }) => ({
    ...state,
    isApplied: true,
    jobId: id,
    submitStatus
  })),
  on(submitApplicationFailure, (state, { Errortext, submitStatus }) => ({
    ...state,
    isApplied: true,
    jobId: '',
    Errortext,
    submitStatus
  }))
);

