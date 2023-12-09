import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, switchMap } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';
import { Store } from '@ngrx/store';
import { AppState } from '../../Store/Common/App.state';

import * as TokenActions from '../../Store/Token/Token.Actions';

import {
  Menus,
  Roleaccess,
  Roles,
  Usercred,
  Userinfo,
  Users,
} from '../../Store/Model/User.Model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient, private store: Store<AppState>) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser') || '{}')
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  // UserLogin(userdata: Usercred): Observable<Userinfo[]> {
  //   return this.http.get<Userinfo[]>(
  //     `${environment.apiUrl}/SignIn/verify` +
  //       '?mobile=' +
  //       userdata.mobile +
  //       '&otp=' +
  //       userdata.otp
  //   );
  // }

  getOtp(mobile_number: number) {
    this.store.dispatch(TokenActions.getToken());
    const data = {
      api_key: environment.api_key,
      mobile: mobile_number,
      role_id: environment.role_id,
    };
    return this.http.post(`${environment.apiUrl}/SignIn/login`, data);
  }

  login(mobile_number: number, otp: number) {
    const data = {
      api_key: environment.api_key,
      mobile: mobile_number,
      otp_code: otp,
    };
    return this.http
      .post<User>(`${environment.apiUrl}/SignIn/verify`, data)
      .pipe(
        map((user) => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          // console.log(JSON.stringify(user));
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;
        })
      );
  }

  registerUser(data: any) {
    return this.http.post(`${environment.apiUrl}/SignUp/signup`, data);
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(this.currentUserValue);
    return of({ success: false });
  }

  SetUserToLoaclStorage(userdata: Userinfo) {
    localStorage.setItem('userdata', JSON.stringify(userdata));
  }

  getToken() {
    return this.http.get(`${environment.apiUrl}/Auth/getToken`);
  }
}
