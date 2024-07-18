// display-job.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { searchJob } from '../../Models/search.interface';
import { Job } from '../../Models/job.interface';
import { CustomModalComponent } from '../../Shared/Modal/custom-modal.component';
import { loadJobs } from '../../Shared/Store/Jobs/jobs.actions';
import { JobsState } from '../../Shared/Store/Jobs/jobs.state';
import { MoreLessDirective } from '../../Shared/Directives/more-less.directive';
import { RemoveHyphen } from '../../Shared/Pipes/removeHyphen.pipe';
import { CapitalizeFirstLetter } from '../../Shared/Pipes/CapitalizeFirstLetter.pipe';

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
  constructor(
    private _Store: Store<{ Title: string, Location: string, Jobs: JobsState }>
  ) { }

  alljobs: Job[] = [];
  displayedJobs: Job[] = [];
  searchResult: Job[] = [];
  title$!: Observable<string>;
  location$!: Observable<string>;
  userSearch: boolean = false;
  currentJob!: Job;
  showModal: boolean = false;
  jobsCount!: number;
  searchResultCount!: number;

  jobs$: Observable<Job[]> = this._Store.select(state => state.Jobs.jobs);
  loading$: Observable<boolean> = this._Store.select(state => state.Jobs.loading);
  error$: Observable<any> = this._Store.select(state => state.Jobs.Errortext);

  ngOnInit() {
    this.getUserInputForTitle();
    this.getUserInputForLocation();
    this._Store.dispatch(loadJobs());

    this.getAllJobs();
  }

  getAllJobs() {
    this.jobs$.subscribe(jobs => {   
      console.log(jobs);
         
      this.alljobs = jobs;
      this.jobsCount = jobs.length;
      this.displayedJobs = this.alljobs.slice(0, 6);
      this.jobsCount = this.jobsCount - 6;
    });
  }

  loadMore() {
    if (!this.userSearch && this.alljobs.length > this.displayedJobs.length) {
      this.displayedJobs = [...this.alljobs.slice(6)];
      this.jobsCount = this.jobsCount > 6 ? this.jobsCount - 6 : 0;
    } else if (this.userSearch && this.searchResultCount > this.displayedJobs.length) {
      this.displayedJobs = [...this.displayedJobs.slice(6)];
      this.jobsCount = this.jobsCount > 6 ? this.jobsCount - 6 : 0;
    }
  }

  loadLess() {
    this.jobsCount = this.alljobs.length - this.displayedJobs.length;
    if (!this.userSearch) {
      this.displayedJobs = this.alljobs.slice(0, 6);
      this.jobsCount = this.alljobs.length - this.displayedJobs.length;
    } else {
      this.displayedJobs = this.searchResult.slice(0, 6);
      this.jobsCount = this.alljobs.length - this.displayedJobs.length;
    }
  }

  getUserInputForTitle() {
    this.title$ = this._Store.select('Title');
    this.title$.subscribe((jobTitle) => {
      if (jobTitle != '') {
        this.getJobBySearchParam({ title: jobTitle });
      } else {
        this.displayedJobs = this.alljobs.slice(0, 6);
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
        this.displayedJobs = this.alljobs.slice(0, 6);
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
      this.displayedJobs = this.alljobs.filter(filterCondition);
      this.searchResultCount = this.displayedJobs.length;
    }
  }

  // Dummy Data For Job Details Part ...
  getJobDetail(i: number) {
    this.currentJob = this.alljobs[i];
    this.currentJob = {
      ...this.currentJob,
      responsibilities : ['First Responsibility', 'Second Responsibility', 'Third Responsibility'],
      requirements : ['First Requirement', 'Second Requirement', 'Third Requirement'],
      skills : ['First Skill', 'Second Skill', 'Third Skill']
    }

    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }
}
