import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {LoadingService} from "../../services/loading/loading.service";

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


  constructor(private authService: AuthService,
              private fb: FormBuilder,
              private router: Router,
              private toastr: ToastrService,
              private loadingService: LoadingService) {
  }

  signup() {
    const email = this.registerForm.get('email')?.value || "";
    const password = this.registerForm.get('password')?.value || "";

    if (!this.registerForm.get('email')?.valid) {
      this.toastr.error('Hibás email cím!');
      return;
    } else if (password !== this.registerForm.get('confirmPassword')?.value) {
      this.toastr.error('A két jelszó nem egyezik meg!');
      return;
    } else if (password.length < 6) {
      this.toastr.error('A jelszónak legalább 6 karakter hosszúnak kell lennie!');
      return;
    }

    this.loadingService.addProcess('register');

    this.authService.signup(email, password).then((result) => {
      this.loadingService.removeProcess('register');
      this.toastr.success('Sikeres regisztráció!');
      this.router.navigateByUrl('items');
    }, (error) => {
      console.log(error);
      this.loadingService.removeProcess('register');
      this.toastr.error('Sajnáljuk, valami hiba történt :(');
    })
  }

  goToLogin() {
    this.router.navigateByUrl('login');
  }
}
