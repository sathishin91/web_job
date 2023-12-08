import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/core/service/auth.service';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

interface MyApiResponse {
  code: number;
  status: string;
  message: string;
  // Add other properties as needed
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass'],
})
export class SignupComponent implements OnInit {
  registerForm!: UntypedFormGroup;
  submitted = false;
  error = '';
  mobileNumber: any;
  userMobile = localStorage.getItem('currentUser');

  constructor(
    private formBuilder: UntypedFormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // Check if userMobile is not null before using it
    if (this.userMobile !== null) {
      // Parse the JSON string into an object
      const userData = JSON.parse(this.userMobile);

      // Now you can access properties of userData safely
      this.mobileNumber = userData.mobile;
    } else {
      console.error('User data not found in localStorage');
    }

    // Now, 'mobileNumber' contains the mobile number from localStorage
    // console.log(mobileNumber);
    // console.log('mobile', this.userMobile);
    // console.log('mobile', this.userMobile.mobile);
    this.registerForm = this.formBuilder.group({
      company_name: ['', Validators.required],
      website: [''],
      no_employees: ['', Validators.required],
      email: [
        '',
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
      is_company: ['', Validators.required],
      is_accept: ['', Validators.required],
    });
  }
  get f() {
    return this.registerForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    this.error = '';

    if (this.registerForm.invalid) {
      this.error = 'Invalid data !';
      return;
    } else {
      console.log('register an user', this.registerForm.value);

      const data = {
        api_key: environment.api_key,
        role_id: environment.role_id,
        mobile: this.mobileNumber,
        company_name: this.f['company_name'].value,
        is_company: this.f['is_company'].value,
        email: this.f['email'].value,
        website: this.f['website'].value,
        no_of_employees: this.f['no_employees'].value,
        is_accept: this.f['is_accept'].value,
      };
      this.authService.registerUser(data).subscribe({
        next: (res: any) => {
          //const apiResponse = res as MyApiResponse;
          if (res) {
            console.log('response of register api', res);
            if (res.status == 'success') {
              this.router.navigate(['/jobs']);
            } else {
              this.error = 'Invalid Register';
            }
          } else {
            this.error = 'Invalid Register';
          }
        },
        error: (error) => {
          this.error = error;
          this.submitted = false;
        },
      });
    }
  }

  customWithFunction() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirm',
    }).then((result) => {
      if (result.value) {
        // Swal.fire(
        //   'Account created!',
        //   'Your account has been created.',
        //   'success'
        // );
        //this.router.navigate(['/jobs']);
        this.onSubmit();
      }
    });
  }
}
