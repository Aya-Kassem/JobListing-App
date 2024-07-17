import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Job } from '../../Models/job.interface';
import { FormBuilder, FormControl, FormGroup, FormsModule, MinValidator, ReactiveFormsModule, Validators } from '@angular/forms';
import { min } from 'rxjs';

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
  constructor(private _FormBuilder: FormBuilder) { }

  ngOnInit() {
    if(this.job) this.openModal()
    this.createForm()
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

  CoverLetterValidator(control: FormControl){
    const coverLetter = control.value.split(' ');
    if(coverLetter.length > 100){
      return { 'invalidLength': true };
    }else{
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

  onFileSelected(event: Event){
    const input = event.target as HTMLInputElement;
    if(input.files && input.files.length > 0){
      const file = input.files[0];
      // Convert size from bytes to MB
      const fileSizeInMB = file.size / (1024 * 1024); 
      this.cvExceedLimit = fileSizeInMB > 3 ? true : false;
    }
  }

  submitApplicationForm() {
    console.log(this.applicationForm.value);
    // this.applicationForm.controls['cv']
  }

}
