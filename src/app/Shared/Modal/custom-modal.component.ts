import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Job } from '../../Models/job.interface';
import { FormBuilder, FormControl, FormGroup, FormsModule, MinValidator, ReactiveFormsModule, Validators } from '@angular/forms';
import { min, Observable } from 'rxjs';
import { MainService } from '../../Services/mainService';
import { Store } from '@ngrx/store';
import { appliedJobs } from '../Store/AppliedJobs/appliedJobs.state';
import { submitApplication } from '../Store/AppliedJobs/appliedJobs.actions';

@Component({
  selector: 'customModal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './custom-modal.component.html',
  styleUrl: './custom-modal.component.css'
})
export class CustomModalComponent {
  @Input() job: Job | null = null;
  @Output() close = new EventEmitter<void>();
  cvExceedLimit: boolean = false;
  isVisible: boolean = false;
  OpenForm: boolean = false;
  applicationForm!: FormGroup;
  appllied$!: Observable<boolean>;
  jobId$!: Observable<Number>;
  appliedJobs: number[] = [];

  constructor(private _FormBuilder: FormBuilder, private _MainService: MainService, private _Store: Store<{ AppliedJobs: appliedJobs }>) { }

  ngOnInit() {
    if (this.job) this.openModal()
    this.createForm();
    this.appllied$ = this._Store.select(state => state.AppliedJobs.isApplied);
    this.jobId$ = this._Store.select(state => Number(state.AppliedJobs.jobId));
    this.appliedJobs = this.checkAppliedJobs();
  }

  openModal() {
    this.isVisible = true;
  }

  closeModal() {
    this.isVisible = false;
    this.close.emit();
  }

  createForm() {
    this.applicationForm = this._FormBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, this.phoneValidator]],
      country: ['', [Validators.required]],
      education: ['', [Validators.required]],
      currentPosition: ['', [Validators.required]],
      company: ['', [Validators.required]],
      cv: [null, [Validators.required]],
      coverLetter: ['', this.CoverLetterValidator]
    })
  }

  phoneValidator(control: FormControl) {
    const phoneNumber = control.value;
    if (phoneNumber && phoneNumber.length != 11) {
      return { 'invalidPhoneNumber': true };
    }
    return null;
  }

  CoverLetterValidator(control: FormControl) {
    const coverLetter = control.value.split(' ');
    if (coverLetter.length > 100) {
      return { 'invalidLength': true };
    } else {
      return null;
    }
  }
  openApplicationForm() {
    this.isVisible = false;
    this.OpenForm = true;
  }

  closeApplicationForm() {
    this.OpenForm = false;
    this.close.emit();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      // Convert size from bytes to MB
      const fileSizeInMB = file.size / (1024 * 1024);
      this.cvExceedLimit = fileSizeInMB > 3 ? true : false;
    }
  }

  submitApplicationForm() {
    const userData = this.applicationForm.value;
    const jobData = {
      jobId: this.job?.incremental_id?.toString() || '',
      isApplied: true
    };

    this._Store.dispatch(submitApplication({ userData, jobData }));
  }

  checkAppliedJobs(): number[] {
    const storedJobs = localStorage.getItem('Jobs');
    if (storedJobs) {
      return JSON.parse(storedJobs);
    }
    return [];
  }


  isJobApplied(jobId: number): boolean {
    const storedJobs = this.appliedJobs.map(id => Number(id));
    return storedJobs.includes(jobId);
  }
  


}


