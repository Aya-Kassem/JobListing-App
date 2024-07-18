import { Job } from "../../../Models/job.interface";

export interface PaginationSatet {
    jobs: Job[];
    pageSize: number;
    currentPage: number;
}



