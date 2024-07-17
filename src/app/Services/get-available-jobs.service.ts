import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Job } from '../Models/job.interface';

@Injectable({
  providedIn: 'root'
})
export class GetAvailableJobsService {

  constructor(private _HttpClient: HttpClient) { }
  wrongApi: string = 'https://api-next.jobsglobal.com:54902/api/v1/jobs/all?page=2';
  api: string = 'https://api-next.jobsglobal.com:54902/api/v1/jobs/all?pagination_type=paginate&per_page=11';
  fetchAllJobs(): Observable<Job[]> {
    return this._HttpClient.get<any>(this.api).pipe(
      map(response => response.data.map((job: any) => ({
        title: job.title,
        location: job.page.location.country_and_city,
        date: job.date_published,
        type: job.type,
        description: JSON.parse(job.work_space_meta_data).job_group_name,
        company: job.page.name,
        incremental_id: job.incremental_id
      })))
    );
  }

}
