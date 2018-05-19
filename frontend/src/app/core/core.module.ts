import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthModule } from './auth/auth.module';
import { throwIfAlreadyLoaded } from './module-import-guard';
import { HttpClientModule } from '@angular/common/http';
import {
  HttpClientInMemoryWebApiModule,
  InMemoryBackendConfigArgs
} from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data-service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
      dataEncapsulation: false,
      delay: 2000
    })
  ],
  exports: [HttpClientModule, HttpClientInMemoryWebApiModule, AuthModule],
  declarations: []
})
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule
  ) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
