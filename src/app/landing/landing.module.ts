import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingRoutingModule } from './landing-routing.module';
import { LandingComponent } from './landing/landing.component';
import { LandingHeaderComponent } from './landing-header/landing-header.component';
import { LandingFooterComponent } from './landing-footer/landing-footer.component';

@NgModule({
  declarations: [
    LandingComponent,
    LandingHeaderComponent,
    LandingFooterComponent,
  ],
  imports: [CommonModule, LandingRoutingModule],
})
export class LandingModule {}
