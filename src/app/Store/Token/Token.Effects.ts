// token.effects.ts

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map } from 'rxjs/operators';
import { AuthService } from '../../core/service/auth.service'; // Create this service for API calls
import * as TokenActions from './Token.Actions';

@Injectable()
export class TokenEffects {
  constructor(private actions$: Actions, private authService: AuthService) {}

  getToken$ = createEffect(() => {
    console.log('Entered inside the token effects');
    return this.actions$.pipe(
      ofType(TokenActions.getToken),
      mergeMap(() =>
        this.authService
          .getToken()
          .pipe(
            map((response: any) =>
              TokenActions.setToken({ token: response.token })
            )
          )
      )
    );
  });
}
