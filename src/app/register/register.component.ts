import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthService } from '../services/auth.service';

 
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;
  constructor(private http: HttpClient,private authservice:AuthService, private router: Router, private fb: FormBuilder) {}
 
  ngOnInit(): void {
    this.registerForm = this.fb.group({
      fname: ['',[Validators.required, Validators.maxLength(15)]],
      lname: ['',[Validators.required, Validators.maxLength(15)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    });
  }
 
newUser={
  fname: '',
  lname:'',
  email: '',
  password: ''
}
  

  // onSubmit() {
  //   const user1 = { fname: this.newUser.fname,lname: this.newUser.lname, email: this.newUser.email, password: this.newUser.password };
  //   this.http.post('http://localhost:3000/users', user1)
  //     .subscribe(() => {
  //       alert('Sign up successful!');
  //       this.router.navigate(['/login']);
  //     });
  // }

  onSubmit(){
    if(this.registerForm.valid){
      if(this.registerForm.value.password !== this.registerForm.value.confirmPassword){
        console.error('passwords do not match');
        return;
      }
      this.authservice.register(this.registerForm.value).subscribe(
        response =>{
          console.log('Registration Successful',response);
          this.router.navigate(['/login']);
        },
        error =>{
          console.error('Registration failed',error);
        }
      );

    }
    else{
      console.error('form is not valid',this.registerForm);
      this.registerForm.markAllAsTouched();
    }
  }
}

  
