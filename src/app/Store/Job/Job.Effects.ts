import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, tap } from 'rxjs/operators';
import { AuthService } from '../../core/service/auth.service';
import * as JobActions from './Job.Action';

@Injectable()
export class JobEffects {
  constructor(private actions$: Actions, private authService: AuthService) {}

  getDesignationLists$ = createEffect(() => {
    console.log('Entered inside the token effects');
    return this.actions$.pipe(
      ofType(JobActions.getDesignationList),
      mergeMap(() =>
        this.authService
          .getDesignationLists()
          .pipe(
            map((response: any) =>
              JobActions.setDesignationList({ designation: response.data })
            )
          )
      )
    );
  });

  getDepartmentList$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(JobActions.getDepartmentList),
      mergeMap((action) =>
        this.authService.getDepartmentsList(action.api_key, action.id).pipe(
          map((response: any) => {
            return JobActions.setDepartmentList({
              department: response.department_list,
              category: response.category_list,
            });
          })
        )
      )
    );
  });

  getCityLists$ = createEffect(() => {
    console.log('Entered inside');
    return this.actions$.pipe(
      ofType(JobActions.getCityList),
      mergeMap(() =>
        this.authService
          .getCityList()
          .pipe(
            map((response: any) =>
              JobActions.setCityList({ city: response.data })
            )
          )
      )
    );
  });

  getEducationLists$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(JobActions.getEducationList),
      mergeMap(() =>
        this.authService
          .getEducationLists()
          .pipe(
            map((response: any) =>
              JobActions.setEducationList({ education: response.data })
            )
          )
      )
    );
  });

  getEngLists$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(JobActions.getEnglishLevelList),
      mergeMap(() =>
        this.authService
          .getEngLevelLists()
          .pipe(
            map((response: any) =>
              JobActions.setEnglishLevelList({ englishLevel: response.data })
            )
          )
      )
    );
  });

  getExpLists$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(JobActions.getExperienceList),
      mergeMap(() =>
        this.authService
          .getExperienceLists()
          .pipe(
            map((response: any) =>
              JobActions.setExperienceList({ experience: response.data })
            )
          )
      )
    );
  });
  setAddJobDetails$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(JobActions.setAddJobDetails),
      mergeMap((action) =>
        this.authService.postJobDetails(action.data).pipe(
          map((response: any) => {
            // Assuming that the ID is in the 'id' property of the response
            const jobId = response.job_id;

            // Store the job ID in localStorage
            localStorage.setItem('jobId', jobId);

            return JobActions.getAddJobDetails({ addJobDetails: response });
          })
          // You can add catchError here if needed
        )
      )
    );
  });
  setAddCandidateDetails$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(JobActions.setAddCandidateDetails),
      mergeMap((action) =>
        this.authService.postCandidateDetails(action.data).pipe(
          map((response: any) =>
            JobActions.getAddCandidateDetails({
              addCandidateDetails: response,
            })
          )
        )
      )
    );
  });

  setAddInterviewDetails$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(JobActions.setAddInterviewDetails),
      mergeMap((action) =>
        this.authService.postInterviewDetails(action.data).pipe(
          map((response: any) =>
            JobActions.getAddInterviewDetails({
              addInterviewDetails: response,
            })
          )
        )
      )
    );
  });

  getJobList$ = createEffect(() => {
    console.log('Entered the effects of get job list');
    return this.actions$.pipe(
      ofType(JobActions.setJobsList),
      mergeMap((action) => {
        console.log('Merging action:', action);
        return this.authService.getTheJobsList(action.list).pipe(
          map((response: any) =>
            JobActions.getJobsList({
              list: response,
            })
          )
        );
      })
    );
  });

  getPreviewList$ = createEffect(() => {
    console.log('inside the preview');
    return this.actions$.pipe(
      ofType(JobActions.setPreviewDetails),
      mergeMap((action) => {
        return this.authService.getJobpreview(action.preview).pipe(
          map((response: any) => {
            // Return the action here
            return JobActions.getPreviewDetails({
              preview: response,
            });
          })
        );
      })
    );
  });

  getJobId$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(JobActions.setJobDetailsId),
      mergeMap((action) => {
        return this.authService.getJobId(action.singlejob).pipe(
          map((response: any) => {
            // Return the action here
            return JobActions.getJobDetailsId({
              singlejob: response,
            });
          })
        );
      })
    );
  });

  editJobDetaile$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(JobActions.setEditJobDetails),
      mergeMap((action) => {
        return this.authService.editJobDetails(action.data).pipe(
          map((response: any) => {
            // Return the action here
            return JobActions.getEditJobDetails({
              editJobDetails: response,
            });
          })
        );
      })
    );
  });

  editCandidateDetaile$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(JobActions.setEditCandidateDetails),
      mergeMap((action) => {
        return this.authService.editJobDetails(action.data).pipe(
          map((response: any) => {
            // Return the action here
            return JobActions.getEditCandidateDetails({
              editCandidateDetails: response,
            });
          })
        );
      })
    );
  });

  setEditInterviewDetails$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(JobActions.setEditInterviewDetails),
      mergeMap((action) =>
        this.authService.editInterviewDetails(action.data).pipe(
          map((response: any) =>
            JobActions.getEditInterviewDetails({
              editInterviewDetails: response,
            })
          )
        )
      )
    );
  });
}
