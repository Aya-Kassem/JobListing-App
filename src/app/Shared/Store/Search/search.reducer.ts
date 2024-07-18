
import { createReducer, on } from "@ngrx/store";
import { searchByLocation, searchByTitle, searchResult } from "./search.actions";
import { Job } from './../../../Models/job.interface';


const initialTitle: string = '';
const initialLocation: string = '';
const initialJobs: Job[] = [] ;

export const searchByTitleReducer = createReducer(
    initialTitle,
    on(searchByTitle, (_, { title }) => title)
);


export const searchByLocationReducer = createReducer(
    initialLocation,
    on(searchByLocation, (_, { location }) => location)
);

export const userSearchResultReducer = createReducer(
    initialJobs,
    on(searchResult, (state, { jobs }) => jobs)
)