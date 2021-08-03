import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/core/base.service';
import { HttpService } from 'src/app/core/http.service';
import { environment } from 'src/environments/environment';
import { JobApplicant } from './job-applicant';

@Injectable()
export class JobApplicantService extends BaseService<JobApplicant> {

  constructor(protected http: HttpService) {
    super(http);
    this.apiUrlResource = environment.REST_CORE + 'candidatos';
  }
}
