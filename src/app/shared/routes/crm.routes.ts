import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { salesRoutingModule } from '../../components/dashboards/sales/salesdashboard.routes';
import { crmRoutingModule } from '../../components/dashboards/crm/crmdashboard.routes';

export const content1: Routes = [
  { path: '', children: [...crmRoutingModule.routes] },
];
@NgModule({
  imports: [
    RouterModule.forRoot(content1)
  ],
  exports: [RouterModule],
})
export class CRMRoutingModule {
  
}
