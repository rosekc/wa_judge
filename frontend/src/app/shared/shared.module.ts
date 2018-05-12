import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialViewModule } from './material-view/material-view.module';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    MaterialViewModule
  ],
  declarations: []
})
export class SharedModule { }
