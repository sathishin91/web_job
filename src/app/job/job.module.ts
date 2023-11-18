import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobRoutingModule } from './job-routing.module';
import { AllJobsComponent } from './all-jobs/all-jobs.component';
import { PostNewJobComponent } from './post-new-job/post-new-job.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

@NgModule({
  declarations: [AllJobsComponent, PostNewJobComponent],
  imports: [
    CommonModule,
    JobRoutingModule,
    ReactiveFormsModule,
    CKEditorModule,
  ],
})
export class JobModule {}
