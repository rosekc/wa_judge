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
import { ContestService } from '../contest.service';
import { FormErrorStateMatcher } from '../../../shared/form-error-state-matcher';

@Component({
  selector: 'app-contest-create',
  templateUrl: './contest-create.component.html',
  styleUrls: ['./contest-create.component.css']
})
export class ContestCreateComponent implements OnInit {
  contestForm: FormGroup;
  matcher = new FormErrorStateMatcher();

  private url = '/teacher/contest';

  constructor(
    private authService: AuthService,
    private contestService: ContestService,
    private fb: FormBuilder,
    private router: Router
  ) {
    if (!this.contestService.contestInfo) {
      this.contestService.contestInfo = {
        name: '新考试',
        teacherId: this.authService.user.id
      };
    }
    this.createForm();
  }

  ngOnInit() {}

  createForm() {
    this.contestForm = this.fb.group({
      name: new FormControl(this.contestService.contestInfo.name, [
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
