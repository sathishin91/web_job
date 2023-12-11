import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ActivatedRoute } from '@angular/router';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';

import { Router } from '@angular/router';

@Component({
  selector: 'app-post-new-job',
  templateUrl: './post-new-job.component.html',
  styleUrls: ['./post-new-job.component.scss'],
})
export class PostNewJobComponent implements OnInit {
  constructor(
    private fb: UntypedFormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  active: any;
  public Editor: any = ClassicEditor;

  jobDetailss!: UntypedFormGroup;
  candidateDetails!: UntypedFormGroup;
  interviewDetails!: UntypedFormGroup;
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

  next() {
    this.active = 'candidateRequirements';
  }

  next2() {
    this.active = 'interviewerInformation';
  }
  next3() {
    this.active = 'jobPreview';
  }
  next4() {
    this.active = 'selectPlan';
  }

  submit() {
    console.log('submit the form');
    this.router.navigate(['/jobs']);
  }

  onSubmit() {
    console.log('Form Value', this.jobDetailss.value);
  }
  onSalaryChange() {
    this.salaryPreview = true;
    const salaryTypeControl = this.jobDetailss.get('salaryType');
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
    const workLocationControl = this.jobDetailss.get('work_location');

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
    const commPrefChangeControl = this.interviewDetails.get('comm_pref');

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
    const commPrefChangeControl = this.interviewDetails.get('notify_pref');

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
    const workFromHomeControl = this.jobDetailss.get('wfh_change');

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
    this.jobDetailss = this.fb.group({
      company_name: [
        '',
        [Validators.required, Validators.pattern('[a-zA-Z]+')],
      ],
      last: [''],
      department: ['', Validators.required],
      work_location: [''],
      jobTitle: [''],
      job_type: [''],
      role: [''],
      City: [''],
      specificArea: [''],

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

    this.interviewDetails = this.fb.group({
      comm_pref: [''],
      notify_pref: [''],
    });

    this.candidateDetails = this.fb.group({
      minEducation: [''],
      totalExpeience: [''],
      englishLevel: [''],
      additionalRequirements: [''],
    });
  }

  ngOnInit() {
    //Access the id from the params
    this.route.params.subscribe((params) => {
      const id = params['id'];

      console.log('ID from params:', id);
      if (id == 1) {
        console.log('id is 1');
        this.active = 'jobDetail';
      }
      if (id == 4) {
        console.log('id is 4');
        this.active = 'jobPreview';
      }
    });

    this.initForm();
  }
}
