import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { PageLoaderComponent } from './layout/page-loader/page-loader.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { RightSidebarComponent } from './layout/right-sidebar/right-sidebar.component';
import { AuthLayoutComponent } from './layout/app-layout/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layout/app-layout/main-layout/main-layout.component';
import { FooterComponent } from './layout/footer/footer.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

//import { fakeBackendProvider } from './core/interceptor/fake-backend';
//import { ErrorInterceptor } from './core/interceptor/error.interceptor';
//import { JwtInterceptor } from './core/interceptor/jwt.interceptor';
import { NgScrollbarModule } from 'ngx-scrollbar';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';

import { AppStoreModule } from './app-state.module';

import {
  HttpClientModule,
  HTTP_INTERCEPTORS,
  HttpClient,
} from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProfileComponent } from './profile/profile.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { TokenEffects } from './Store/Token/Token.Effects';

import { TokenInterceptor } from './core/interceptor/token.interceptor';
import { tokenReducer } from './Store/Token/Token.Reducer';
import { jobReducer } from './Store/Job/Job.Reducer';
import { JobEffects } from './Store/Job/Job.Effects';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PageLoaderComponent,
    SidebarComponent,
    RightSidebarComponent,
    AuthLayoutComponent,
    MainLayoutComponent,
    FooterComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgScrollbarModule,
    LoadingBarRouterModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
    // core & shared
    CoreModule,
    SharedModule,
    NgbModule,
    AppStoreModule,
    StoreModule.forRoot({
      token: tokenReducer,
      job: jobReducer,
    }),

    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    EffectsModule.forRoot([TokenEffects, JobEffects]),
    StoreRouterConnectingModule.forRoot(),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    // { provide: LocationStrategy, useClass: HashLocationStrategy },
    // { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    // //fakeBackendProvider,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
