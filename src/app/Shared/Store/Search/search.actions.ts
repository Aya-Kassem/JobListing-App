import { createAction, props } from "@ngrx/store";

export const searchByTitle = createAction(
    '[SearchJob] Title',
    props<{ title: string }>()
)

export const searchByLocation = createAction(
    '[SearchJob] Location',
    props<{ location: string }>()
)