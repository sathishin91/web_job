// token.interceptor.ts

import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '../../Store/Common/App.state';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private store: Store<AppState>) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Dispatch the action to get the token
    // this.store.dispatch(TokenActions.getToken());

    // Get the token from the store
    return (
      this.store
        // eslint-disable-next-line @ngrx/prefer-selector-in-select
        .select((state) => state.token.token)
        .pipe(
          switchMap((token) => {
            // Ensure that the token is a string
            const tokenString = typeof token === 'string' ? token : '';

            // Clone the request and add the token to the header
            const authRequest = request.clone({
              setHeaders: {
                Authorization: tokenString,
              },
            });

            // Pass the cloned request to the next handler
            return next.handle(authRequest);
          })
        )
    );
  }
}
