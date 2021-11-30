import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import {User} from "../model/user.model";
import {first, map, switchMap, take} from "rxjs/operators";
import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword
} from "@angular/fire/auth";
import {collection, doc, docData, Firestore, setDoc, updateDoc} from "@angular/fire/firestore";
import {CollectionReference} from "@firebase/firestore";
import {DocumentData, DocumentReference} from "@angular/fire/compat/firestore";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<User | null>;

  // @ts-ignore
  userDocument$;

  usersCollection: CollectionReference<User>;

  constructor(private auth: Auth, private fireStore: Firestore, private router: Router) {
    this.usersCollection = collection(this.fireStore, 'users');

    this.user$ = authState(auth).pipe(
      switchMap(data => {
        if (data) {
          console.log(data);
          this.userDocument$ = doc(this.usersCollection, data.uid);
          return docData(this.userDocument$).pipe(
            take(1),
            map((document: any) => {
              const temp: User = document as User;
              temp.emailVerified = data.emailVerified;
              return temp;
            })
          );
        } else {
          return of(null);
        }
      })
    );
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
        sendEmailVerification(credential.user).then((result) => {
          this.updateUserData(credential.user)
        })
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

  private updateUserData(user: User) {
    // @ts-ignore
    this.userDocument$ = doc(this.usersCollection, user.uid);
    setDoc(this.userDocument$, {
      uid: user.uid,
      email: user.email,
      roles: {
        user: true
      }
    });
  }

  updateProfile(value: any) {
    return updateDoc(this.userDocument$, {
      ...value
    });
  }
}
