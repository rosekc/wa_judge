import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';
import { TeacherListComponent } from './teacher-list/teacher-list.component';
import { TeacherDetailComponent } from './teacher-detail/teacher-detail.component';
import { TeacherCreateComponent } from './teacher-create/teacher-create.component';
import { TeacherService } from './teacher.service';

@NgModule({
  imports: [CommonModule, SharedModule],
  providers: [TeacherService],
  declarations: [
    TeacherListComponent,
    TeacherDetailComponent,
    TeacherCreateComponent
  ]
})
export class TeacherModule {}
