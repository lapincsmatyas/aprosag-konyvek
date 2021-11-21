import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import {User} from "../model/user.model";
import {first, map, switchMap, take} from "rxjs/operators";
import {Auth, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "@angular/fire/auth";
import {collection, doc, docData, Firestore, setDoc} from "@angular/fire/firestore";
import {CollectionReference} from "@firebase/firestore";
import {DocumentData} from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<User | null>;
  usersCollection: CollectionReference<User>;

  constructor(private auth: Auth, private fireStore: Firestore) {
    this.usersCollection = collection(this.fireStore, 'users');

    this.user$ = authState(auth).pipe(
      switchMap(data => {
        if (data) {
          const document = doc(this.usersCollection, data.uid);
          return docData(document).pipe(
            take(1),
            map((document: any) => {
              console.log("document", document);
              return document as User;
            })
          );
        } else {
          return of(null);
        }
      })
    );
  }

  signup(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password).then((credential) => {
        this.updateUserData(credential.user)
      }
    );
  }

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password)
  }

  logout() {
    return this.auth.signOut();
  }

  private updateUserData(user: User) {
    // @ts-ignore
    const userRef = doc(this.usersCollection, user.uid);
    setDoc(userRef, {
      email: user.email,
      uid: user.uid,
      roles: {
        user: true
      }
    });
  }
}
