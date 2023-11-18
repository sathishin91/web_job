import { Component, OnInit } from '@angular/core';
import Stepper from 'bs-stepper';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
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
  public Editor: any = ClassicEditor;

  postNewJobs!: UntypedFormGroup;
  name = 'Angular';
  private stepper!: Stepper;
  displayOfficeLocation = false;
  displayFieldJob = false;
  displayHomeLocation = false;
  displayIncentive = false;
  displayFixedIncentive = false;
  displayFixed = false;
  salaryPreview = false;
  specificCity = false;
  anywhere = false;
  commOthers = false;
  notifyOthers = false;

  next(event: Event) {
    event.preventDefault();
    if (this.stepper) {
      this.stepper.next();
    }
  }

  onSubmit() {
    console.log('Form Value', this.postNewJobs.value);
  }
  onSalaryChange() {
    this.salaryPreview = true;
    const salaryTypeControl = this.postNewJobs.get('salaryType');
    console.log('Salary type changed');
    if (salaryTypeControl) {
      const selectedValue = salaryTypeControl.value;
      console.log('radio value', selectedValue);
      if (selectedValue === 'incentive_only') {
        this.displayIncentive = true;
        this.displayFixedIncentive = false;
        this.displayFixed = false;
      }
      if (selectedValue === 'fixed_only') {
        this.displayIncentive = false;
        this.displayFixedIncentive = false;
        this.displayFixed = true;
      }
      if (selectedValue === 'fixed_incentive') {
        this.displayIncentive = false;
        this.displayFixedIncentive = true;
        this.displayFixed = false;
      }
    }
  }

  onRadioChange() {
    const workLocationControl = this.postNewJobs.get('work_location');

    if (workLocationControl) {
      const selectedValue = workLocationControl.value;
      console.log('radio value', selectedValue);
      if (selectedValue === 'Work From Home') {
        this.displayHomeLocation = true;
        this.displayOfficeLocation = false;
        this.displayFieldJob = false;
      }
      if (selectedValue === 'Field Job') {
        this.specificCity = false;
        this.displayFieldJob = true;
        this.displayOfficeLocation = false;
        this.displayHomeLocation = false;
      }
      if (selectedValue === 'Work From Office') {
        this.specificCity = false;
        this.displayOfficeLocation = true;
        this.displayFieldJob = false;
        this.displayHomeLocation = false;
      }
    }
  }
  commPrefChange() {
    const commPrefChangeControl = this.postNewJobs.get('comm_pref');

    if (commPrefChangeControl) {
      const selectedValue = commPrefChangeControl.value;
      console.log('comm_pref value', selectedValue);
      if (selectedValue === 'Comm_others') {
        this.commOthers = true;
      } else {
        this.commOthers = false;
      }
    }
  }

  notifyPrefChange() {
    const commPrefChangeControl = this.postNewJobs.get('notify_pref');

    if (commPrefChangeControl) {
      const selectedValue = commPrefChangeControl.value;
      console.log('notify_pref value', selectedValue);
      if (selectedValue === 'notify_others') {
        this.notifyOthers = true;
      } else {
        this.notifyOthers = false;
      }
    }
  }

  WFHChange() {
    const workFromHomeControl = this.postNewJobs.get('wfh_change');

    if (workFromHomeControl) {
      const selectedValue = workFromHomeControl.value;
      if (selectedValue === 'Specific city') {
        this.specificCity = true;
        this.anywhere = false;
      } else {
        this.specificCity = false;
        this.anywhere = true;
      }
    }
  }

  initForm() {
    this.postNewJobs = this.fb.group({
      company_name: [
        '',
        [Validators.required, Validators.pattern('[a-zA-Z]+')],
      ],
      last: [''],
      department: ['', Validators.required],
      work_location: [''],
      comm_pref: [''],
      salaryType: [''],
      nightShift: [''],
      min_salary: [''],
      specificCity: [''],
      wfh_change: [''],
      notify_pref: [''],
      plot_number: [''],
      max_salary: [''],
      incentive: [''],
      over_time: [''],
      joining_fee: [''],
      comment: [''],
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
    console.log('form value', this.postNewJobs.value);
    const stepperElement = document.querySelector('#stepper1');

    if (stepperElement) {
      this.stepper = new Stepper(stepperElement, {
        linear: false,
        animation: true,
      });
    }
  }
}
