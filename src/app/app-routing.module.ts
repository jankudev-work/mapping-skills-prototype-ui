import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {PeopleMgmtComponent} from './people-mgmt/people-mgmt.component';

const routes: Routes = [
  { path: 'people-mgmt', component: PeopleMgmtComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
