import { Component, OnInit, Inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material';

import { FormErrorStateMatcher } from '../../../../shared/form-error-state-matcher';
import { StudentInfo } from '../../student-info.model';

@Component({
  selector: 'app-student-info-dialog',
  templateUrl: './student-info-dialog.component.html',
  styleUrls: ['./student-info-dialog.component.css']
})
export class StudentInfoDialogComponent implements OnInit {
  matcher = new FormErrorStateMatcher();
  studentForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: StudentInfo,
    private fb: FormBuilder
  ) {
    this.createForm();
  }

  ngOnInit() {}
  createForm() {
    this.studentForm = this.fb.group({
      userName: new FormControl(this.data.userName, [
        Validators.required,
        Validators.maxLength(32),
        Validators.pattern(/\S+/)
      ]),
      name: new FormControl(this.data.name, [
        Validators.required,
        Validators.maxLength(32),
        Validators.pattern(/\S+/)
      ]),
      password: new FormControl(this.data.password, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(32),
        Validators.pattern(/\S+/)
      ])
    });
  }
}
