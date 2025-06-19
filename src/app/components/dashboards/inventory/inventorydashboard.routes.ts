import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const admin: Routes = [
    {path:'',children:[ {
        path: 'inventory',
        loadComponent: () =>
          import('../inventory/inventory.component').then((m) => m.InventoryComponent),
          title: 'Jays Recycling - Inventory'
      },
    ]
      }
]
@NgModule({
    imports: [RouterModule.forChild(admin)],
    exports: [RouterModule],
  })
  export class inventoryRoutingModule {
    static routes = admin;
  }