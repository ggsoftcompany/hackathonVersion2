import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DropOffPageRoutingModule } from './drop-off-routing.module';

import { DropOffPage } from './drop-off.page';
import {SharedModule} from '../shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DropOffPageRoutingModule,
    SharedModule
  ],
  declarations: [DropOffPage]
})
export class DropOffPageModule {}
