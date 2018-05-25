import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExamCreateComponent } from './exam-create/exam-create.component';
import { ExamDetailComponent } from './exam-detail/exam-detail.component';
import { ExamDetailEndedComponent } from './exam-detail/exam-detail-ended/exam-detail-ended.component';
import { ExamDetailInProgressComponent } from './exam-detail/exam-detail-in-progress/exam-detail-in-progress.component';
import { ExamDetailNoStartedComponent } from './exam-detail/exam-detail-no-started/exam-detail-no-started.component';
import { ExamListComponent } from './exam-list/exam-list.component';
import { ExamService } from './exam.service';

import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [CommonModule, SharedModule],
  providers: [ExamService],
  declarations: [
    ExamCreateComponent,
    ExamDetailComponent,
    ExamListComponent,
    ExamDetailEndedComponent,
    ExamDetailInProgressComponent,
    ExamDetailNoStartedComponent
  ]
})
export class ExamModule {}
