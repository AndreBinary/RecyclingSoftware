import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const weighbridgePortalRoutes: Routes = [
  {
    path: 'weighbridge-portal',
    loadComponent: () => import('./weighbridge-portal.component').then(m => m.WeighbridgePortalComponent),
    title: 'Weighbridge Portal'
  }
];

@NgModule({
  imports: [RouterModule.forChild(weighbridgePortalRoutes)],
  exports: [RouterModule],
})
export class WeighbridgePortalRoutingModule {
  static routes = weighbridgePortalRoutes;
}
