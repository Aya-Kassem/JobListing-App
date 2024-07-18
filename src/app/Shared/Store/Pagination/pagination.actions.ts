import { createAction, props } from '@ngrx/store';
import { Job } from './../../../Models/job.interface';

export const paginateJobs = createAction(
    '[Pagination] Paginate Products', 
    props<{ currentPage: number, jobs: Job[] }>()
);
