import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';

import { AuthModule } from './auth.module';
import { User, Users } from './user.model';
import { UserType } from './user-type.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User;
  isLoggedIn = false;

  redirectUrl: string;
  constructor() {}

  login({ email, pass }: { email: string; pass: string }): Observable<boolean> {
    const user = Users.find((x: User) => x.email === email);
    let flag = false;
    if (user && user.email[0] === pass) {
      flag = true;
    }

    return of(flag).pipe(
      delay(1000),
      tap(val => {
        this.isLoggedIn = val;
        this.user = user;
        if (val) {
          this.goLogin();
        }
      })
    );
  }

  logout(): void {
    this.isLoggedIn = false;
    this.user = undefined;
  }

  private goLogin(): void {
    switch (this.user.userType) {
      case UserType.admin:
        this.redirectUrl = '/admin';
        break;
      case UserType.student:
        this.redirectUrl = '/student';
        break;
      case UserType.teacher:
        this.redirectUrl = '/teacher';
        break;
      default:
        break;
    }
  }
}
