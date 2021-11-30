import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'aprosag-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    password: [''],
    confirmPassword: ['']
  })


  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router, private toastr: ToastrService) { }

  signup() {
    if(this.registerForm.get('email')?.valid && this.registerForm.get('password')?.value == this.registerForm.get('confirmPassword')?.value)
    this.authService.signup(this.registerForm.get('email')?.value, this.registerForm.get('password')?.value).then((result) => {
      this.toastr.success('Sikeres regisztráció!');
      this.router.navigateByUrl('items');
    }, (error) => {
      this.toastr.error('Sajnáljuk, valami hiba történt :(');
      console.error(error);
    })
  }

  goToLogin() {
    this.router.navigateByUrl('login');
  }
}
