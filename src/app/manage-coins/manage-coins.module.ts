import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageCoinsRoutingModule } from './manage-coins-routing.module';
import { ManageCoinsComponent } from './manage-coins/manage-coins.component';


@NgModule({
  declarations: [
    ManageCoinsComponent
  ],
  imports: [
    CommonModule,
    ManageCoinsRoutingModule
  ]
})
export class ManageCoinsModule { }
