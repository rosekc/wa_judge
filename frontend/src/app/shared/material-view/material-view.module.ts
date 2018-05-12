import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material';

@NgModule({
  imports: [CommonModule],
  exports: [FlexLayoutModule, MatButtonModule],
  declarations: []
})
export class MaterialViewModule {}
