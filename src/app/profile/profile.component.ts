import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/core/service/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../Store/Common/App.state';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import * as TokenActions from '../Store/Token/Token.Actions';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  userMobile = localStorage.getItem('userMobile');
  profileDetails: any;
  profileForm!: UntypedFormGroup;

  constructor(
    private authService: AuthService,
    private store: Store<AppState>,
    private formBuilder: UntypedFormBuilder
  ) {}

  ngOnInit(): void {
    this.store.dispatch(TokenActions.getToken());
    this.getProfileDetails();

    this.profileForm = this.formBuilder.group({
      // company_name: ['', Validators.required],
      // mobile: [''],
      website: [''],
      no_of_employees: ['', Validators.required],
      email: [
        '',
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
      gst: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(\d{2}[A-Z]{5}\d{4}[A-Z]{1}[1-9A-Za-z]{1}[Z]{1}[0-9a-zA-Z])$/
          ),
        ],
      ],
    });
  }

  get f() {
    return this.profileForm.controls;
  }

  get gst() {
    return this.profileForm.get('gst');
  }

  get email() {
    return this.profileForm.get('email');
  }

  getProfileDetails() {
    console.log('inside the profile page', this.userMobile);

    const data = {
      api_key: environment.api_key,
      role_id: environment.role_id,
      mobile: this.userMobile,
    };

    this.authService.getProfileDetails(data).subscribe({
      next: (res: any) => {
        if (res) {
          console.log('response of register api', res);
          this.profileDetails = res;
        } else {
          console.log('response of register api error');
        }
      },
    });
  }

  saveProfile() {
    if (this.profileForm.valid) {
      console.log('profile form value', this.profileForm.value);
    } else {
      return;
    }
  }
}
