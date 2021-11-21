import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {FormBuilder, FormControl, Validators} from "@angular/forms";

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


  constructor(private authService: AuthService, private fb: FormBuilder) { }

  signup() {
    if(this.registerForm.get('email')?.valid && this.registerForm.get('password')?.value == this.registerForm.get('confirmPassword')?.value)
    this.authService.signup(this.registerForm.get('email')?.value, this.registerForm.get('password')?.value).then((result) => {
      console.log(result);
    }, (error) => {
      console.error(error);
    })
  }
}
