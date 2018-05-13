import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';

import { AuthModule } from './auth.module';
import { User } from './user.model';
import { UserType } from './user-type.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User;
  isLoggedIn = false;

  redirectUrl: string;
  constructor() {}

  login(): Observable<boolean> {
    return of(true).pipe(
      delay(1000),
      tap(val => {
        this.isLoggedIn = true;
        this.user = new User(1, 'test', UserType.student);
        this.goLogin();
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
