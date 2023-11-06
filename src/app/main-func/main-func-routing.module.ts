import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { canActivateMainPartGuard } from '../shared/guards/can-activate-main-part.guard';
import {
  AddUserToClassComponent,
  AddUserToGroupComponent,
  CreateClassComponent,
  CreateExerciseComponent,
  CreateGroupComponent,
  CreateSubjectComponent,
  MainPartComponent,
  SubjectViewComponent,
  WorkWithClassComponent
} from "./index"
import { DeleteUserComponent } from './components/delete-user/delete-user.component';
import { SubjectsComponent } from './components/main-part/subjects/subjects.component';


const routes: Routes = [
  { path: 'main-part', component: MainPartComponent },
  { path: 'delete-user', component: DeleteUserComponent},
  { path: 'create-exercise', component: CreateExerciseComponent},
  { path: 'create-subject',component: CreateSubjectComponent},
  { path: 'get-subjects', component: SubjectsComponent},
  { path: 'subject-view/:subjectId', component: SubjectViewComponent},
  { path: 'create-class', component: CreateClassComponent},
  { path: 'add-user-to-class', component: AddUserToClassComponent},
  { path: 'work-with-class', component: WorkWithClassComponent},
  { path: 'create-group', component: CreateGroupComponent},
  { path: 'add-user-to-group', component: AddUserToGroupComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainFuncRoutingModule { }
