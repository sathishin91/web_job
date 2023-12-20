import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllJobsComponent } from './all-jobs/all-jobs.component';
import { PostNewJobComponent } from './post-new-job/post-new-job.component';
import { JobDetailComponent } from './job-detail/job-detail.component';

const routes: Routes = [
  { path: '', component: AllJobsComponent },
  { path: 'jobs', component: AllJobsComponent },
  { path: 'new-job/:id', component: PostNewJobComponent },
  { path: 'edit-job/:id', component: PostNewJobComponent },
  { path: 'job-detail/:id', component: JobDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JobRoutingModule {}
