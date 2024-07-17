import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Job } from '../../../Models/job.interface';
import { FormControl, FormGroup, FormsModule, MinValidator, ReactiveFormsModule, Validators } from '@angular/forms';
import { min } from 'rxjs';

@Component({
  selector: 'customModal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './custom-modal.component.html',
  styleUrl: './custom-modal.component.css'
})
export class CustomModalComponent {
  @Input() job!: Job;
  isVisible: boolean = false;
  OpenForm: boolean = false;

  ngOnInit() {
    if (this.job.title != '') {
      this.openModal()
    }
  }

  openModal() {
    this.isVisible = true;
  }

  closeModal() {
    this.isVisible = false;
  }


  applicationData = new FormGroup  ({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('',  [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('',  [Validators.required, Validators.min(10)]),
    country: new FormControl(''),
    education: new FormControl(''),
    currentPosition: new FormControl(''),
    company: new FormControl(''),
    cv: new FormControl(null),
    coverLetter: new FormControl('')
  });


  openApplicationForm() {
    this.isVisible = false;
    this.OpenForm = true;
  }

  closeApplicationForm() {
    this.OpenForm = false;
  }

 
  submitApplicationForm() {
    console.log(this.applicationData);
  }

}
