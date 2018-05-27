import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ExamInfo } from '../../exam-info.model';

@Component({
  selector: 'app-exam-progress',
  templateUrl: './exam-progress.component.html',
  styleUrls: ['./exam-progress.component.css']
})
export class ExamProgressComponent implements OnInit, OnDestroy {
  @Input() examInfo: ExamInfo;
  @Input() update: Function;
  totalTime: number;
  restTime: number;
  private timer;

  get examProgress(): number {
    return (this.totalTime - this.restTime) / this.totalTime * 100;
  }

  constructor() { }

  ngOnInit() {
    this.updateExamInfo();
  }

  ngOnDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  private updateExamInfo() {
    this.timer = setInterval(() => {
      const e = new Date(this.examInfo.endTime).getTime();
      const n = Date.now();
      this.restTime = new Date(this.examInfo.endTime).getTime() - Date.now();
      this.update();
      if (this.restTime <= 0) {
        this.restTime = 0;
        clearInterval(this.timer);
      }
    }, 1000);
    this.totalTime =
      new Date(this.examInfo.endTime).getTime() -
      new Date(this.examInfo.startTime).getTime();
  }
}
