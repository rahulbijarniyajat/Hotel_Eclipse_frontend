import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private http: HttpClient,
    private authservice: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      fname: ['', [Validators.required, Validators.maxLength(15)]],
      lname: ['', [Validators.required, Validators.maxLength(15)]],
      email: ['', [Validators.required, Validators.email, this.gmailValidator]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    });
  }

  gmailValidator: ValidatorFn = (control: AbstractControl) => {
    const email = control.value;
    return email && email.endsWith('@gmail.com') ? null : { notGmail: true };
  };

  onSubmit() {
    if (this.registerForm.valid) {
      if (this.registerForm.value.password !== this.registerForm.value.confirmPassword) {
        console.error('Passwords do not match');
        return;
      }
      this.authservice.register(this.registerForm.value).subscribe(
        response => {
          console.log('Registration Successful', response);
          this.router.navigate(['/login']);
        },
        error => {
          console.error('Registration failed', error);
        }
      );
    } else {
      console.error('Form is not valid', this.registerForm);
      this.registerForm.markAllAsTouched();
    }
  }
}
