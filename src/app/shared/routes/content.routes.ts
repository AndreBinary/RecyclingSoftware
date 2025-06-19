import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { dashboardRoutingModule } from '../../components/dashboards/dashboard.routes';
import { salesRoutingModule } from '../../components/dashboards/sales/salesdashboard.routes';
import { crmRoutingModule } from '../../components/dashboards/crm/crmdashboard.routes';



 export const content: Routes = [
   { path: '', children: [
   ...dashboardRoutingModule.routes,
   ...salesRoutingModule.routes,
   ...crmRoutingModule.routes

  ]}
];

@NgModule({
    imports: [RouterModule.forRoot(content, {
      scrollPositionRestoration: 'top'
    })],
    exports: [RouterModule]
})
export class SharedRoutingModule { }
