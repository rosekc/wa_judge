import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';

import { AuthService } from '../../core/auth/auth.service';
import { ContestInfo, ContestState } from './contest.model';
import { ContestService } from './contest.service';
import { StudentUser } from '../../core/auth/user.model';

@Component({
  selector: 'app-contest',
  templateUrl: './contest.component.html',
  styleUrls: ['./contest.component.css']
})
export class ContestComponent implements OnInit, AfterViewInit, OnDestroy {
  isLoading = true;
  totalTime: number;
  restTime: number;

  private timer;

  get contestInfo(): ContestInfo {
    return this.contestService.contestInfo;
  }

  get contestProgress(): number {
    return (this.totalTime - this.restTime) / this.totalTime * 100;
  }

  constructor(
    private authService: AuthService,
    private contestService: ContestService
  ) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.isLoading = true;
    this.initContestInfo();
  }

  ngOnDestroy() {
    this.contestService.contestInfo = undefined;
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  getIsLoading() {
    return !this.contestInfo && this.isLoading;
  }

  private updateContestInfo() {
    this.timer = setInterval(() => {
      const e = new Date(this.contestInfo.endTime).getTime();
      const n = Date.now();
      this.restTime = new Date(this.contestInfo.endTime).getTime() - Date.now();
      this.contestService.updateCurrentContestInfo();
      if (this.restTime <= 0) {
        this.restTime = 0;
        clearInterval(this.timer);
      }
    }, 1000);
    this.totalTime =
      new Date(this.contestInfo.endTime).getTime() -
      new Date(this.contestInfo.startTime).getTime();
    this.isLoading = false;
  }

  private initContestInfo() {
    if (!this.contestService.contestInfo) {
      this.contestService
        .getContest((<StudentUser>this.authService.user).contestId)
        .subscribe(
          x => {
            this.updateContestInfo();
          },
          error => {
            this.authService.logout();
          }
        );
    } else {
      this.updateContestInfo();
    }
  }
}
