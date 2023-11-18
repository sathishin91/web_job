import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageCoinsComponent } from './manage-coins/manage-coins.component';

const routes: Routes = [{ path: '', component: ManageCoinsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageCoinsRoutingModule {}
