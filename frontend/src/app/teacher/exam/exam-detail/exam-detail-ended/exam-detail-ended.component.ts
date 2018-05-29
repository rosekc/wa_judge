import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ExamInfo } from '../../exam-info.model';
import { ExamService } from '../../exam.service';

@Component({
  selector: 'app-exam-detail-ended',
  templateUrl: './exam-detail-ended.component.html',
  styleUrls: ['./exam-detail-ended.component.css']
})
export class ExamDetailEndedComponent implements OnInit {
  get examInfo(): ExamInfo {
    return this.examService.currentExamInfo;
  }

  private url = '/teacher/exam';

  constructor(private examService: ExamService, private router: Router) {}

  ngOnInit() {}

  updateExamInfo() {
    this.examService.updateCurrentExamInfo();
  }

  download() {}

  goBack() {
    this.router.navigate([this.url]);
  }
}
