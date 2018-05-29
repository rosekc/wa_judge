import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { catchError, finalize, map, startWith } from 'rxjs/operators';

import { ExamInfo } from '../exam-info.model';
import { ExamService } from '../exam.service';

@Component({
  selector: 'app-exam-list',
  templateUrl: './exam-list.component.html',
  styleUrls: ['./exam-list.component.css']
})
export class ExamListComponent implements OnInit, AfterViewInit {
  displayedColumns = ['name', 'teacherName', 'startTime', 'endTime', 'state'];
  dataSource = new MatTableDataSource();
  isLoading = true;

  private url = '/student/exam';

  constructor(private examService: ExamService, private router: Router) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.isLoading = true;
    this.examService
      .getExamList()
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(data => {
        this.dataSource.data = data;
      });
  }

  goExamDetail(x: ExamInfo) {
    this.examService.currentExamInfo = x;
    this.router.navigate([`${this.url}/${x.id}`]);
  }
}
