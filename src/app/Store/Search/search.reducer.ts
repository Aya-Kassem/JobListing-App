
// const initialState: searchJob = { title: '', location: '' };
import { createReducer, on } from "@ngrx/store";
import { searchByLocation, searchByTitle } from "./search.action";


const initialTitle: string = '';
const initialLocation: string = '';
export const searchByTitleReducer = createReducer(
    initialTitle,
    on(searchByTitle, (_, { title }) => title)
);


export const searchByLocationReducer = createReducer(
    initialLocation,
    on(searchByLocation, (_, { location }) => location)
);