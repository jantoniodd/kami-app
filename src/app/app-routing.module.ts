import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './layouts/admin/admin.component';
import { AuthComponent } from './layouts/auth/auth.component';
import { JobApplicantModule } from './modules/job-applicant/job-applicant.module';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'postulantes',
        loadChildren: () =>
          import('./modules/job-applicant/job-applicant.module').then(
            (m) => JobApplicantModule
          ),
      },
    ],
  },
  {
    path:'login',
    component : AuthComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
