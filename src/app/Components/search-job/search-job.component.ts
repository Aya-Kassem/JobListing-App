import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { searchByLocation, searchByTitle } from '../../Store/Search/search.action';

@Component({
  selector: 'searchJob',
  standalone: true,
  imports: [],
  templateUrl: './search-job.component.html',
  styleUrl: './search-job.component.css'
})
export class SearchJobComponent {

  constructor(private _Store: Store){}

  getJobByTitle(jobTitle: string){
    this._Store.dispatch(searchByTitle({title: jobTitle}))
  }

  getJobByLocation(country: string){
    this._Store.dispatch(searchByLocation({location: country}))
  }
}
