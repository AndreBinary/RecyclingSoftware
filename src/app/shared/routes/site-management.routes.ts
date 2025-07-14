import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ordersRoutingModule } from '../../components/dashboards/orders/ordersdashboard.routes';
import { siteManagementRoutingModule } from '../../components/dashboards/site-management/site-managementdashboard.routes';

export const content1: Routes = [
  { path: '', children: [...siteManagementRoutingModule.routes] },
];
@NgModule({
  imports: [
    RouterModule.forRoot(content1)
  ],
  exports: [RouterModule],
})
export class SiteManagementRoutingModule {
  
}
