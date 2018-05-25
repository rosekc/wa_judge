import { Component, OnInit } from '@angular/core';

import { ExamInfo } from '../exam-info.model';
import { ExamService } from '../exam.service';

@Component({
  selector: 'app-exam-detail',
  templateUrl: './exam-detail.component.html',
  styleUrls: ['./exam-detail.component.css']
})
export class ExamDetailComponent implements OnInit {
  get examInfo(): ExamInfo {
    return this.examService.currentExamInfo;
  }
  constructor(private examService: ExamService) { }

  ngOnInit() {
  }

}
