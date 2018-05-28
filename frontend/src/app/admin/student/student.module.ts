import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentDetailComponent } from './student-detail/student-detail.component';
import { StudentCreateComponent } from './student-create/student-create.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [StudentListComponent, StudentDetailComponent, StudentCreateComponent]
})
export class StudentModule { }
