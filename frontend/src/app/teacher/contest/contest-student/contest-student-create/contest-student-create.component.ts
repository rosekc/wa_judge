import { Component, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog, MatTableDataSource } from '@angular/material';

import { DialogService } from '../../../../shared/dialog/dialog.service';
import { ContestStudentInfo } from '../contest-student.model';
import { ContestStudentListDialogComponent } from '../contest-student-list-dialog/contest-student-list-dialog.component';
import { ContestService } from '../../contest.service';

@Component({
  selector: 'app-contest-student-create',
  templateUrl: './contest-student-create.component.html',
  styleUrls: ['./contest-student-create.component.css']
})
export class ContestStudentCreateComponent implements OnInit {
  displayedColumns = ['select', 'userName', 'name', 'group'];
  dataSource = new MatTableDataSource<ContestStudentInfo>();
  selection = new SelectionModel<ContestStudentInfo>(true, []);
  isLoading = false;

  constructor(
    private dialog: MatDialog,
    private contestService: ContestService
  ) {}

  ngOnInit() {}

  isImported() {
    return this.dataSource.data.length > 0;
  }

  isSelected() {
    return this.selection.hasValue();
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

  import() {
    const a = this.dataSource.data;
    a.push({
      userName: '151',
      name: 'student',
      group: '15-1'
    });
    this.dataSource.data = a;
    this.dialog.open(ContestStudentListDialogComponent, {
      data: {
        repeatList: this.dataSource.data,
        errorList: this.dataSource.data
      },
      minWidth: '430px'
    });
  }

  delete() {
    const select = new Set(this.selection.selected);
    this.dataSource.data = this.dataSource.data.filter(x => !select.has(x));
    this.selection.clear();
  }

  reset() {
    this.dataSource.data = [];
    this.selection.clear();
  }
}
