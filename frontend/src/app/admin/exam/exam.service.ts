import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, finalize, map, startWith, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import { ExamInfo } from './exam-info.model';

@Injectable({
  providedIn: 'root'
})
export class ExamService {
  private examsUrl = '/api/exams';

  constructor(private http: HttpClient) {}

  getExamList() {
    return this.http
      .get<ExamInfo[]>(this.examsUrl)
      .pipe(startWith(Array<ExamInfo>()));
  }
}
