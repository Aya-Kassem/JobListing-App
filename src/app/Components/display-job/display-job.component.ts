import { Component } from '@angular/core';
import { GetAvailableJobsService } from '../../Services/get-available-jobs.service';
import { CommonModule } from '@angular/common';
import { SearchJobComponent } from '../search-job/search-job.component';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { searchJob } from '../../Models/search.interface';
import { Job } from '../../Models/job.interface';


@Component({
  selector: 'displayJob',
  standalone: true,
  imports: [CommonModule],

  templateUrl: './display-job.component.html',
  styleUrl: './display-job.component.css'
})
export class DisplayJobComponent {
  constructor(
    private _GetAvailableJobsService: GetAvailableJobsService,
    private _Store: Store<{ Title: string, Location: string }>) { }

  alljobs: any;
  displayedJobs: any;
  title$!: Observable<string>;
  location$!: Observable<string>;
  userSearch: boolean = false;
  searchResult!: Job[];


  ngOnInit() {
    this.getAllJobs();
    this.getUserInputForTitle();
    this.getUserInputForLocation();
  }

  getAllJobs() {
    this._GetAvailableJobsService.fetchAllJobs().subscribe((allJobs: Job[]) => {
      this.alljobs = allJobs;
      console.log(allJobs);
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
      this.getJobBySearchParam({ title: jobTitle })
    });
  }

  getUserInputForLocation() {
    this.location$ = this._Store.select('Location');
    this.location$.subscribe((jobLocation) => {
      this.getJobBySearchParam({ location: jobLocation })
    })
  }

  getJobBySearchParam(searchParams: searchJob) {
    this.userSearch = true;
    // if(searchParams.title != '' && searchParams.location != ''){
    //   console.log('dddddd');
    // }else{
    //   console.log('sssssss');
    //   this.userSearch = false;
    // }

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

}
