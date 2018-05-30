import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';

import { AuthModule } from './auth.module';
import { User, StudentUser, TeacherUser, UserType, StudentUsers, TeacherUsers } from './user.model';

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
      this.user = TeacherUsers.find((x: TeacherUser) => x.userName === token);
      if (!this.user) {
        this.user = StudentUsers.find((x: StudentUser) => `${x.studentId}.${x.contestId}` === token);
      }
      if (this.user) {
        this.isLoggedIn = true;
        this.resetRedirectUrl();
      } else {
        this.logout();
      }
    }
  }

  teacherLogin({ userName, password }: { userName: string; password: string }): Observable<boolean> {
    const user = TeacherUsers.find((x: TeacherUser) => x.userName === userName);
    let flag = false;
    if (user && user.userName[0] === password) {
      flag = true;
    }

    return of(flag).pipe(
      delay(1000),
      tap(val => {
        this.isLoggedIn = val;
        this.user = user;
        if (val) {
          localStorage.setItem('access_token', user.userName);
          this.resetRedirectUrl();
        }
      })
    );
  }

  studentLogin({ studentId, name, contestId }: { studentId: string; name: string; contestId: string }): Observable<boolean> {
    const user = StudentUsers.find((x: StudentUser) => x.studentId === studentId);
    let flag = false;
    if (user && user.name === name && user.contestId === contestId) {
      flag = true;
    }

    return of(flag).pipe(
      delay(1000),
      tap(val => {
        this.isLoggedIn = val;
        this.user = user;
        if (val) {
          localStorage.setItem('access_token', `${user.studentId}.${user.contestId}`);
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
