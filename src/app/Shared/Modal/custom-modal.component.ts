import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
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
  @Input() job!: Job;
  isVisible: boolean = false;
  OpenForm: boolean = false;
  applicationForm!: FormGroup;
  constructor(private _FormBuilder: FormBuilder) { }

  ngOnInit() {
    if (this.job.title != '') {
      this.openModal()
    }

    this.createForm()
  }

  openModal() {
    this.isVisible = true;
  }

  closeModal() {
    this.isVisible = false;
  }


  createForm() {
    this.applicationForm = this._FormBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.min(10)]],
      country: [''],
      education: [''],
      currentPosition: [''],
      company: [''],
      cv: [null],
      coverLetter: ['']
    })
  }

  openApplicationForm() {
    this.isVisible = false;
    this.OpenForm = true;
  }

  closeApplicationForm() {
    this.OpenForm = false;
  }


  submitApplicationForm() {
    console.log(this.applicationForm.value);
  }

}
