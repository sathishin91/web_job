import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map } from 'rxjs/operators';
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

  setAddJobDetails$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(JobActions.setAddJobDetails),
      mergeMap((action) =>
        this.authService.postJobDetails(action.data).pipe(
          map((response: any) => {
            return JobActions.getAddJobDetails({ addJobDetails: response });
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
              JobActions.setCityList({ city: response.city_id })
            )
          )
      )
    );
  });
}
