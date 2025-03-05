// import { Component } from '@angular/core';
// import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
// import { Router } from '@angular/router';
// import {NgClass, NgIf} from '@angular/common';
//
// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   imports: [
//     ReactiveFormsModule,
//     NgClass,
//     NgIf
//   ],
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent {
//   loginForm: FormGroup;
//   isSubmitted = false;
//   showPassword = false;
//
//   constructor(
//     private formBuilder: FormBuilder,
//     private router: Router
//   ) {
//     this.loginForm = this.formBuilder.group({
//       email: ['', [Validators.required, Validators.email]],
//       password: ['', [Validators.required, Validators.minLength(6)]]
//     });
//   }
//
//   get formControls() {
//     return this.loginForm.controls;
//   }
//
//   togglePasswordVisibility() {
//     this.showPassword = !this.showPassword;
//   }
//
//   onSubmit() {
//     this.isSubmitted = true;
//
//     if (this.loginForm.invalid) {
//       return;
//     }
//
//     // Here you would typically call an authentication service
//     console.log('Login successful', this.loginForm.value);
//     this.router.navigate(['/']);
//   }
// }


// src/app/login/login.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class LoginComponent {
  loginForm: FormGroup;
  isSubmitted = false;
  showPassword = false;

  constructor(
      private formBuilder: FormBuilder,
      private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }

  get formControls() {
    return this.loginForm.controls;
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    this.isSubmitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    // Here you would typically call your authentication service
    console.log('Login attempt', this.loginForm.value);

    // Navigate to home after successful login
    // this.router.navigate(['/']);
  }
}
