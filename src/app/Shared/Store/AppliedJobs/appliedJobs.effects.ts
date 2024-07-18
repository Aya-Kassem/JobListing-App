import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { MainService } from '../../../Services/mainService';
import { submitApplication, submitApplicationSuccess, submitApplicationFailure } from './appliedJobs.actions'

@Injectable()
export class ApplyingJobsEffects {
    submitApplication$ = createEffect(() =>
        this.actions$.pipe(
            ofType(submitApplication),
            mergeMap(action =>
                this.mainService.SubmitJobApplication(action.userData, action.jobData).pipe(
                    map(({ id }) => {
                        const storedJobs = JSON.parse(localStorage.getItem('Jobs') || '[]');
                        if (!storedJobs.includes(id)) {
                          storedJobs.push(id);
                          localStorage.setItem('Jobs', JSON.stringify(storedJobs));
                        }
                        return submitApplicationSuccess({ id, submitStatus: true });
                      }),
                    catchError(err => of(submitApplicationFailure({ Errortext: err.message, submitStatus: false })))
                )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private mainService: MainService
    ) { }
}
