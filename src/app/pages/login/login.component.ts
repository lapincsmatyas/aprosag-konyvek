import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'aprosag-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  })

  constructor(private router: Router, private authService: AuthService, private fb: FormBuilder) {
  }

  goToSignup() {
    this.router.navigateByUrl('signup');
  }

  signUp() {
    this.authService.login(this.loginForm.get('email')?.value, this.loginForm.get('password')?.value).then((result) => {
      console.log(result);
    }, (error) => {
      console.error(error);
    })
  }
}
