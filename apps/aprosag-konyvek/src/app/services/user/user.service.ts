import {Injectable} from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {User} from "../../model/user.model";
import {arrayRemove, arrayUnion, doc, Firestore, getDoc, setDoc, updateDoc} from "@angular/fire/firestore";
import {UserDto} from "../../model/dto/user.dto";
import {BehaviorSubject, throwError} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {Item} from "data";
import {CartItem} from "../../../../../../libs/items/src/lib/+state/cart/cart.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  constructor(private authService: AuthService,
              private toastr: ToastrService,
              private firestore: Firestore) {
    authService.user$.subscribe((userDto) => {
      if (userDto !== null) {
        getDoc<UserDto>(doc(firestore, `users/${userDto.uid}`)).then((userDocument) => {
          const data = userDocument.data();
          if (data === undefined) {
            this.createUserData(userDto).then(result => {
              this.user.next(result);
            }).catch(() =>{
              this.toastr.error('Valami hiba történt a regisztráció során!')
            })
          } else {
            let user = JSON.parse(JSON.stringify(data));
            this.user.next(user);

          }
        })
      } else {
        this.user.next(null);
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
    const userData = {
      uid: user.uid,
      email: user.email,
      roles: {
        user: true
      }
    };

    return setDoc(doc(this.firestore, `users/${user.uid}`), {
      uid: user.uid,
      email: user.email,
      roles: {
        user: true
      }
    }).then(() => {
      let user: User = new User();
      user.uid = userData.uid || "";
      user.email = userData.email || "";
      user.roles = userData.roles;
      return user;
    });
  }

  updateUserData(data: User) {
    if (this.user.value) {
      return updateDoc(doc(this.firestore, `users/${this.user.value.uid}`), {...data}).then(result => {
        this.user.next({...data, uid: this.user.value?.uid || ""});
        return result;
      });
    } else {
      throw throwError('User not found');
    }
  }

  addOrRemoveItemAsFavorite(item: Item) {
    if (this.user.value === null) {
      throw throwError('User not found');
    }

    const alreadyFavorite = this.user.value?.favorites?.includes(item.id || "");

    return updateDoc(doc(this.firestore, `users/${this.user.value.uid}`), {
      favorites: alreadyFavorite ? arrayRemove(item.id || "") : arrayUnion(item.id)
    }).then((result) => {
      if (this.user.value)
        this.refreshData(this.user.value);
    })
  }

  updateCart(cartItem: CartItem[]) {
    if (this.user.value === null) {
      throw throwError('User not found');
    }

    return updateDoc(doc(this.firestore, `users/${this.user.value.uid}`), {
      cart: cartItem
    }).then(() => {
    })
  }
}
