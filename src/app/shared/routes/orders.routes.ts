import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ordersRoutingModule } from '../../components/dashboards/orders/ordersdashboard.routes';

export const content1: Routes = [
  { path: '', children: [...ordersRoutingModule.routes] },
];
@NgModule({
  imports: [
    RouterModule.forRoot(content1)
  ],
  exports: [RouterModule],
})
export class OrdersRoutingModule {
  
}
