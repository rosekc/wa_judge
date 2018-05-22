import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExamModule } from './exam/exam.module';
import { StudentComponent } from './student/student.component';
import { StudentRoutingModule } from './student-routing.module';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [CommonModule, StudentRoutingModule, SharedModule, ExamModule],
  declarations: [StudentComponent]
})
export class StudentModule {}
