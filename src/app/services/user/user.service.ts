import {Injectable, OnInit} from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {User} from "../../model/user.model";
import {doc, Firestore, getDoc, setDoc, updateDoc} from "@angular/fire/firestore";
import {UserDto} from "../../model/dto/user.dto";
import {BehaviorSubject, Observable, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  constructor(private authService: AuthService,
              private firestore: Firestore) {
    authService.user$.subscribe((user) => {
      if (user !== null) {
        getDoc<UserDto>(doc(firestore, `users/${user.uid}`)).then((userDocument) => {
          const data = userDocument.data();
          if (data === undefined) {
            this.createUserData(user).then(result => {
              this.user.next(JSON.parse(JSON.stringify(result)));
              console.log("new user: ", this.user);
            })
          } else {
            this.user.next(JSON.parse(JSON.stringify(data)));
            console.log("user: ", this.user);
          }
        })
      }
    })
  }

  createUserData(user: UserDto) {
    return setDoc(doc(this.firestore, `users/${user.uid}`), {
      uid: user.uid,
      email: user.email,
      roles: {
        user: true
      }
    });
  }

  updateUserData(data: User) {
    if (this.user.value) {
      return updateDoc(doc(this.firestore, `users/${this.user.value.uid}`), {...data});
    } else {
      throw throwError('User not found');
    }

  }
}
