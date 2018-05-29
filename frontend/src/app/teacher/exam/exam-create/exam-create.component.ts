import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Moment } from 'moment';

import { AuthService } from '../../../core/auth/auth.service';
import { ExamService } from '../exam.service';
import { FormErrorStateMatcher } from '../../../shared/form-error-state-matcher';

@Component({
  selector: 'app-exam-create',
  templateUrl: './exam-create.component.html',
  styleUrls: ['./exam-create.component.css']
})
export class ExamCreateComponent implements OnInit {
  examForm: FormGroup;
  matcher = new FormErrorStateMatcher();

  private url = '/teacher/exam';

  constructor(
    private authService: AuthService,
    private examService: ExamService,
    private fb: FormBuilder,
    private router: Router
  ) {
    if (!this.examService.currentExamInfo) {
      this.examService.currentExamInfo = {
        name: '新考试',
        teacherId: this.authService.user.id
      };
    }
    this.createForm();
  }

  ngOnInit() {}

  createForm() {
    this.examForm = this.fb.group({
      name: new FormControl(this.examService.currentExamInfo.name, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(255)
      ]),
      startTime: new FormControl(undefined, [Validators.required]),
      endTime: new FormControl(undefined, [Validators.required])
    });
  }

  create() {}

  goBack() {
    this.router.navigate([this.url]);
  }
}
