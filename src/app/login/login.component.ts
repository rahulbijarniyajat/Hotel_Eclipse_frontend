import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient} from '@angular/common/http';
 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
 
  constructor(private http: HttpClient,private router: Router,private fb: FormBuilder) {}
 
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
     
    });
  }
  newUser={
    email: '',
    password: ''
  }
  // onSubmit(){
  //   const user1 = {  email: this.newUser.email, password: this.newUser.password };
  //     .subscribe(() => {
  //       alert('Sign up successful!');
  //       this.router.navigate(['/contacts']);
  //     });
  // }
}


