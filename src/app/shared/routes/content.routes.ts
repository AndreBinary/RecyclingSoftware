import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { dashboardRoutingModule } from '../../components/dashboards/dashboard.routes';
import { salesRoutingModule } from '../../components/dashboards/sales/salesdashboard.routes';
import { crmRoutingModule } from '../../components/dashboards/crm/crmdashboard.routes';
import { inventoryRoutingModule } from '../../components/dashboards/inventory/inventorydashboard.routes';
import { fleetManagementRoutingModule } from '../../components/dashboards/fleet-management/fleet-managementdashboard.routes';



 export const content: Routes = [
   { path: '', children: [
   ...dashboardRoutingModule.routes,
   ...salesRoutingModule.routes,
   ...crmRoutingModule.routes,
   ...inventoryRoutingModule.routes,
   ...fleetManagementRoutingModule.routes
  
  

  ]}
];

@NgModule({
    imports: [RouterModule.forRoot(content, {
      scrollPositionRestoration: 'top'
    })],
    exports: [RouterModule]
})
export class SharedRoutingModule { }
