import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobRoutingModule } from './job-routing.module';
import { AllJobsComponent } from './all-jobs/all-jobs.component';
import { PostNewJobComponent } from './post-new-job/post-new-job.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { JobDetailComponent } from './job-detail/job-detail.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgScrollbarModule } from 'ngx-scrollbar';

@NgModule({
  declarations: [AllJobsComponent, PostNewJobComponent, JobDetailComponent],
  imports: [
    CommonModule,
    JobRoutingModule,
    ReactiveFormsModule,
    CKEditorModule,
    NgbModule,
    FormsModule,
    NgScrollbarModule,
    ReactiveFormsModule,
  ],
})
export class JobModule {}
