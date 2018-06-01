import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContestSubmissionComponent } from './contest-submission/contest-submission.component';
import { ContestComponent } from './contest.component';
import { ContestService } from './contest.service';

import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [CommonModule, SharedModule],
  providers: [ContestService],
  declarations: [ContestComponent, ContestSubmissionComponent]
})
export class ContestModule {}
