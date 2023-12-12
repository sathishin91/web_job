// token.effects.ts

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map } from 'rxjs/operators';
import { AuthService } from '../../core/service/auth.service'; // Create this service for API calls
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
            return JobActions.setDepartmentList({ department: response.data });
          })
        )
      )
    );
  });
}
