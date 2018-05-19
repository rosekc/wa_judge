import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { catchError, finalize, map, startWith } from 'rxjs/operators';

import { ExamInfo } from './exam-info.model';
import { ExamState } from './exam-state.enum';

@Injectable({
  providedIn: 'root'
})
export class ExamService {
  private examsUrl = '/api/exams';

  constructor(private http: HttpClient) {}

  getExamList() {
    return this.http.get<ExamInfo[]>(this.examsUrl).pipe(
      startWith(Array<ExamInfo>()),
      map(data => {
        return data.map(this.fleshExamState);
      })
    );
  }

  fleshExamState(x: ExamInfo) {
    const d = Date.now();
    const s = new Date(x.startTime).getTime();
    const e = new Date(x.endTime).getTime();
    if (d < s) {
      x.state = ExamState.NoStarted;
    } else if (d >= s && d <= e) {
      x.state = ExamState.InProgress;
    } else {
      x.state = ExamState.Ended;
    }
    return x;
  }
}
