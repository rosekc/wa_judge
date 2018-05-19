import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../core/auth/auth.guard';
import { ExamListComponent } from './exam/exam-list/exam-list.component';
import { ExamDetailComponent } from './exam/exam-detail/exam-detail.component';
import { StudentComponent } from './student/student.component';

const routes: Routes = [
  {
    path: '',
    component: StudentComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'exam', pathMatch: 'full' },
      { path: 'exam', component: ExamListComponent },
      { path: 'exam/:id', component: ExamDetailComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule {}
