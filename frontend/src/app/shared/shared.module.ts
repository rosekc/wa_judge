import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ErrorDialogComponent } from './dialog/error-dialog/error-dialog.component';
import { HeadComponent } from './head/head.component';
import { MaterialViewModule } from './material-view/material-view.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, MaterialViewModule, RouterModule],
  exports: [FormsModule, ReactiveFormsModule, MaterialViewModule, HeadComponent],
  entryComponents: [ErrorDialogComponent],
  declarations: [ErrorDialogComponent, HeadComponent]
})
export class SharedModule {}
