import { createAction, props } from "@ngrx/store";

export const loadJobsSuccess = createAction ('[jobs page] load jobs success', props<{jobs: any}>())
export const loadJobsFailed = createAction ('[jobs page] load jobs fail',props<{Errortext:any}>())
export const loadJobs = createAction ('[jobs page] load jobs')


