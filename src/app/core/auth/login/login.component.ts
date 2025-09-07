import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { InputComponent } from "../../../shared/components/input/input.component";
import { Subscription } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, InputComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private readonly cookieService = inject(CookieService);

  subscription: Subscription = new Subscription;

  msgError: string = "";

  isLoading: boolean = false;

  loginForm!: FormGroup


  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.email, Validators.required]),
      password: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/)]),

    });
  }


  submitForm(): void {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);

      this.subscription.unsubscribe();

      this.isLoading = true;

      this.subscription = this.authService.loginForm(this.loginForm.value).subscribe({
        next: (res) => {
          console.log(res);

          if (res.message === 'success') {
            // navigate to path home

            // save token
            this.cookieService.set('token', res.token)

            console.log(this.authService.decodeToken());

            setTimeout(() => {

              this.msgError = "";
              this.router.navigate(['/home']);

            }, 1000);



          }

          this.isLoading = false;
        },
        error: (err) => {
          console.log(err.error.message);

          this.msgError = err.error.message

          this.isLoading = false;


        }
      })

    }
  }

}
