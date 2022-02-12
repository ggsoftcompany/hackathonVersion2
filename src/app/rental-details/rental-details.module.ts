import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RentalDetailsPageRoutingModule } from './rental-details-routing.module';

import { RentalDetailsPage } from './rental-details.page';
import {GoogleMapsModule} from '@angular/google-maps';
import {SharedModule} from '../shared.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RentalDetailsPageRoutingModule,
        GoogleMapsModule,
      SharedModule
    ],
  declarations: [RentalDetailsPage]
})
export class RentalDetailsPageModule {}
