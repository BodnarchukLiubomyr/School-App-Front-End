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
  GetGroupComponent,
  FileSendingComponent,
  WorkRatingComponent,
  FileMarksComponent,
  CreateChatComponent,
  ChatComponent,
  GetChatsComponent,
  GroupChatComponent,
  GetTeacherFileComponent,
  GetClassStudentsComponent,
  DeleteGroupComponent,
  DeleteExerciseComponent,
  GetMarkComponent
} from './index'
import { MaterialModule } from '../material.module';


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
    GetGroupComponent,
    FileSendingComponent,
    WorkRatingComponent,
    FileMarksComponent,
    CreateChatComponent,
    ChatComponent,
    GetChatsComponent,
    GroupChatComponent,
    GetTeacherFileComponent,
    GetClassStudentsComponent,
    DeleteGroupComponent,
    DeleteExerciseComponent,
    GetMarkComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    MainFuncRoutingModule
  ],
})
export class MainFuncModule { }
