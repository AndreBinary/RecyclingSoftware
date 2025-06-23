import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const admin: Routes = [
  {
    path: '',
    children: [
      {
        path: 'fleet-management',
        loadComponent: () =>
          import('../fleet-management/fleet-management.component').then((m) => m.FleetManagementComponent),
        title: 'Fleet Management Dashboard',
      },
      {
        path: 'fleet-management/overview',
        loadComponent: () =>
          import('./overview/overview.component').then((m) => m.OverviewComponent),
        title: 'Fleet Management Overview',
      },
       {
        path: 'fleet-management/vehicles',
        loadComponent: () =>
          import('./vehicles/vehicles.component').then((m) => m.VehiclesComponent),
        title: 'Fleet Management Overview',
      },
      {
        path: 'fleet-management/vehicles/:id',
        loadComponent: () =>
          import('./vehicle-details/vehicle-details.component').then((m) => m.VehicleDetailsComponent),
        title: 'Fleet Management Overview',
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(admin)],
  exports: [RouterModule],
})
export class fleetManagementRoutingModule {
  static routes = admin;
}