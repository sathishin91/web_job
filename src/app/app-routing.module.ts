import { AuthLayoutComponent } from './layout/app-layout/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layout/app-layout/main-layout/main-layout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/guard/auth.guard';

import { ProfileComponent } from './profile/profile.component';
import { PricingComponent } from './landing/pricing/pricing.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: '/landing', pathMatch: 'full' },
      {
        path: 'jobs',
        loadChildren: () => import('./job/job.module').then((m) => m.JobModule),
      },
      {
        path: 'manage-wallet',
        loadChildren: () =>
          import('./manage-coins/manage-coins.module').then(
            (m) => m.ManageCoinsModule
          ),
      },
      {
        path: 'reports',
        loadChildren: () =>
          import('./reports/reports.module').then((m) => m.ReportsModule),
      },

      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'pricing',
        component: PricingComponent,
      },
    ],
  },

  {
    path: 'authentication',
    component: AuthLayoutComponent,
    loadChildren: () =>
      import('./authentication/authentication.module').then(
        (m) => m.AuthenticationModule
      ),
  },
  {
    path: 'landing',
    component: AuthLayoutComponent,
    loadChildren: () =>
      import('./landing/landing.module').then((m) => m.LandingModule),
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
