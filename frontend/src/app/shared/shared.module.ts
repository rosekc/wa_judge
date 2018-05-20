import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HeadComponent } from './head/head.component';
import { MaterialViewModule } from './material-view/material-view.module';
import { RouterModule } from '@angular/router';
import { DialogModule } from './dialog/dialog.module';

@NgModule({
  imports: [CommonModule, MaterialViewModule, RouterModule],
  exports: [
    DialogModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialViewModule,
    HeadComponent
  ],
  declarations: [HeadComponent]
})
export class SharedModule {}
