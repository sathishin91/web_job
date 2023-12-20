import { AuthService } from 'src/app/core/service/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../Store/Common/App.state';

import * as TokenActions from '../../Store/Token/Token.Actions';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  public counter!: number;
  public timer!: any;
  displayTimer = false;
  getOtp = true;

  loginForm!: UntypedFormGroup;
  submitted = false;
  showResentOtp = false;
  returnUrl!: string;
  error = '';
  hide = true;
  tokens: any;
  constructor(
    private formBuilder: UntypedFormBuilder,
    private router: Router,
    private authService: AuthService,
    private store: Store<AppState>
  ) {}
  ngOnInit() {
    this.store.dispatch(TokenActions.getToken());
    this.loginForm = this.formBuilder.group({
      mobile_number: ['', Validators.required],
      otp: ['', Validators.required],
    });

    // this.store.dispatch(TokenActions.getToken());

    // this.authService.getToken().subscribe({
    //   next: (res: any) => {
    //     // Specify the type of 'res' as ApiResponse
    //     console.log('response on token', res);

    //     this.tokens = res.token;
    //     console.log('resposne token', this.tokens);
    //   },
    //   error: (err) => {
    //     console.log('error', err);
    //   },
    // });
  }
  get f() {
    return this.loginForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    this.error = '';

    if (this.loginForm.invalid) {
      this.error = 'mobile_number and otp not valid !';
      return;
    } else {
      this.authService
        .login(this.f['mobile_number'].value, this.f['otp'].value)
        .subscribe({
          next: (res: any) => {
            if (res.status !== 'failed') {
              console.log('response of login api', res);
              console.log('response of login api', res.data.id);
              localStorage.setItem('userId', res.data.id);
              localStorage.setItem('userMobile', res.mobile);
              console.log('response of login api', res.data.is_registered);

              if (res.data.is_registered === '0') {
                console.log('on if');

                this.router.navigate(['/authentication/signup']);
              } else {
                console.log('on else');
                this.router.navigate(['/jobs']);
              }
            } else {
              this.error = 'Invalid Login';
            }
          },
          error: (error) => {
            this.error = error;
            this.submitted = false;
          },
        });
    }
  }

  startTimer() {
    this.showResentOtp = false;
    this.getOtp = false;
    this.displayTimer = true;
    this.counter = 2;
    window.clearInterval(this.timer);
    this.timer = setInterval(() => {
      this.counter--;
      if (this.counter === 0) {
        window.clearInterval(this.timer);

        /*After counter value is 0 means 10000 is completed */
        this.startFilling();
        this.showResentOtp = true;
        this.displayTimer = false;
      }
    }, 1000);
  }

  startFilling() {
    this.authService.getOtp(this.f['mobile_number'].value).subscribe({
      next: (res) => {
        if (res) {
          console.log('Otp entered');
          // if (res) {
          //   const token = this.authService.currentUserValue.token;
          //   if (token) {
          //     this.router.navigate(['/authentication/signup']);
          //   }
          // } else {
          //   this.error = 'Invalid Login';
          // }
        } else {
          this.error = 'Invalid Login';
        }
      },
      error: (error) => {
        this.error = error;
        this.submitted = false;
      },
    });
    // console.log(true);
    // this.onSubmit();
  }
}
