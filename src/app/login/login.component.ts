import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loginError: boolean = false; // Track login errors

  constructor(private http: HttpClient, private router: Router, private authservice: AuthService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authservice.login(this.loginForm.value).subscribe(
        response => {
          console.log('login successful', response);
          this.router.navigate(['/roombooking']);
          this.loginError = false; // Reset error on successful login
        },
        error => {
          console.error('login failed', error);
          this.loginError = true; // Set error on failed login
        }
      );
    } else {
      console.error('form is not valid');
      this.loginForm.markAllAsTouched();
    }
  }
}
