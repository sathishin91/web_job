import { Component, OnInit } from '@angular/core';
import Stepper from 'bs-stepper';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
@Component({
  selector: 'app-post-new-job',
  templateUrl: './post-new-job.component.html',
  styleUrls: ['./post-new-job.component.scss'],
})
export class PostNewJobComponent implements OnInit {
  constructor(private fb: UntypedFormBuilder) {}
  // Form 1
  postNewJobs!: UntypedFormGroup;
  name = 'Angular';
  private stepper!: Stepper; // Initialize stepper as null

  next(event: Event) {
    event.preventDefault();
    if (this.stepper) {
      this.stepper.next();
    }
  }

  onSubmit() {
    console.log('Form Value', this.postNewJobs.value);
  }

  initForm() {
    this.postNewJobs = this.fb.group({
      company_name: [
        '',
        [Validators.required, Validators.pattern('[a-zA-Z]+')],
      ],
      last: [''],
      department: ['', Validators.required],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(15),
        ],
      ],
      email: [
        '',
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
      address: [''],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      country: ['', [Validators.required]],
      termcondition: [false, [Validators.requiredTrue]],
    });
  }

  ngOnInit() {
    this.initForm();
    const stepperElement = document.querySelector('#stepper1');

    if (stepperElement) {
      this.stepper = new Stepper(stepperElement, {
        linear: false,
        animation: true,
      });
    }
  }
}
