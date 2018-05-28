import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExamListComponent } from './exam-list/exam-list.component';
import { ExamService } from './exam.service';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [ExamListComponent],
  providers: [ExamService]
})
export class ExamModule {}
