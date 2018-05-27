import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExamModule } from './exam/exam.module';
import { TeacherComponent } from './teacher/teacher.component';
import { TeacherRoutingModule } from './teacher-routing.module';

import { SharedModule } from '../shared/shared.module';
import { SettingsComponent } from './settings/settings.component';

@NgModule({
  imports: [CommonModule, TeacherRoutingModule, SharedModule, ExamModule],
  declarations: [TeacherComponent, SettingsComponent]
})
export class TeacherModule {}
