import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobRoutingModule } from './job-routing.module';
import { AllJobsComponent } from './all-jobs/all-jobs.component';
import { PostNewJobComponent } from './post-new-job/post-new-job.component';

// import { NgWizardModule, NgWizardConfig, THEME } from 'ng-wizard';

// const ngWizardConfig: NgWizardConfig = {
//   theme: THEME.default,
// };

@NgModule({
  declarations: [AllJobsComponent, PostNewJobComponent],
  imports: [
    CommonModule,
    JobRoutingModule,
    // NgWizardModule.forRoot(ngWizardConfig),
  ],
})
export class JobModule {}
