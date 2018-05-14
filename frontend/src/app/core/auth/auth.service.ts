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
  constructor() {
    const token = localStorage.getItem('access_token');
    if (token) {
      this.user = Users.find((x: User) => x.email === token);
      this.isLoggedIn = true;
      this.resetRedirectUrl();
    }
  }

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
          localStorage.setItem('access_token', user.email);
          this.resetRedirectUrl();
        }
      })
    );
  }

  logout(): void {
    this.isLoggedIn = false;
    this.user = undefined;
    this.resetRedirectUrl();
    localStorage.removeItem('access_token');
  }

  private resetRedirectUrl(): void {
    if (this.user === undefined) {
      this.redirectUrl = '/';
    } else {
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
          this.redirectUrl = '/';
          break;
      }
    }
  }
}
