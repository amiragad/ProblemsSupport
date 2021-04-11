import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import { AuthService } from '../../Services/auth.service';
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
  message: any;
  selected = new FormControl(0);


  // loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private AuthService: AuthService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
    this.SignupForm = this.formBuilder.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]],
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      image: [''],
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
    this.AuthService.Login(this.loginForm.value).subscribe(res => {
      debugger
      if (res.success && res.data?.token) {
        Cookies.set('ProgramerToken', res.data.token);
        Cookies.set('ProgramerUser', this.loginForm.value.userName);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Logged in successfully',
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigate(['problems']);
        this.LoginSubmitted = false
      }
      else {
        this.message = res.message;
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: this.message,
          showConfirmButton: false,
          timer: 2000
        })
        this.message = null;
        // setTimeout(() => {
        //   this.message = null;
        // }, 2000);

        this.LoginSubmitted = false
      }
    }
      , err => {
        console.error(err)
      })

  }
  SignUp() {
    this.SignupSubmitted = true;
    if (this.SignupForm.invalid) {
      return;
    }
    const formData = new FormData();
    for (var key in this.SignupForm.value) {
      let val = this.SignupForm.value[key];
      formData.append(key, val);
    }
    this.AuthService.SignUp(formData).subscribe(res => {
      if (res.success) {
        console.log("res->", res)
        this.SignupSubmitted = false;
        this.message = res.message;
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Signed up successfully',
          showConfirmButton: false,
          timer: 1500
        })
        this.message = null;
        // setTimeout(() => {
        //   this.message = null;
        // }, 2000);
        this.SignupForm.reset();
      }
      else {
        this.message = res.message;
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Signed up successfully',
          showConfirmButton: false,
          timer: 2000
        })
        this.message = null;
        // setTimeout(() => {
        //   this.message = null;
        // }, 2000);

        this.SignupSubmitted = false
      }
    }, err => {
      console.error(err)
    })

  }
  onEnterKeyDown(e: any, form: any) {
    if ( e.keyCode === 13 && form == 'login') {
      this.login();
    }
    if ( e.keyCode === 13 && form == 'SignUp') {
      this.SignUp();
    }
   
  }
}
