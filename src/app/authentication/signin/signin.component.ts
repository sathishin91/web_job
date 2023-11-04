import { AuthService } from 'src/app/core/service/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  loginForm!: UntypedFormGroup;
  submitted = false;
  returnUrl!: string;
  error = '';
  hide = true;
  constructor(
    private formBuilder: UntypedFormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      mobile_number: [8098778216, Validators.required],
      otp: [1234, Validators.required],
    });
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
          next: (res) => {
            if (res) {
              if (res) {
                const token = this.authService.currentUserValue.token;
                if (token) {
                  this.router.navigate(['/jobs']);
                }
              } else {
                this.error = 'Invalid Login';
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
}
