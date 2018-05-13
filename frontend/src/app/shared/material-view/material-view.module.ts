import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatButtonModule,
  MatDialogModule,
  MatInputModule
} from '@angular/material';

@NgModule({
  imports: [CommonModule],
  exports: [FlexLayoutModule, MatButtonModule, MatDialogModule, MatInputModule],
  declarations: []
})
export class MaterialViewModule {}
