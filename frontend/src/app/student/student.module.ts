import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExamModule } from './exam/exam.module';
import { StudentComponent } from './student/student.component';
import { StudentRoutingModule } from './student-routing.module';

import { SharedModule } from '../shared/shared.module';
import { SettingsComponent } from './settings/settings.component';

@NgModule({
  imports: [CommonModule, StudentRoutingModule, SharedModule, ExamModule],
  declarations: [StudentComponent, SettingsComponent]
})
export class StudentModule {}
