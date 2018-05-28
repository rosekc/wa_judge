import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';
import { StudentCreateComponent } from './student-create/student-create.component';
import { StudentDetailComponent } from './student-detail/student-detail.component';
import { StudentListComponent } from './student-list/student-list.component';

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [
    StudentCreateComponent,
    StudentDetailComponent,
    StudentListComponent
  ]
})
export class StudentModule {}
