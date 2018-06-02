import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContestBasicInfoComponent } from './contest-basic-info/contest-basic-info.component';
import { ContestCreateComponent } from './contest-create/contest-create.component';
import { ContestDetailComponent } from './contest-detail/contest-detail.component';
import { ContestDetailEndedComponent } from './contest-detail/contest-detail-ended/contest-detail-ended.component';
import { ContestDetailInProgressComponent } from './contest-detail/contest-detail-in-progress/contest-detail-in-progress.component';
import { ContestDetailNoStartedComponent } from './contest-detail/contest-detail-no-started/contest-detail-no-started.component';
import { ContestListComponent } from './contest-list/contest-list.component';
import { ContestProgressComponent } from './contest-detail/contest-progress/contest-progress.component';
import { ContestStudentInfoComponent } from './contest-student-info/contest-student-info.component';
import { ContestService } from './contest.service';

import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [CommonModule, SharedModule],
  providers: [ContestService],
  declarations: [
    ContestBasicInfoComponent,
    ContestCreateComponent,
    ContestDetailComponent,
    ContestDetailEndedComponent,
    ContestDetailInProgressComponent,
    ContestDetailNoStartedComponent,
    ContestListComponent,
    ContestProgressComponent,
    ContestStudentInfoComponent
  ]
})
export class ContestModule {}
