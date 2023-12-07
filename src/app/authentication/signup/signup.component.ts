import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/core/service/auth.service';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass'],
})
export class SignupComponent implements OnInit {
  registerForm!: UntypedFormGroup;
  submitted = false;
  error = '';
  constructor(
    private formBuilder: UntypedFormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      company_name: [''],
      website: [''],
      no_employees: [''],
      email: [
        '',
        // [Validators.required, Validators.email, Validators.minLength(5)],
      ],
      com_consultancy: [''],
      termcondition: [false, [Validators.requiredTrue]],
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
      // this.authService
      //   .login(this.f['mobile_number'].value, this.f['otp'].value)
      //   .subscribe({
      //     next: (res) => {
      //       if (res) {
      //         console.log('response of login api', res);
      //         console.log('response of login api', res.data.is_registered);

      //         if (res.data.is_registered === '0') {
      //           console.log('on if');

      //           this.router.navigate(['/authentication/signup']);
      //         } else {
      //           console.log('on else');
      //           this.router.navigate(['/jobs']);
      //         }
      //       } else {
      //         this.error = 'Invalid Login';
      //       }
      //     },
      //     error: (error) => {
      //       this.error = error;
      //       this.submitted = false;
      //     },
      //   });
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
