import { Component, OnInit, OnDestroy } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ActivatedRoute } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';

import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/Store/Common/App.state';

import * as TokenActions from '../../Store/Token/Token.Actions';

import * as JobActions from '../../Store/Job/Job.Action';
import { Observable, Subject } from 'rxjs';
import {
  selectCategory,
  selectDesignation,
} from '../../Store/Job/Job.Selector';
import { selectDepartment } from '../../Store/Job/Job.Selector';
import { environment } from 'src/environments/environment';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-post-new-job',
  templateUrl: './post-new-job.component.html',
  styleUrls: ['./post-new-job.component.scss'],
})
export class PostNewJobComponent implements OnInit, OnDestroy {
  designation$: Observable<object>;
  department$: Observable<object>;
  category$: Observable<object>;

  private unsubscribe$ = new Subject<void>();
  userId = localStorage.getItem('currentUser');

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) {
    this.designation$ = this.store.select(selectDesignation);
    this.department$ = this.store.select(selectDepartment);
    this.category$ = this.store.select(selectCategory);
  }

  active: any;
  public Editor: any = ClassicEditor;

  jobDetailss!: FormGroup;
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
    console.log('jobDetailss value', this.jobDetailss.value);

    const data = {
      //job details
      api_key: environment.api_key,
      user_id: this.userId,
      company_name: this.jobDetailss.get('company_name')?.value,
      designation: this.jobDetailss.get('designation')?.value,
      department: this.jobDetailss.get('department')?.value,
      role: this.jobDetailss.get('role')?.value,
      job_type: this.jobDetailss.get('job_type')?.value,
      night_shift: this.jobDetailss.get('night_shift')?.value,
      add_perks: this.jobDetailss.get('add_perks')?.value,
      joining_fee: this.jobDetailss.get('joining_fee')?.value,
      comments: this.jobDetailss.get('comments')?.value,

      //job location
      location_type: this.jobDetailss.get('location_type')?.value,
      wo_city: this.jobDetailss.get('wo_city')?.value,
      wo_address: this.jobDetailss.get('wo_address')?.value,
      wo_address2: this.jobDetailss.get('wo_address2')?.value,
      wh_place: this.jobDetailss.get('wh_place')?.value,
      wh_city: this.jobDetailss.get('wh_city')?.value,
      fj_area: this.jobDetailss.get('fj_area')?.value,

      //compensation
      paytype: this.jobDetailss.get('paytype')?.value,
      min_salary: this.jobDetailss.get('min_salary')?.value,
      max_salary: this.jobDetailss.get('max_salary')?.value,
      incentive: this.jobDetailss.get('incentive')?.value,
    };

    this.store.dispatch(
      JobActions.setAddJobDetails({
        data,
      })
    );
    this.active = 'candidateRequirements';
  }

  onJobTitleChange(event: any) {
    console.log('Job title changed:', event.target.value);
    const ids = Number(event.target.value);

    this.store.dispatch(
      JobActions.getDepartmentList({
        api_key: environment.api_key,
        id: ids,
      })
    );
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
    const workLocationControl = this.jobDetailss.get('location_type');

    if (workLocationControl) {
      const selectedValue = workLocationControl.value;
      console.log('radio value', selectedValue);

      if (selectedValue === '1') {
        this.displayHomeLocation = true;
        this.displayOfficeLocation = false;
        this.displayFieldJob = false;
      }

      if (selectedValue === '3') {
        this.specificCity = false;
        this.displayFieldJob = true;
        this.displayOfficeLocation = false;
        this.displayHomeLocation = false;
      }

      if (selectedValue === '2') {
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
      designation: ['', Validators.required],
      work_location: [''],
      jobTitle: [''],
      wo_address: [''],
      job_type: [''],
      wh_city: [''],
      fj_area: [''],
      role: [''],
      City: [''],
      wh_place: [''],
      specificArea: [''],
      wo_city: [''],
      night_shift: [''],
      location_type: [''],
      wo_address2: [''],
      paytype: [''],

      add_perks: [''],
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
      comments: [''],
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
  desinationList: any;
  departmentList: any;
  categoryList: any;
  ngOnInit() {
    this.initForm();

    this.store.dispatch(TokenActions.getToken());

    this.store.dispatch(
      JobActions.getDesignationList({
        designation: JobActions.getDesignationList,
      })
    );

    // Subscribe to the observable to get the value
    this.designation$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((designation) => {
        this.desinationList = designation;
        console.log('designation list', this.desinationList);
      });

    this.department$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((department) => {
        this.departmentList = department;

        console.log('department list', this.departmentList);
      });

    this.category$.pipe(takeUntil(this.unsubscribe$)).subscribe((category) => {
      this.categoryList = category;

      console.log('categoryList list', this.categoryList);
    });

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

    // Check if userMobile is not null before using it
    if (this.userId !== null) {
      // Parse the JSON string into an object
      const userData = JSON.parse(this.userId);

      // Now you can access properties of userData safely
      this.userId = userData?.data.id;
      console.log('user number', this.userId);
    } else {
      console.error('User data not found in localStorage');
    }
  }
  ngOnDestroy() {
    // Unsubscribe from observables to avoid memory leaks
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
