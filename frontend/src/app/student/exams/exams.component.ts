import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material';

import { catchError, finalize, map, startWith } from 'rxjs/operators';

import { ExamInfo } from './exam-info';
import { ExamState } from './exam-state.enum';

@Component({
  selector: 'app-exams',
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.css']
})
export class ExamsComponent implements OnInit, AfterViewInit {
  displayedColumns = ['name', 'teacherName', 'startTime', 'endTime', 'state'];
  dataSource = new MatTableDataSource();
  isLoadingResults = true;

  private examsUrl = '/api/exams';

  constructor(private http: HttpClient) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.isLoadingResults = true;
    this.http
      .get<ExamInfo[]>(this.examsUrl)
      .pipe(
        startWith(Array<ExamInfo>()),
        map(data => {
          return data.map(this.getExamState);
        }),
        finalize(() => {
          this.isLoadingResults = false;
        })
      )
      .subscribe(data => {
        this.dataSource.data = data;
      });
  }

  private getExamState(x: ExamInfo): ExamInfo {
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
