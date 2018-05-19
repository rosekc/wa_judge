import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatButtonModule,
  MatDialogModule,
  MatInputModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatTableModule
} from '@angular/material';

@NgModule({
  imports: [CommonModule],
  exports: [
    FlexLayoutModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule
  ],
  declarations: []
})
export class MaterialViewModule {}
