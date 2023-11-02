import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainFuncRoutingModule } from './main-func-routing.module';
import {
   CreateExerciseComponent,
   MainPartComponent,
   NavbarComponent
} from './index'


@NgModule({
  declarations: [
    MainPartComponent,
    NavbarComponent,
    CreateExerciseComponent
  ],
  imports: [
    CommonModule,
    MainFuncRoutingModule
  ]
})
export class MainFuncModule { }
