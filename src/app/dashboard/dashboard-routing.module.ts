import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../services/auth.guard';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  // { path: '', redirectTo: '/branches', pathMatch: 'full' },
  // { path: '', redirectTo: '/opening-register', pathMatch: 'full' },
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'workorders',
        loadChildren: () =>
          import('./modules/saleconsultant/workorders/workorders.module').then(
            (m) => m.WorkOrdersModule
          ),
      },
 
      
     
      {
        path: 'profile',
        loadChildren: () =>
          import('./modules/profile/profile.module').then(
            (m) => m.ProfileModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
