import { Component, OnInit, Input, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  FormControlDirective
} from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';

import { AuthService } from '../../core/auth/auth.service';
import { DialogService } from '../../shared/dialog/dialog.service';
import { FormErrorStateMatcher } from '../../shared/form-error-state-matcher';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  matcher = new FormErrorStateMatcher();
  loginForm: FormGroup;
  @ViewChild('emailBox') emailBox;

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
      email: new FormControl('', [Validators.required, Validators.email]),
      pass: new FormControl('', [
        Validators.required,
        Validators.maxLength(32),
        Validators.pattern(/\S+/)
      ])
    });
  }

  login() {
    const email = this.loginForm.get('email').value as string;
    const pass = this.loginForm.get('pass').value as string;
    this.authService.login({ email, pass }).subscribe(b => {
      if (b) {
        this.router.navigate([this.authService.redirectUrl]);
      } else {
        this.dialogService.showErrorMessage('邮箱或密码错误', () => {
          this.loginForm.reset();
          this.emailBox.nativeElement.focus();
        });
      }
    });
  }
}
