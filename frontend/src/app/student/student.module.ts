import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExamDetailComponent } from './exam/exam-detail/exam-detail.component';
import { ExamListComponent } from './exam/exam-list/exam-list.component';
import { ExamService } from './exam/exam.service';
import { StudentComponent } from './student/student.component';
import { StudentRoutingModule } from './student-routing.module';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [CommonModule, StudentRoutingModule, SharedModule],
  providers: [ExamService],
  declarations: [StudentComponent, ExamDetailComponent, ExamListComponent]
})
export class StudentModule {}
