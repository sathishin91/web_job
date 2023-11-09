import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobRoutingModule } from './job-routing.module';
import { AllJobsComponent } from './all-jobs/all-jobs.component';
import { PostNewJobComponent } from './post-new-job/post-new-job.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AllJobsComponent, PostNewJobComponent],
  imports: [CommonModule, JobRoutingModule, ReactiveFormsModule],
})
export class JobModule {}
