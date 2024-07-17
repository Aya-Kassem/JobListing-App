import { createAction, props } from "@ngrx/store";

export const LOAD_JOBS_SUCCESS ='[jobs page] load jobs success';
export const LOAD_JOBS_FAIL ='[jobs page] load jobs fail';
export const LOAD_JOBS ='[jobs page] load jobs';


export const loadJobsSuccess = createAction (LOAD_JOBS_SUCCESS, props<{jobs: any}>())
export const loadJobsFailed = createAction (LOAD_JOBS_FAIL,props<{Errortext:any}>())
export const loadJobs = createAction (LOAD_JOBS)


