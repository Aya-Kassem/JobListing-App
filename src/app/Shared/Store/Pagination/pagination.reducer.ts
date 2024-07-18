

import { createReducer, on } from '@ngrx/store';
import { PaginationSatet } from './pagination.state';
import {  paginateJobs } from './pagination.actions';

const initialState: PaginationSatet = {
    jobs: [],
    pageSize: 6,
    currentPage: 1
}

export const PaginationReducer = createReducer(
    initialState,
    on(paginateJobs, (state, { currentPage, jobs }) => {
      return {
        ...state,
        currentPage,
        jobs
      };
    })
  );