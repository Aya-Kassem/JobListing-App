import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Job } from '../Models/job.interface';

@Injectable({
  providedIn: 'root'
})
export class GetAvailableJobsService {

  constructor(private _HttpClient: HttpClient) { }
  // https://api-next.jobsglobal.com:54902/api/v1/jobs/all?page=1
  // https://api-next.jobsglobal.com:54902/api/v1/jobs/all?pagination_type=paginate&per_page=11

  apiUrl: string = 'https://api-next.jobsglobal.com:54902/api/v1/jobs/all?pagination_type=paginate&per_page=11';
  fetchAllJobs(): Observable<Job[]> {
    return this._HttpClient.get<any>(this.apiUrl).pipe(
      map(response => response.data.map((item: any) => ({
        title: item.title,
        location: item.page.location.country_and_city,
        date: item.date_published,
        type: item.type,
        description: item.description,
        company: item.page.name
      })))
    );
  }
}
