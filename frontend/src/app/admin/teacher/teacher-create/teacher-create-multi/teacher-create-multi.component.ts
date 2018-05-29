import { Component, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog, MatTableDataSource } from '@angular/material';

import { DialogService } from '../../../../shared/dialog/dialog.service';
import { TeacherInfo, TeacherInfoWithSymbol } from '../../teacher.model';
import { TeacherInfoDialogComponent } from '../teacher-info-dialog/teacher-info-dialog.component';
import { TeacherService } from '../../teacher.service';

@Component({
  selector: 'app-teacher-create-multi',
  templateUrl: './teacher-create-multi.component.html',
  styleUrls: ['./teacher-create-multi.component.css']
})
export class TeacherCreateMultiComponent implements OnInit {
  displayedColumns = ['select', 'userName', 'name', 'password', 'userType', 'sid'];
  dataSource = new MatTableDataSource<TeacherInfoWithSymbol>();
  selection = new SelectionModel<TeacherInfoWithSymbol>(true, []);
  isLoading = false;

  constructor(
    private dialog: MatDialog,
    private teacherService: TeacherService
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

  create() {
    console.log(
      this.dataSource.data.map(x => {
        return { userName: x.userName, name: x.name, password: x.password, userType: x.userType };
      })
    );
  }

  import() {
    const a = this.dataSource.data;
    a.push({
      userName: 'new',
      name: 'newS',
      password: '123456',
      userType: 1,
      sid: Symbol()
    });
    this.dataSource.data = a;
  }

  edit(x: TeacherInfoWithSymbol, event: MouseEvent) {
    event.stopPropagation();
    const dialog = this.dialog.open(TeacherInfoDialogComponent, {
      data: x
    });
    dialog.afterClosed().subscribe(r => {
      if (r) {
        r = r as TeacherInfo;
        x.userName = r.userName;
        x.name = r.name;
        x.password = r.password;
        x.userType = Number(r.userType);
        const data = this.dataSource.data;
        for (let i = 0; i < data.length; i++) {
          if (data[i].sid === x.sid) {
            data[i] = x;
            break;
          }
        }
        this.dataSource.data = data;
      }
    });
  }

  delete() {
    const select = new Set(this.selection.selected);
    this.dataSource.data = this.dataSource.data.filter(x => !select.has(x));
    this.selection.clear();
  }
}
