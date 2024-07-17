// jobs.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { loadJobs, loadJobsSuccess, loadJobsFailed } from './jobs.actions';
import { JobsState } from './jobs.state'



export const initialState: JobsState = {
  jobs: [],
  loading: false,
  Errortext: null
};

export const jobsReducer = createReducer(
  initialState,
  on(loadJobs, state => ({ ...state, loading: true })),
  on(loadJobsSuccess, (state, { jobs }) => ({ ...state, jobs, loading: false })),
  on(loadJobsFailed, (state, { Errortext }) => ({ ...state, Errortext, loading: false }))
);
