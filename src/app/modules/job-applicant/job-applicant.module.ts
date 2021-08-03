import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { JobApplicantRoutingModule } from './job-applicant-routing.module';
import { JobApplicantComponent } from './job-applicant.component';
import { JobApplicantFormComponent } from './job-applicant-form/job-applicant-form.component';
import { JobApplicantListComponent } from './job-applicant-list/job-applicant-list.component';
import { JobApplicantService } from './job-applicant.service';


@NgModule({
  declarations: [
    JobApplicantComponent,
    JobApplicantFormComponent,
    JobApplicantListComponent
  ],
  imports: [
    SharedModule,
    JobApplicantRoutingModule
  ],
  providers: [JobApplicantService]
})
export class JobApplicantModule { }
