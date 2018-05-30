import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../core/auth/auth.guard';
import { ContestComponent } from './contest/contest.component';
import { StudentComponent } from './student/student.component';

const routes: Routes = [
  {
    path: '',
    component: StudentComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'contest', pathMatch: 'full' },
      { path: 'contest', component: ContestComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule {}
