import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const skipBinAdmin: Routes = [
  {
    path: '',
    children: [
      {
        path: 'skip-bin-management',
        loadComponent: () => import('./skip-bin-management.component').then(m => m.SkipBinManagementComponent),
        title: 'Skip/Bin Management'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(skipBinAdmin)],
  exports: [RouterModule],
})
export class skipBinManagementRoutingModule {
  static routes = skipBinAdmin;
}
