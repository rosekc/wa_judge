import { Component, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog, MatTableDataSource } from '@angular/material';

import { DialogService } from '../../../../shared/dialog/dialog.service';
import { FileService } from '../../../../shared/file/file.service';
import { StudentInfo, StudentInfoWithSymbol } from '../../student-info.model';
import { StudentInfoDialogComponent } from '../student-info-dialog/student-info-dialog.component';
import { StudentService } from '../../student.service';

@Component({
  selector: 'app-student-create-multi',
  templateUrl: './student-create-multi.component.html',
  styleUrls: ['./student-create-multi.component.css']
})
export class StudentCreateMultiComponent implements OnInit {
  displayedColumns = ['select', 'userName', 'name', 'group', 'password', 'sid'];
  dataSource = new MatTableDataSource<StudentInfoWithSymbol>();
  selection = new SelectionModel<StudentInfoWithSymbol>(true, []);
  isLoading = false;

  constructor(
    private dialog: MatDialog,
    private dialogService: DialogService,
    private fileService: FileService,
    private studentService: StudentService
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
        return { userName: x.userName, name: x.name, password: x.password };
      })
    );
  }

  import(evt: any, fileForm: HTMLFormElement) {
    const header = ['用户名', '姓名', '班级', '初始密码'];
    const propertys = ['userName', 'name', 'group', 'password'];
    const callback = (data: Array<any>, error: Error) => {
      if (error) {
        this.dialogService.showErrorMessage(error.message);
        fileForm.reset();
      } else {
        this.dataSource.data = data.map(x => {
          x['sid'] = Symbol();
          return x;
        });
      }
    };
    this.fileService.readExcelFile(
      evt,
      { header: header, propertys: propertys },
      callback
    );
  }

  edit(x: StudentInfoWithSymbol, event: MouseEvent) {
    event.stopPropagation();
    const dialog = this.dialog.open(StudentInfoDialogComponent, {
      data: x
    });
    dialog.afterClosed().subscribe(r => {
      if (r) {
        r = r as StudentInfo;
        x.userName = r.userName;
        x.name = r.name;
        x.group = r.group;
        x.password = r.password;
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
