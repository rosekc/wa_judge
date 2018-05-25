import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExamCreateComponent } from './exam-create/exam-create.component';
import { ExamDetailComponent } from './exam-detail/exam-detail.component';
import { ExamListComponent } from './exam-list/exam-list.component';
import { ExamService } from './exam.service';

import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [CommonModule, SharedModule],
  providers: [ExamService],
  declarations: [ExamCreateComponent, ExamDetailComponent, ExamListComponent]
})
export class ExamModule {}
