import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ExamInfo } from '../../exam-info.model';
import { ExamService } from '../../exam.service';

@Component({
  selector: 'app-exam-detail-in-progress',
  templateUrl: './exam-detail-in-progress.component.html',
  styleUrls: ['./exam-detail-in-progress.component.css']
})
export class ExamDetailInProgressComponent implements OnInit {
  get examInfo(): ExamInfo {
    return this.examService.currentExamInfo;
  }

  constructor(private examService: ExamService, private router: Router) {}

  ngOnInit() {}

  updateExamInfo() {
    this.examService.updateCurrentExamInfo();
  }

  goBack() {
    this.router.navigate(['/teacher/exam']);
  }
}
