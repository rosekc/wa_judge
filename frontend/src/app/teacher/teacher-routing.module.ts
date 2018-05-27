import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../core/auth/auth.guard';
import { ExamCreateComponent } from './exam/exam-create/exam-create.component';
import { ExamListComponent } from './exam/exam-list/exam-list.component';
import { ExamDetailComponent } from './exam/exam-detail/exam-detail.component';
import { SettingsComponent } from './settings/settings.component';
import { TeacherComponent } from './teacher/teacher.component';

const routes: Routes = [
  {
    path: '',
    component: TeacherComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'exam', pathMatch: 'full' },
      { path: 'exam', component: ExamListComponent },
      { path: 'exam/create', component: ExamCreateComponent },
      { path: 'exam/:id', component: ExamDetailComponent },
      { path: 'settings', component: SettingsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule {}
