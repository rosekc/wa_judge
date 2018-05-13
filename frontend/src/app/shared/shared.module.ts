import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialViewModule } from './material-view/material-view.module';
import { ErrorDialogComponent } from './dialog/error-dialog/error-dialog.component';

@NgModule({
  imports: [CommonModule, MaterialViewModule],
  exports: [FormsModule, ReactiveFormsModule, MaterialViewModule],
  entryComponents: [ErrorDialogComponent],
  declarations: [ErrorDialogComponent]
})
export class SharedModule {}
