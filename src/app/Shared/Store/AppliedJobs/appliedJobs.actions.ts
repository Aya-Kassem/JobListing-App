import { createAction, props } from '@ngrx/store';
import { appliedJobs } from './appliedJobs.state';
import { UserData } from './../../../Models/userData.interface';

export const submitApplication = createAction(
  '[Job] Submit Application',
  props<{ userData: UserData; jobData: appliedJobs }>()
);

export const submitApplicationSuccess = createAction(
  '[Job] Submit Application Success',
  props<{ id: string }>()
);

export const submitApplicationFailure = createAction(
  '[Job] Submit Application Failure',
  props<{ error: any }>()
);
