import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const admin: Routes = [
  {
    path: '',
    children: [
      {
        path: 'drivers',
        loadComponent: () =>
          import('../Drivers/drivers.component').then((m) => m.DriversComponent),
        title: 'Drivers Dashboard',
      },
      {
        path: 'schedule-plan',
        loadComponent: () =>
          import('./schedule-plan/schedule-plan.component').then((m) => m.SchedulePlanComponent),
        title: 'Schedule Plan',
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(admin)],
  exports: [RouterModule],
})
export class driversRoutingModule {
  static routes = admin;
}