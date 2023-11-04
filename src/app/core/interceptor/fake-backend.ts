import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { User } from '../models/user';

const users: User[] = [
  {
    id: 1,
    mobile_number: 8098778216,
    otp: 1234,
    firstName: 'Sarah',
    lastName: 'Smith',
    token: 'admin-token',
  },
];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = request;
    // wrap in delayed observable to simulate server api call
    return of(null).pipe(mergeMap(handleRoute));

    function handleRoute() {
      switch (true) {
        case url.endsWith('/authenticate') && method === 'POST':
          return authenticate();
        default:
          // pass through any requests not handled above
          return next.handle(request);
      }
    }

    // route functions

    function authenticate() {
      const { mobile_number, otp } = body;
      const user = users.find(
        (x) => x.mobile_number === mobile_number && x.otp === otp
      );
      if (!user) {
        return error('mobile number or otp is incorrect');
      }
      return ok({
        id: user.id,
        mobile_number: user.mobile_number,
        otp: user.otp,
        firstName: user.firstName,
        lastName: user.lastName,
        token: user.token,
      });
    }

    // helper functions

    function ok(body?: {
      id: number;
      mobile_number: number;
      otp: number;

      firstName: string;
      lastName: string;
      token: string;
    }) {
      return of(new HttpResponse({ status: 200, body }));
    }

    function error(message: string) {
      return throwError({ error: { message } });
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    function unauthorized() {
      return throwError({ status: 401, error: { message: 'Unauthorised' } });
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    function isLoggedIn() {
      return headers.get('Authorization') === 'Bearer fake-jwt-token';
    }
  }
}

export const fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true,
};
