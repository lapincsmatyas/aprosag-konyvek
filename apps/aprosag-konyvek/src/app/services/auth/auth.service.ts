import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import {switchMap} from "rxjs/operators";
import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword
} from "@angular/fire/auth";
import {Router} from "@angular/router";
import {UserDto} from "../../model/dto/user.dto";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<UserDto | null>;

  constructor(private auth: Auth,
              private router: Router) {
    this.user$ = authState(auth);
  }

  sendEmailVerification() {
    return authState(this.auth).pipe(
      switchMap((user) => {
        if (user) {
          return of(sendEmailVerification(user));
        } else {
          return of(null);
        }
      })
    );
  }

  signup(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password).then((credential) => {
        sendEmailVerification(credential.user)
      }
    );
  }

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password)
  }

  logout() {
    return this.auth.signOut().then(() => {
      this.router.navigateByUrl('login');
    });
  }
}
