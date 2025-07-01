import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const admin: Routes = [
    {path:'',children:[ {
        path: 'orders',
        loadComponent: () =>
          import('../orders/orders.component').then((m) => m.OrdersComponent),
          title: 'Jays Recycling - Orders'
      },
    ]
      }
]
@NgModule({
    imports: [RouterModule.forChild(admin)],
    exports: [RouterModule],
  })
  export class ordersRoutingModule {
    static routes = admin;
  }