import { Component, OnInit, Input, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';

import { AuthService } from '../../../core/auth/auth.service';
import { DialogService } from '../../../shared/dialog/dialog.service';
import { FormErrorStateMatcher } from '../../../shared/form-error-state-matcher';

@Component({
  selector: 'app-student-login',
  templateUrl: './student-login.component.html',
  styleUrls: ['./student-login.component.css']
})
export class StudentLoginComponent implements OnInit {
  isLoading = false;
  matcher = new FormErrorStateMatcher();
  loginForm: FormGroup;
  @ViewChild('studentIdBox') studentIdBox;

  constructor(
    private authService: AuthService,
    private dialogService: DialogService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.createForm();
  }

  ngOnInit() {}

  createForm(): void {
    this.loginForm = this.fb.group({
      studentId: new FormControl('', [
        Validators.required,
        Validators.maxLength(32),
        Validators.pattern(/\S+/)
      ]),
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(32),
        Validators.pattern(/\S+/)
      ]),
      contestId: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(63),
        Validators.pattern(/\d+/)
      ])
    });
  }

  login() {
    this.isLoading = true;
    this.authService.studentLogin(this.loginForm.value).subscribe(b => {
      if (b) {
        this.router.navigate([this.authService.redirectUrl]);
      } else {
        this.dialogService.showErrorMessage('学号、姓名或考试码错误', () => {
          this.isLoading = false;
          this.loginForm.reset();
          this.studentIdBox.nativeElement.focus();
        });
      }
    });
  }
}
