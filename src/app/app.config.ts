import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { searchByTitleReducer, searchByLocationReducer } from './Shared/Store/Search/search.reducer';
import { JobsEffect } from './Shared/Store/Jobs/jobs.effects';
import { jobsReducer } from './Shared/Store/Jobs/jobs.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideClientHydration(), 
    provideHttpClient(withFetch()), 
    provideStore({
      Title: searchByTitleReducer,
      Location: searchByLocationReducer,
      Jobs: jobsReducer
    }), 
    provideEffects(JobsEffect)]
};
