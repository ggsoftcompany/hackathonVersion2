import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatStepperModule} from '@angular/material/stepper';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { MatExpansionModule} from '@angular/material/expansion';
import { MatCardModule} from '@angular/material/card';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDividerModule} from '@angular/material/divider';

const MODULES = [
  CommonModule,
  MatStepperModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatIconModule,
  MatCardModule,
  MatProgressBarModule,
  MatDividerModule

  
];

@NgModule({
  imports: MODULES,
  exports:MODULES
})
export class SharedModule {}
