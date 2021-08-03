import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobApplicantFormComponent } from './job-applicant-form/job-applicant-form.component';
import { JobApplicantComponent } from './job-applicant.component';

const routes: Routes = [
  {
    path: '',
    component: JobApplicantComponent,
  },
  {
    path: 'nuevo',
    component: JobApplicantFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JobApplicantRoutingModule {}
