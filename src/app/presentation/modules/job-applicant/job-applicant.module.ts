import { NgModule } from '@angular/core';

import { JobApplicantRoutingModule } from './job-applicant-routing.module';
import { JobApplicantComponent } from './job-applicant.component';
import { JobApplicantListComponent } from './job-applicant-list/job-applicant-list.component';
import { JobApplicantService } from './job-applicant.service';
import { SharedModule } from '../../shared/shared.module';
import { JobApplicantFormComponent } from './job-applicant-form/job-applicant-form.component';


@NgModule({
  declarations: [
    JobApplicantComponent,
    JobApplicantListComponent,
    JobApplicantFormComponent
  ],
  imports: [
    SharedModule,
    JobApplicantRoutingModule
  ],
  providers: [JobApplicantService]
})
export class JobApplicantModule { }
