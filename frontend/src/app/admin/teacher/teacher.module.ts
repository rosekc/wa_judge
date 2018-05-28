import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeacherListComponent } from './teacher-list/teacher-list.component';
import { TeacherDetailComponent } from './teacher-detail/teacher-detail.component';
import { TeacherCreateComponent } from './teacher-create/teacher-create.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [TeacherListComponent, TeacherDetailComponent, TeacherCreateComponent]
})
export class TeacherModule { }
