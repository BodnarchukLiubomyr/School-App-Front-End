import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { canActivateMainPartGuard } from '../shared/guards/can-activate-main-part.guard';
import {
  AddUserToClassComponent,
  AddUserToGroupComponent,
  ChatComponent,
  CreateChatComponent,
  CreateClassComponent,
  CreateExerciseComponent,
  CreateGroupComponent,
  CreateSubjectComponent,
  DeleteExerciseComponent,
  DeleteGroupComponent,
  FileMarksComponent,
  FileSendingComponent,
  FindClassComponent,
  GetChatsComponent,
  GetClassComponent,
  GetClassStudentsComponent,
  GetGroupComponent,
  GetMarkComponent,
  GetTeacherFileComponent,
  GroupChatComponent,
  MainPartComponent,
  SubjectViewComponent,
  WorkRatingComponent,
  WorkWithClassComponent
} from "./index"
import { DeleteUserComponent } from './components/delete-user/delete-user.component';
import { SubjectsComponent } from './components/main-part/subjects/subjects.component';


const routes: Routes = [
  { path: 'main-part', component: MainPartComponent },
  { path: 'delete-user/:lastname/:firstname', component: DeleteUserComponent},
  { path: 'create-exercise', component: CreateExerciseComponent},
  { path: 'create-subject',component: CreateSubjectComponent},
  { path: 'get-subjects', component: SubjectsComponent},
  { path: 'subject-view/:subjectId', component: SubjectViewComponent},
  { path: 'create-class', component: CreateClassComponent},
  { path: 'add-user-to-class', component: AddUserToClassComponent},
  { path: 'work-with-class', component: WorkWithClassComponent},
  { path: 'create-group', component: CreateGroupComponent},
  { path: 'add-user-to-group', component: AddUserToGroupComponent},
  { path: 'work-rating/:exerciseId',component: WorkRatingComponent},
  { path: 'file-sending/:userId/:exerciseId', component: FileSendingComponent},
  { path: 'file-marks/:fileName',component: FileMarksComponent},
  { path: 'create-chat/:userId', component: CreateChatComponent},
  { path: 'chat/:chatId', component: ChatComponent},
  { path: 'get-chats/:userId', component: GetChatsComponent},
  { path: 'get-group/:subjectId/:userId', component: GetGroupComponent},
  { path: 'group-chat/:groupId', component: GroupChatComponent},
  { path: 'teacher-file/:exerciseId',component: GetTeacherFileComponent},
  { path: 'get-users-class/:className', component: GetClassStudentsComponent},
  { path: 'delete-group/:groupName',component:DeleteGroupComponent},
  { path: 'delete-exercise/:exerciseName',component:DeleteExerciseComponent},
  { path: 'get-mark/:userId/:exerciseId',component: GetMarkComponent},
  { path: 'find-class',component: FindClassComponent},
  { path: 'get-class/:className',component: GetClassComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainFuncRoutingModule { }
