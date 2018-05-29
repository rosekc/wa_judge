import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';
import { StudentCreateComponent } from './student-create/student-create.component';
import { StudentCreateMultiComponent } from './student-create/student-create-multi/student-create-multi.component';
import { StudentCreateSingleComponent } from './student-create/student-create-single/student-create-single.component';
import { StudentDetailComponent } from './student-detail/student-detail.component';
import { StudentInfoDialogComponent } from './student-create/student-info-dialog/student-info-dialog.component';
import { StudentListComponent } from './student-list/student-list.component';

@NgModule({
  imports: [CommonModule, SharedModule],
  entryComponents: [StudentInfoDialogComponent],
  declarations: [
    StudentCreateComponent,
    StudentCreateMultiComponent,
    StudentCreateSingleComponent,
    StudentDetailComponent,
    StudentInfoDialogComponent,
    StudentListComponent
  ]
})
export class StudentModule {}
