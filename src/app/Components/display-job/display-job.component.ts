import { Component } from '@angular/core';
import { GetAvailableJobsService } from '../../Services/get-available-jobs.service';
import { CommonModule } from '@angular/common';
import { SearchJobComponent } from '../search-job/search-job.component';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { searchJob } from '../../Models/search.interface';
import { Job } from '../../Models/job.interface';
import { CustomModalComponent } from '../../Shared/Modal/custom-modal/custom-modal.component';


@Component({
  selector: 'displayJob',
  standalone: true,
  imports: [CommonModule, CustomModalComponent],
  templateUrl: './display-job.component.html',
  styleUrl: './display-job.component.css'
})
export class DisplayJobComponent {
  constructor(
    private _GetAvailableJobsService: GetAvailableJobsService,
    private _Store: Store<{ Title: string, Location: string }>) { }

  alljobs: Job[] = [];
  displayedJobs: Job[] = [];
  searchResult: Job[] = [];
  title$!: Observable<string>;
  location$!: Observable<string>;
  userSearch: boolean = false;
  currentJob!: Job;
  showModal: boolean = false;

  ngOnInit() {
    this.getAllJobs();
    this.getUserInputForTitle();
    this.getUserInputForLocation();
  }

  getAllJobs() {
    this._GetAvailableJobsService.fetchAllJobs().subscribe((Jobs: Job[]) => {
      this.alljobs = Jobs;
      console.log(Jobs);
      this.displayedJobs = this.alljobs.slice(0, 6);
    })
  }

  loadMore() {
    if (!this.userSearch && this.alljobs.length > this.displayedJobs.length) {
      this.displayedJobs = [...this.displayedJobs, ...this.alljobs.slice(6)];
    } else if (this.userSearch && this.searchResult.length > this.displayedJobs.length) {
      this.displayedJobs = [...this.displayedJobs, ...this.searchResult.slice(6)];
    }
  }

  loadLess() {
    if (!this.userSearch) {
      this.displayedJobs = this.alljobs.slice(0, 6);
    } else {
      this.displayedJobs = this.searchResult.slice(0, 6);
    }
  }

  getUserInputForTitle() {
    this.title$ = this._Store.select('Title');
    this.title$.subscribe((jobTitle) => {
      if (jobTitle != '') {
        this.getJobBySearchParam({ title: jobTitle })
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
        this.getJobBySearchParam({ location: jobLocation })
      } else {
        this.displayedJobs = this.alljobs.slice(0, 6);
        this.userSearch = false;
      }
    })
  }

  getJobBySearchParam(searchParams: searchJob) {
    this.userSearch = true;
    let condition = (job: Job) => {
      let titleMatch = searchParams.title ? job.title.toLowerCase().includes(searchParams.title.toLowerCase()) : true;
      let locationMatch = searchParams.location ? job.location.toLowerCase().includes(searchParams.location.toLowerCase()) : true;
      return titleMatch && locationMatch
    }
    this.searchResults(condition);
  }

  searchResults(filterCondition: (job: Job) => boolean) {
    if (this.alljobs.length) {
      this.searchResult = this.alljobs.filter(filterCondition);
      this.displayedJobs = this.searchResult;
    }
  }

  getJobDetail(i: number){
    this.currentJob = this.alljobs[i];
    this.currentJob.responsibilities = ['First Responsibility', 'Second Responsibility', 'Third Responsibility'];
    this.currentJob.requirements = ['First Requiremnet', 'Second Requiremnet', 'Third Requiremnet'];
    this.currentJob.skills = ['First Skill', 'Second Skill', 'Third Skill'];
    this.showModal = true;
  }
}
