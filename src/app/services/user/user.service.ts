import {Injectable, OnInit} from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {User} from "../../model/user.model";
import {arrayRemove, arrayUnion, doc, Firestore, getDoc, setDoc, updateDoc} from "@angular/fire/firestore";
import {UserDto} from "../../model/dto/user.dto";
import {BehaviorSubject, Observable, throwError} from "rxjs";
import {Item} from "../../model/item.model";
import {user} from "@angular/fire/auth";
import {CartService} from "../cart/cart.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  constructor(private authService: AuthService,
              private cartService: CartService,
              private firestore: Firestore) {
    authService.user$.subscribe((user) => {
      if (user !== null) {
        getDoc<UserDto>(doc(firestore, `users/${user.uid}`)).then((userDocument) => {
          const data = userDocument.data();
          if (data === undefined) {
            this.createUserData(user).then(result => {
              this.user.next(JSON.parse(JSON.stringify(result)));
            })
          } else {
            this.user.next(JSON.parse(JSON.stringify(data)));
          }
        })
      }
    })
  }

  refreshData(user: User) {
    getDoc<UserDto>(doc(this.firestore, `users/${user.uid}`)).then((userDocument) => {
      const data = userDocument.data();
      if (data !== undefined) {
        this.user.next(JSON.parse(JSON.stringify(data)));
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

  addOrRemoveItemAsFavorite(item: Item) {
    if (this.user.value === null) {
      throw throwError('User not found');
    }

   const alreadyFavorite = this.user.value?.favorites.includes(item.id || "");

    return updateDoc(doc(this.firestore, `users/${this.user.value.uid}`), {
      favorites: alreadyFavorite ? arrayRemove(item.id || "") : arrayUnion(item.id)
    }).then((result) => {
      if (this.user.value)
        this.refreshData(this.user.value);
    })

  }
}
