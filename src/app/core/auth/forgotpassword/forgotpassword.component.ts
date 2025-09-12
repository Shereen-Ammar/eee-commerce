import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from "../../../shared/components/input/input.component";
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgotpassword',
  imports: [ReactiveFormsModule, InputComponent],
  templateUrl: './forgotpassword.component.html',
  styleUrl: './forgotpassword.component.css'
})
export class ForgotpasswordComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly cookieService = inject(CookieService);
  private readonly router = inject(Router);

  veriftEmail!: FormGroup;
  verifyCode!: FormGroup;
  resetPassword!: FormGroup;

  step: number = 1


  ngOnInit(): void {
    this.initForm();
  }



  initForm(): void {

    this.veriftEmail = this.fb.group({
      email: [null, [Validators.required, Validators.email]]
    })

    this.verifyCode = this.fb.group({
      resetCode: [null, [Validators.required]]
    })

    this.resetPassword = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      newPassword: [null, [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/)]]
    })


  }

  formStep1(): void {
    if (this.veriftEmail.valid) {
      this.authService.submitVerifyEmail(this.veriftEmail.value).subscribe({
        next: (res) => {
          console.log(res);
          this.step = 2;
        },
        error: (err) => {
          console.log(err)
        }
      })
    }
  }



  formStep2(): void {
    if (this.verifyCode.valid) {
      this.authService.submitVerifyCode(this.verifyCode.value).subscribe({
        next: (res) => {
          console.log(res);
          this.step = 3;
        },
        error: (err) => {
          console.log(err)
        }
      })
    }
  }


  formStep3(): void {
    if (this.resetPassword.valid) {
      this.authService.submitResetPassword(this.resetPassword.value).subscribe({
        next: (res) => {
          console.log(res);

          // save token
          this.cookieService.set('token', res.token);

          // navigate home
          this.router.navigate(['/home']);
        },
        error: (err) => {
          console.log(err)
        }
      })
    }
  }




}
