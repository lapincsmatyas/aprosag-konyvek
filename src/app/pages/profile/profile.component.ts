import {Component, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {AuthService} from "../../services/auth/auth.service";
import {User} from "../../model/user.model";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'aprosag-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileForm = this.fb.group({
      email: [''],
      username: [''],
      lastName: [''],
      firstName: [''],
      companyName: [''],
      taxNumber: [''],
      country: [''],
      city: [''],
      address: [''],
      zipCode: [''],
      phoneNumber: ['']
    }
  )

  public user: Observable<User | null>;

  constructor(private fb: FormBuilder, private authService: AuthService, private toastr: ToastrService) {
    this.user = this.authService.user$.pipe(
      tap((value) => {
        if (value) {
          this.profileForm.patchValue(value);
        }
      })
    );
  }

  ngOnInit(): void {
  }

  saveData() {
    this.authService.updateProfile(this.profileForm.value).then(() => {
      this.toastr.success('Profil sikeresen elmentve!');
    }).catch(() => {
      this.toastr.error('Sajnáljuk, valami hiba történt :(');
    });
  }

  resendVerificationEmail() {
    this.authService.sendEmailVerification().subscribe((result) => {
      console.log(result);
    })
  }

  logout() {
    this.authService.logout().then(() => {

    })
  }
}
