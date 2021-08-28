import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './presentation/layouts/auth/auth.component';
import { AdminComponent } from './presentation/layouts/admin/admin.component';
import { JobApplicantModule } from './presentation/modules/job-applicant/job-applicant.module';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'postulantes',
        loadChildren: () =>
          import('./presentation/modules/job-applicant/job-applicant.module').then(
            (m) => JobApplicantModule
          ),
      },
    ],
  },
  {
    path: 'login',
    component: AuthComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
