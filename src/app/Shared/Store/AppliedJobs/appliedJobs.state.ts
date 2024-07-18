export interface appliedJobs {
  jobId: string;
  isApplied: boolean;
  submitStatus?: boolean;
  Errortext?: string,
  saveJob?: boolean
}

export const initialState: appliedJobs = {
  jobId: '',
  isApplied: false,
  submitStatus: true,
  Errortext: ''
};
