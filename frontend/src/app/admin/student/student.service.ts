import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, finalize, map, startWith, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import { StudentInfo } from './student-info.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private examsUrl = '/api/students';

  constructor(private http: HttpClient) {}

  getStudentList() {
    return this.http
      .get<StudentInfo[]>(this.examsUrl)
      .pipe(startWith(Array<StudentInfo>()));
  }
}
