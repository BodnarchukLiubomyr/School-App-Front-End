import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { canActivateMainPartGuard } from '../shared/guards/can-activate-main-part.guard';
import {
  MainPartComponent
} from "./index"


const routes: Routes = [
  { path: 'main-part', component: MainPartComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainFuncRoutingModule { }
