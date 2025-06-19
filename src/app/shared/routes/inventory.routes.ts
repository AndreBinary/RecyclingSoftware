import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { inventoryRoutingModule } from '../../components/dashboards/inventory/inventorydashboard.routes';

export const content1: Routes = [
  { path: '', children: [...inventoryRoutingModule.routes] },
];
@NgModule({
  imports: [
    RouterModule.forRoot(content1)
  ],
  exports: [RouterModule],
})
export class InventoryRoutingModule {
  
}
