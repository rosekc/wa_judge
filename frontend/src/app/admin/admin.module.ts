import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminComponent } from './admin/admin.component';
import { AdminRoutingModule } from './admin-routing.module';

import { SharedModule } from '../shared/shared.module';
import { SettingsComponent } from './settings/settings.component';

@NgModule({
  imports: [CommonModule, AdminRoutingModule, SharedModule],
  declarations: [AdminComponent, SettingsComponent]
})
export class AdminModule {}
