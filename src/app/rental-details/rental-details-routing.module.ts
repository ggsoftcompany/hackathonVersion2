import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RentalDetailsPage } from './rental-details.page';

const routes: Routes = [
  {
    path: '',
    component: RentalDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RentalDetailsPageRoutingModule {}
