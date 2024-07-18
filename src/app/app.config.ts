import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations'; // Add this import
import { searchByTitleReducer, searchByLocationReducer, userSearchResultReducer } from './Shared/Store/Search/search.reducer';
import { JobsEffect } from './Shared/Store/Jobs/jobs.effects';
import { jobsReducer } from './Shared/Store/Jobs/jobs.reducer';
import { appliedJobsReducer } from './Shared/Store/AppliedJobs/appliedJobs.reducer';
import { ApplyingJobsEffects } from './Shared/Store/AppliedJobs/appliedJobs.effects';
import { PaginationReducer } from './Shared/Store/Pagination/pagination.reducer';
import { MessageService } from 'primeng/api';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    MessageService,
    BrowserAnimationsModule,
    provideRouter(routes), 
    provideClientHydration(), 
    provideHttpClient(withFetch()), 
    provideStore({
      Title: searchByTitleReducer,
      Location: searchByLocationReducer,
      Jobs: jobsReducer,
      AppliedJobs: appliedJobsReducer,
      Pagination: PaginationReducer,
      searchResult: userSearchResultReducer
    }), 
    provideEffects(JobsEffect, ApplyingJobsEffects),
    provideAnimations()
  ]
};
