import { Component, inject, OnInit } from '@angular/core';

import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { InputComponent } from "../../../shared/components/input/input.component";

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, InputComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  msgError: string = "";

  isLoading: boolean = false;

  flag: boolean = true;

  registerForm!: FormGroup


  confirmPassword(group: AbstractControl) {

    if (group.get('password')?.value === group.get('rePassword')?.value) {
      return null;
    }
    else {

      group.get('rePassword')?.setErrors({ mismatch: true })
      return { mismatch: true };
    }
    // let password = group.get('password')?.value;
    // let repassword = group.get('repassword')?.value;

    // if (password === repassword) {
    //   return null;

    // }
    // else {
    //   return { mismatch: true }

    // }

  }
  ngOnInit(): void {
    this.initForm();

  }

  initForm(): void {
    this.registerForm = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
      email: new FormControl(null, [Validators.email, Validators.required]),
      password: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/)]),
      rePassword: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)])

    }, { validators: this.confirmPassword });

  }


  submitForm(): void {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);

      this.isLoading = true;

      this.authService.registerForm(this.registerForm.value).subscribe({
        next: (res) => {
          console.log(res);

          if (res.message === 'success') {
            // navigate to path Login

            setTimeout(() => {

              this.msgError = "";
              this.router.navigate(['/login']);

            }, 1500);



          }

          this.isLoading = false;
        },
        error: (err) => {
          console.log(err.error.message);

          this.msgError = err.error.message

          this.isLoading = false;


        }
      });

    }
    else {
      this.registerForm.markAllAsTouched();
    }
  }

}
