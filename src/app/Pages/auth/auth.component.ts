import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  loginForm!: FormGroup;
  SignupForm!: FormGroup;
  LoginSubmitted: boolean = false;
  SignupSubmitted: boolean = false;

  // loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
    this.SignupForm = this.formBuilder.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]],
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      image: ['', [Validators.required]],
    });

  }
  get fval() {
    return this.loginForm.controls;
  }
  get SignupFval() {
    return this.SignupForm.controls;
  }
  login() {
    this.LoginSubmitted = true
    console.log("login data ==>", this.loginForm)
    this.router.navigate(['problems']);
  }
  Signup() {
    this.SignupSubmitted = true
    console.log("login data ==>", this.SignupForm)
    this.router.navigate(['problems']);
  }
}
