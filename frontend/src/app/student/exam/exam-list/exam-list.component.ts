import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { catchError, finalize, map, startWith } from 'rxjs/operators';

import { ExamService } from '../exam.service';
import { Router } from '@angular/router';
import { ExamInfo } from '../exam-info.model';

@Component({
  selector: 'app-exam-list',
  templateUrl: './exam-list.component.html',
  styleUrls: ['./exam-list.component.css']
})
export class ExamListComponent implements OnInit, AfterViewInit {
  displayedColumns = ['name', 'teacherName', 'startTime', 'endTime', 'state'];
  dataSource = new MatTableDataSource();
  isLoadingResults = true;

  constructor(private examService: ExamService, private router: Router) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.isLoadingResults = true;
    this.examService
      .getExamList()
      .pipe(
        finalize(() => {
          this.isLoadingResults = false;
        })
      )
      .subscribe(data => {
        this.dataSource.data = data;
      });
  }

  goExamDetail(x: ExamInfo) {
    this.examService.currentExamInfo = x;
    this.router.navigate([`/student/exam/${x.id}`]);
  }
}
