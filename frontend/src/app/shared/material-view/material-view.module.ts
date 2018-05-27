import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatButtonModule,
  MatCardModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatInputModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatTooltipModule,
  MatToolbarModule,
} from '@angular/material';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatDatetimepickerModule } from '@mat-datetimepicker/core';
import { MatMomentDatetimeModule } from '@mat-datetimepicker/moment';

import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE
} from '@angular/material';
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter
} from '@angular/material-moment-adapter';
import {
  MAT_MOMENT_DATETIME_FORMATS,
  MomentDatetimeAdapter
} from '@mat-datetimepicker/moment';
import {
  DatetimeAdapter,
  MAT_DATETIME_FORMATS
} from '@mat-datetimepicker/core';

@NgModule({
  imports: [CommonModule],
  exports: [
    FlexLayoutModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatDatetimepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatInputModule,
    MatMomentDateModule,
    MatMomentDatetimeModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule
  ],
  declarations: [],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'zh-cn' },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE]
    },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
    {
      provide: DatetimeAdapter,
      useClass: MomentDatetimeAdapter,
      deps: [MAT_DATE_LOCALE, DateAdapter]
    },
    { provide: MAT_DATETIME_FORMATS, useValue: MAT_MOMENT_DATETIME_FORMATS }
  ]
})
export class MaterialViewModule {}
