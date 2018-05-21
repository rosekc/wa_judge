import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { isNumber } from 'util';

import { ExamService } from '../exam.service';
import { ExamInfo } from '../exam-info.model';

@Component({
  selector: 'app-exam-detail',
  templateUrl: './exam-detail.component.html',
  styleUrls: ['./exam-detail.component.css']
})
export class ExamDetailComponent implements OnInit, AfterViewInit, OnDestroy {
  isLoading = true;
  totalTime: number;
  restTime: number;
  private timer;

  get examInfo(): ExamInfo {
    return this.examService.currentExamInfo;
  }

  get examProgress(): number {
    return (this.totalTime - this.restTime) / this.totalTime * 100;
  }

  constructor(
    private examService: ExamService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.isLoading = true;
    this.initExamInfo();
  }

  ngOnDestroy() {
    this.examService.currentExamInfo = undefined;
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  getIsLoading() {
    return !this.examInfo && this.isLoading;
  }

  private updateExamInfo() {
    this.timer = setInterval(() => {
      const e = new Date(this.examInfo.endTime).getTime();
      const n = Date.now();
      this.restTime = new Date(this.examInfo.endTime).getTime() - Date.now();
      this.examService.updateCurrentExamInfo();
      if (this.restTime <= 0) {
        this.restTime = 0;
        clearInterval(this.timer);
      }
    }, 1000);
    this.totalTime =
      new Date(this.examInfo.endTime).getTime() -
      new Date(this.examInfo.startTime).getTime();
    this.isLoading = false;
  }

  private initExamInfo() {
    if (!this.examService.currentExamInfo) {
      const id = this.route.snapshot.paramMap.get('id');
      if (isNumber(Number(id))) {
        this.examService.getExam(Number.parseInt(id)).subscribe(
          x => {
            if (x) {
              this.updateExamInfo();
            } else {
              this.router.navigate(['/student/exam']);
            }
          },
          error => {
            this.router.navigate(['/student/exam']);
          }
        );
      } else {
        this.router.navigate(['/student/exam']);
      }
    } else {
      this.updateExamInfo();
    }
  }
}
