import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobRoutingModule } from './job-routing.module';
import { AllJobsComponent } from './all-jobs/all-jobs.component';


@NgModule({
  declarations: [
    AllJobsComponent
  ],
  imports: [
    CommonModule,
    JobRoutingModule
  ]
})
export class JobModule { }
