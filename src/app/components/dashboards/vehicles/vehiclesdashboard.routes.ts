import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const admin: Routes = [
    {path:'',children:[ {
        path: 'vehicles',
        loadComponent: () =>
          import('../vehicles/vehicles.component').then((m) => m.VehiclesComponent),
          title: 'Jays Recycling - Vehicles Dashboard',
      },
    ]
      }
]
@NgModule({
    imports: [RouterModule.forChild(admin)],
    exports: [RouterModule],
  })
  export class vehiclesRoutingModule {
    static routes = admin;
  }