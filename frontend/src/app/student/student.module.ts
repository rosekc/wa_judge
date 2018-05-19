import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentComponent } from './student/student.component';
import { StudentRoutingModule } from './student-routing.module';

import { SharedModule } from '../shared/shared.module';
import { ExamsComponent } from './exams/exams.component';

@NgModule({
  imports: [CommonModule, StudentRoutingModule, SharedModule],
  declarations: [StudentComponent, ExamsComponent]
})
export class StudentModule {}
