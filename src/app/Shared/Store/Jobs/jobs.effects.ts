import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { MainService } from "../../../Services/mainService";
import { loadJobsFailed, loadJobsSuccess } from "./jobs.actions";
import { catchError, exhaustMap, map, of } from "rxjs";

@Injectable()
export class JobsEffect {
    constructor(private _Actions: Actions, private _MainService: MainService) { }

    loadJobs$ = createEffect(() =>
        this._Actions.pipe(
            ofType('[jobs page] load jobs'),
            exhaustMap(() =>
                this._MainService.fetchAllJobs().pipe(
                    map(jobs => loadJobsSuccess({ jobs })),
                    catchError(error => of(loadJobsFailed({ Errortext: error })))
                )
            )
        )
    );
}