import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Job } from '../Models/job.interface';
import {  UserData } from '../Models/userData.interface';
import { appliedJobs } from '../Shared/Store/AppliedJobs/appliedJobs.state';

@Injectable({
  providedIn: 'root'
})
export class MainService {

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
      }))),catchError(error => {
        console.error('Error fetching jobs:', error);
        return throwError(() => new Error('Failed to fetch jobs, please try again later.'));
      })
    );
  }



  SubmitJobApplication(data: UserData, job: appliedJobs) {
    let obj = { ...job, ...data };
    let email = data.email.replaceAll('.', '-');
    const request = {
      [email]: {
        applications: [obj]
      }
    };
    return this._HttpClient.post(`https://joblisting-b302e-default-rtdb.firebaseio.com/${email}/userJobs.json`, request).pipe(
      map(response => {
        return {
          id: job.jobId
        }}),catchError(error => {
          console.error('Error Saving Data:', error);
          return throwError(() => new Error('Failed to Submit Your Application, please try again later.'));
        })
    )
  }






}
