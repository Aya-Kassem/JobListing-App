import { Job } from './../../../Models/job.interface'
export interface JobsState {
    jobs: Job[];
    loading: boolean;
    Errortext: any;
}