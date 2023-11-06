import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MainFuncRoutingModule } from './main-func-routing.module';
import {
  AddUserToClassComponent,
  CreateClassComponent,
  CreateExerciseComponent,
  MainPartComponent,
  NavbarComponent,
  SubjectViewComponent,
  SubjectsComponent,
  WorkWithClassComponent,
  CreateSubjectComponent,
  CreateGroupComponent,
  AddUserToGroupComponent,
  FileSendingComponent
} from './index'


@NgModule({
  declarations: [
    MainPartComponent,
    NavbarComponent,
    CreateExerciseComponent,
    SubjectsComponent,
    SubjectViewComponent,
    CreateClassComponent,
    AddUserToClassComponent,
    WorkWithClassComponent,
    CreateSubjectComponent,
    CreateGroupComponent,
    AddUserToGroupComponent,
    FileSendingComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MainFuncRoutingModule
  ]
})
export class MainFuncModule { }
