import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContestComponent } from './contest.component';
import { ContestService } from './contest.service';

import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [CommonModule, SharedModule],
  providers: [ContestService],
  declarations: [ContestComponent]
})
export class ContestModule {}
