import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth/auth.service";
import {FormBuilder, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";

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

  constructor(private router: Router, private authService: AuthService, private fb: FormBuilder, private toastr: ToastrService) {
  }

  goToSignup() {
    this.router.navigateByUrl('signup');
  }

  login() {
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;
    if(!email || !password) return;

    this.authService.login(email, password).then((result) => {
      this.router.navigateByUrl('items');
    }, (error) => {
      this.toastr.error('Sikertelen bejelentkezés!', 'Hiba');
    })
  }
}
