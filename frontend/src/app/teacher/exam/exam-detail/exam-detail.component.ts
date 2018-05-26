import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { isNumber } from 'util';

import { ExamInfo } from '../exam-info.model';
import { ExamService } from '../exam.service';

@Component({
  selector: 'app-exam-detail',
  templateUrl: './exam-detail.component.html',
  styleUrls: ['./exam-detail.component.css']
})
export class ExamDetailComponent implements OnInit, AfterViewInit, OnDestroy {
  isLoading = true;
  get examInfo(): ExamInfo {
    return this.examService.currentExamInfo;
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
  }

  getIsLoading() {
    return !this.examInfo && this.isLoading;
  }

  private initExamInfo() {
    if (!this.examService.currentExamInfo) {
      const id = this.route.snapshot.paramMap.get('id');
      const nid = Number(id);
      if (isNumber(nid) && !isNaN(nid)) {
        this.examService.getExam(nid).subscribe(
          x => {
            if (x) {
              this.isLoading = false;
            } else {
              this.router.navigate(['/teacher/exam']);
            }
          },
          error => {
            this.router.navigate(['/teacher/exam']);
          }
        );
      } else {
        this.router.navigate(['/teacher/exam']);
      }
    } else {
      this.isLoading = false;
    }
  }
}
