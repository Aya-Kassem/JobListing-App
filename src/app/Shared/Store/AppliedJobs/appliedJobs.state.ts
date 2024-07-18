export interface appliedJobs {
  jobId: string;
  isApplied: boolean;
  loading?: boolean;
  Errortext?: string,
  saveJob?: boolean
}

export const initialState: appliedJobs = {
  jobId: '',
  isApplied: false,
  loading: false
};
