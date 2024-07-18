// display-job.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { searchJob } from '../../Models/search.interface';
import { Job } from '../../Models/job.interface';
import { CustomModalComponent } from '../../Shared/Modal/custom-modal.component';
import { loadJobs } from '../../Shared/Store/Jobs/jobs.actions';
import { JobsState } from '../../Shared/Store/Jobs/jobs.state';
import { MoreLessDirective } from '../../Shared/Directives/more-less.directive';
import { RemoveHyphen } from '../../Shared/Pipes/removeHyphen.pipe';
import { CapitalizeFirstLetter } from '../../Shared/Pipes/CapitalizeFirstLetter.pipe';
import { PaginationSatet } from '../../Shared/Store/Pagination/pagination.state';
import { paginateJobs } from '../../Shared/Store/Pagination/pagination.actions';
import { searchResult } from '../../Shared/Store/Search/search.actions';


@Component({
  selector: 'displayJob',
  standalone: true,
  imports: [
    CommonModule,
    CustomModalComponent,
    MoreLessDirective,
    RemoveHyphen,
    CapitalizeFirstLetter,
    DatePipe],
  templateUrl: './display-job.component.html',
  styleUrl: './display-job.component.css'
})
export class DisplayJobComponent implements OnInit {
  alljobs: Job[] = [];
  displayedJobs: Job[] = [];
  searchResult: Job[] = [];
  title$!: Observable<string>;
  location$!: Observable<string>;
  userSearch: boolean = false;
  currentJob!: Job;
  showModal: boolean = false;
  jobsCount!: number;

  paginatedJobs$!: Observable<Job[]>;
  pageSize$!: Observable<number>;
  currentPage$!: Observable<number>;
  totalPages$!: Observable<number>;
  totalPages!: number;
  currentPage!: number;
  pageSize!: number;
  jobs$: Observable<Job[]> = this._Store.select(state => state.Jobs.jobs);
  loading$: Observable<boolean> = this._Store.select(state => state.Jobs.loading);
  error$: Observable<any> = this._Store.select(state => state.Jobs.Errortext);
  displayedJobs$!: Observable<Job[]>;
  filteredJobs!: Job[];
  constructor(
    private _Store: Store<{ Title: string, Location: string, Jobs: JobsState, Pagination: PaginationSatet, searchResult: Job[] }>
  ) {
    this.paginatedJobs$ = this._Store.select('Pagination').pipe(
      map(state => state.jobs.slice((state.currentPage - 1) * state.pageSize, state.currentPage * state.pageSize))
    );
    this.pageSize$ = this._Store.select('Pagination').pipe(
      map(state => state.pageSize)
    );
    this.currentPage$ = this._Store.select('Pagination').pipe(
      map(state => state.currentPage)
    );


    this.currentPage$.subscribe((value) => {
      this.currentPage = value;
    });
    this.pageSize$.subscribe((value) => {
      this.pageSize = value;
    });

    this.getTotalPagesCount();

  }

  ngOnInit() {
    this.getUserInputForTitle();
    this.getUserInputForLocation();
    this._Store.dispatch(loadJobs());
    this.getAllJobs();

  }

  getTotalPagesCount() {
    this._Store.select('searchResult').subscribe((data) => {
      this.totalPages = Math.ceil(data.length / 6)
    })
  }

  getAllJobs() {
    this.jobs$.subscribe(jobs => {
      this._Store.dispatch(searchResult({ jobs: jobs }));
      this.alljobs = jobs;
      this.jobsCount = jobs.length;
      this.setDisplayedJobs();
    });
  }

  setDisplayedJobs() {
    this._Store.select('searchResult').subscribe((data) => {
      this.displayedJobs = data.slice(0, 6);
      this.jobsCount = this.jobsCount - 6;
    })
  }

  getUserInputForTitle() {
    this.title$ = this._Store.select('Title');
    this.title$.subscribe((jobTitle) => {
      if (jobTitle != '') {
        this.getJobBySearchParam({ title: jobTitle });
      } else {
        this._Store.dispatch(searchResult({ jobs: this.alljobs }));
        this.setDisplayedJobs();
        this.userSearch = false;
      }
    });
  }

  getUserInputForLocation() {
    this.location$ = this._Store.select('Location');
    this.location$.subscribe((jobLocation) => {
      if (jobLocation != '') {
        this.getJobBySearchParam({ location: jobLocation });
      } else {
        this._Store.dispatch(searchResult({ jobs: this.alljobs }));
        this.setDisplayedJobs();
        this.userSearch = false;
      }
    });
  }

  getJobBySearchParam(searchParams: searchJob) {
    this.userSearch = true;
    let condition = (job: Job) => {
      let titleMatch = searchParams.title ? job.title.toLowerCase().includes(searchParams.title.toLowerCase()) : true;
      let locationMatch = searchParams.location ? job.location.toLowerCase().includes(searchParams.location.toLowerCase()) : true;
      return titleMatch && locationMatch;
    };
    this.searchResults(condition);
  }

  searchResults(filterCondition: (job: Job) => boolean) {
    if (this.alljobs.length) {
      this.filteredJobs = this.alljobs.filter(filterCondition);
      this._Store.dispatch(searchResult({ jobs: this.filteredJobs }));
      this.setDisplayedJobs();
    }
  }

  // Dummy Data For Job Details Part ...
  getJobDetail(i: number) {
    i = this.currentPage > 1 ? i + 6 : i;
    this.currentJob = this.alljobs[i];
    this.currentJob = {
      ...this.currentJob,
      responsibilities: ['First Responsibility', 'Second Responsibility', 'Third Responsibility'],
      requirements: ['First Requirement', 'Second Requirement', 'Third Requirement'],
      skills: ['First Skill', 'Second Skill', 'Third Skill']
    }

    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  goToPreviousPage() {
    this.goToPage(this.currentPage - 1);
  }

  goToNextPage() {
    this.goToPage(this.currentPage + 1);
  }

  goToPage(page: number) {
    if (this.userSearch) {
      this.dispatchJobsForPagination(this.filteredJobs, page);
    } else {
      this.dispatchJobsForPagination(this.alljobs, page);
    }

  }

  dispatchJobsForPagination(dispatchdJobs: Job[], page: number) {
    this._Store.dispatch(paginateJobs({ currentPage: page, jobs: dispatchdJobs }));
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    const slicedJobs = dispatchdJobs.slice(startIndex, endIndex);
    this.displayedJobs = slicedJobs;
  }
}


