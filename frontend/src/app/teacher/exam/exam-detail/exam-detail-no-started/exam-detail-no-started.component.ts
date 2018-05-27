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

import { AuthService } from '../../../../core/auth/auth.service';
import { ExamService } from '../../exam.service';
import { FormErrorStateMatcher } from '../../../../shared/form-error-state-matcher';

@Component({
  selector: 'app-exam-detail-no-started',
  templateUrl: './exam-detail-no-started.component.html',
  styleUrls: ['./exam-detail-no-started.component.css']
})
export class ExamDetailNoStartedComponent implements OnInit {
  examForm: FormGroup;
  matcher = new FormErrorStateMatcher();

  constructor(
    private authService: AuthService,
    private examService: ExamService,
    private fb: FormBuilder,
    private router: Router
  ) {
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
      startTime: new FormControl(
        moment(this.examService.currentExamInfo.startTime),
        [Validators.required]
      ),
      endTime: new FormControl(
        moment(this.examService.currentExamInfo.endTime),
        [Validators.required]
      )
    });
  }

  save() {}

  delete() {}

  goBack() {
    this.router.navigate(['/teacher/exam']);
  }
}
