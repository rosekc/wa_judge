import { Component, OnInit, AfterViewInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { catchError, finalize, map, startWith } from 'rxjs/operators';

import { StudentInfo } from '../student-info.model';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit, AfterViewInit {
  displayedColumns = ['select', 'userName', 'name', 'id'];
  dataSource = new MatTableDataSource<StudentInfo>();
  selection = new SelectionModel<StudentInfo>(true, []);
  isLoading = true;

  constructor(private studentService: StudentService, private router: Router) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.isLoading = true;
    this.studentService
      .getStudentList()
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

  goCreate() {
    this.router.navigate(['/admin/student/create']);
  }

  goDetail(x: StudentInfo) {
    this.studentService.currentStudentInfo = x;
    this.router.navigate([`/admin/student/${x.id}`]);
  }
}
