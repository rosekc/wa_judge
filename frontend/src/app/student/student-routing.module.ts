import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../core/auth/auth.guard';
import { ExamsComponent } from './exams/exams.component';
import { StudentComponent } from './student/student.component';

const routes: Routes = [
  {
    path: '',
    component: StudentComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'exams', pathMatch: 'full' },
      { path: 'exams', component: ExamsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule {}
