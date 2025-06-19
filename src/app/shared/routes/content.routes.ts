import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { dashboardRoutingModule } from '../../components/dashboards/dashboard.routes';
import { salesRoutingModule } from '../../components/dashboards/sales/salesdashboard.routes';



 export const content: Routes = [
   { path: '', children: [
   ...dashboardRoutingModule.routes,
   ...salesRoutingModule.routes,

  ]}
];

@NgModule({
    imports: [RouterModule.forRoot(content, {
      scrollPositionRestoration: 'top'
    })],
    exports: [RouterModule]
})
export class SaredRoutingModule { }
