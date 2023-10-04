import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { canActivateMainPartGuard } from '../shared/guards/can-activate-main-part.guard';
import {
  MainPartComponent
} from "./index"
import { DeleteUserComponent } from './components/delete-user/delete-user.component';


const routes: Routes = [
  { path: 'main-part', component: MainPartComponent },
  { path: 'delete-user', component: DeleteUserComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainFuncRoutingModule { }
