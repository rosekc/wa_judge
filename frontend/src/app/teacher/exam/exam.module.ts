import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExamListComponent } from './exam-list/exam-list.component';
import { ExamDetailComponent } from './exam-detail/exam-detail.component';
import { ExamService } from './exam.service';

@NgModule({
  imports: [CommonModule],
  providers: [ExamService],
  declarations: [ExamListComponent, ExamDetailComponent]
})
export class ExamModule {}
