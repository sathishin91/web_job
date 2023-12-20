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
  selectCity,
  selectDesignation,
  selectEnglishLevel,
  selectExpLevel,
  selectMinEducation,
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
  education$: Observable<object>;
  city$: Observable<object>;
  expLevel$: Observable<object>;

  private unsubscribe$ = new Subject<void>();
  userId = localStorage.getItem('currentUser');

  cityList: any;
  educationList: any;
  englishLevel$: any;
  englishList: any;
  expList: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store
  ) {
    this.designation$ = this.store.select(selectDesignation);
    this.department$ = this.store.select(selectDepartment);
    this.category$ = this.store.select(selectCategory);
    this.city$ = this.store.select(selectCity);
    this.education$ = this.store.select(selectMinEducation);
    this.englishLevel$ = this.store.select(selectEnglishLevel);
    this.expLevel$ = this.store.select(selectExpLevel);
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
  error = '';
  errorCandidate = '';
  errorInterview = '';
  errorSubmit = '';
  desinationList: any;
  departmentList: any;
  categoryList: any;

  initForm() {
    this.jobDetailss = this.fb.group({
      company_name: ['', [Validators.required]],
      last: [''],
      department: ['', Validators.required],
      designation: ['', Validators.required],
      work_location: [''],
      jobTitle: [''],
      wo_address: [''],
      job_type: ['', Validators.required],
      wh_city: [''],
      fj_area: [''],
      role: [''],
      City: [''],
      wh_place: [''],
      specificArea: [''],
      wo_city: [''],
      night_shift: [''],
      location_type: ['', Validators.required],
      wo_address2: [''],
      paytype: ['', Validators.required],

      add_perks: [''],

      nightShift: [''],
      min_salary: [''],
      specificCity: [''],
      wfh_change: [''],

      plot_number: [''],
      max_salary: [''],
      incentive: [''],
      over_time: [''],
      joining_fee: [''],
      comments: [''],
    });

    this.interviewDetails = this.fb.group({
      com_pref: ['', Validators.required],
      com_pref_fn: [''],
      com_pref_mob: [''],
      noti_pref: ['', Validators.required],
      noti_pref_fn: [''],
      noti_pref_mob: [''],
      interview_method: ['', Validators.required],
    });

    this.candidateDetails = this.fb.group({
      education: ['', Validators.required],
      experience: ['', Validators.required],
      eng_lvl: ['', Validators.required],
      description: [''],
    });
  }

  next() {
    const data = {
      //job details
      api_key: environment.api_key,
      user_id: 67,
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

    if (this.jobDetailss.invalid) {
      this.error = 'Please fill all the required fields';
      return;
    } else {
      this.store.dispatch(
        JobActions.setAddJobDetails({
          data,
        })
      );
      console.log('data passed to api', data);
      this.active = 'candidateRequirements';
    }
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
    console.log('candidateDetails value', this.candidateDetails.value);
    const data = {
      api_key: environment.api_key,
      user_id: 67,
      job_id: 55,
      education: this.candidateDetails.get('education')?.value,
      experience: this.candidateDetails.get('experience')?.value,
      eng_lvl: this.candidateDetails.get('eng_lvl')?.value,
      description: this.candidateDetails.get('description')?.value,
    };

    console.log('data for candidate requirements', data);
    if (this.candidateDetails.invalid) {
      this.errorCandidate = 'Please fill all the required fields';
      return;
    } else {
      this.store.dispatch(
        JobActions.setAddCandidateDetails({
          data,
        })
      );
      this.active = 'interviewerInformation';
    }
  }
  next3() {
    const data = {
      api_key: environment.api_key,
      //user_id: this.userId,
      user_id: 67,
      job_id: 43,
      com_pref: this.interviewDetails.get('com_pref')?.value,
      com_pref_fn: this.interviewDetails.get('com_pref_fn')?.value,
      com_pref_mob: this.interviewDetails.get('com_pref_mob')?.value,
      noti_pref: this.interviewDetails.get('noti_pref')?.value,
      noti_pref_fn: this.interviewDetails.get('noti_pref_fn')?.value,
      noti_pref_mob: this.interviewDetails.get('noti_pref_mob')?.value,
      interview_method: this.interviewDetails.get('interview_method')?.value,
    };
    console.log('data passing to interview info form', data);
    if (this.interviewDetails.invalid) {
      this.errorInterview = 'Please fill all the required fields';
      return;
    } else {
      this.store.dispatch(
        JobActions.setAddInterviewDetails({
          data,
        })
      );
      this.active = 'jobPreview';
      const preview = {
        api_key: environment.api_key,
        job_id: 55,
      };
      this.store.dispatch(
        JobActions.setPreviewDetails({
          preview,
        })
      );
    }
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
    const salaryTypeControl = this.jobDetailss.get('paytype');
    console.log('Salary type changed');
    if (salaryTypeControl) {
      const selectedValue = salaryTypeControl.value;
      console.log('radio value', selectedValue);
      if (selectedValue === '3') {
        this.displayIncentive = true;
        this.displayFixedIncentive = false;
        this.displayFixed = false;
      }
      if (selectedValue === '1') {
        this.displayIncentive = false;
        this.displayFixedIncentive = false;
        this.displayFixed = true;
      }
      if (selectedValue === '2') {
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
    const commPrefChangeControl = this.interviewDetails.get('com_pref');

    if (commPrefChangeControl) {
      const selectedValue = commPrefChangeControl.value;
      console.log('comm_pref value', selectedValue);
      if (selectedValue === '2') {
        this.commOthers = true;
      } else {
        this.commOthers = false;
      }
    }
  }

  notifyPrefChange() {
    const commPrefChangeControl = this.interviewDetails.get('noti_pref');

    if (commPrefChangeControl) {
      const selectedValue = commPrefChangeControl.value;
      console.log('notify_pref value', selectedValue);
      if (selectedValue === '2') {
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
      if (selectedValue === '1') {
        this.specificCity = true;
        this.anywhere = false;
      } else {
        this.specificCity = false;
        this.anywhere = true;
      }
    }
  }

  ngOnDestroy() {
    // Unsubscribe from observables to avoid memory leaks
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  subscribe() {
    this.router.navigate(['/jobs']);
  }

  ngOnInit() {
    this.initForm();

    this.store.dispatch(TokenActions.getToken());

    this.store.dispatch(
      JobActions.getCityList({
        city: JobActions.getCityList,
      })
    );

    this.store.dispatch(
      JobActions.getDesignationList({
        designation: JobActions.getDesignationList,
      })
    );

    this.store.dispatch(
      JobActions.getEducationList({
        education: JobActions.getEducationList,
      })
    );

    this.store.dispatch(
      JobActions.getEnglishLevelList({
        englishLevel: JobActions.getEnglishLevelList,
      })
    );

    this.store.dispatch(
      JobActions.getExperienceList({
        experience: JobActions.getExperienceList,
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

    this.city$.pipe(takeUntil(this.unsubscribe$)).subscribe((city: any) => {
      this.cityList = city;
      console.log('city list', this.cityList);
    });

    this.education$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((education: any) => {
        this.educationList = education;
        console.log('education list', this.educationList);
      });

    this.englishLevel$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((englishLevel: any) => {
        this.englishList = englishLevel;
        console.log('englishLevel list', this.englishList);
      });

    this.expLevel$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((experience: any) => {
        this.expList = experience;
        console.log('experience list', this.expList);
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
      this.userId = userData?.data?.id;
      console.log('user number', this.userId);
    } else {
      console.error('User data not found in localStorage');
    }
  }
}
