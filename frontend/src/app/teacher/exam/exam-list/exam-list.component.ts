import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { catchError, finalize, map, startWith } from 'rxjs/operators';

import { AuthService } from '../../../core/auth/auth.service';
import { ExamInfo } from '../exam-info.model';
import { ExamService } from '../exam.service';

@Component({
  selector: 'app-exam-list',
  templateUrl: './exam-list.component.html',
  styleUrls: ['./exam-list.component.css']
})
export class ExamListComponent implements OnInit, AfterViewInit {
  displayedColumns = ['name', 'startTime', 'endTime', 'state'];
  dataSource = new MatTableDataSource();
  isLoading = true;

  constructor(
    private authService: AuthService,
    private examService: ExamService,
    private router: Router
  ) {}

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

  goExamCreate() {
    this.examService.currentExamInfo = { name: '新考试', teacherId: this.authService.user.id };
    this.router.navigate([`/teacher/exam/create`]);
  }

  goExamDetail(x: ExamInfo) {
    this.examService.currentExamInfo = x;
    this.router.navigate([`/teacher/exam/${x.id}`]);
  }
}
