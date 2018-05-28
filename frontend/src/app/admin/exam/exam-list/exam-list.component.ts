import { Component, OnInit, AfterViewInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
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
  displayedColumns = ['select', 'name', 'teacherName', 'startTime', 'endTime'];
  dataSource = new MatTableDataSource<ExamInfo>();
  selection = new SelectionModel<ExamInfo>(true, []);
  isLoading = true;

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

  isSelected() {
    return this.selection.selected.length <= 0;
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach(row => this.selection.select(row));
  }

  delete() {}
}
