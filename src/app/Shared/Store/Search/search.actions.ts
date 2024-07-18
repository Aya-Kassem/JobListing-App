import { createAction, props } from "@ngrx/store";
import { Job } from "../../../Models/job.interface";

export const searchByTitle = createAction(
    '[SearchJob] Title',
    props<{ title: string }>()
)

export const searchByLocation = createAction(
    '[SearchJob] Location',
    props<{ location: string }>()
)

export const searchResult = createAction(
    '[searchJob] Result',
    props<{ jobs: Job[] }>()
)