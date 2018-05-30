import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminComponent } from './admin/admin.component';
import { AdminRoutingModule } from './admin-routing.module';

import { ContestModule } from './contest/contest.module';
import { SharedModule } from '../shared/shared.module';
import { SettingsComponent } from './settings/settings.component';
import { StudentModule } from './student/student.module';
import { TeacherModule } from './teacher/teacher.module';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    ContestModule,
    StudentModule,
    TeacherModule
  ],
  declarations: [AdminComponent, SettingsComponent]
})
export class AdminModule {}
