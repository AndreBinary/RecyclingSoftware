import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const admin: Routes = [
  {
    path: '',
    children: [{
      path: 'site-management/dashboard',
        loadComponent: () =>
          import('../site-management/site-management.component').then((m) => m.SiteManagementComponent),
        title: 'Site Management Dashboard',
        }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(admin)],
  exports: [RouterModule],
})
export class siteManagementRoutingModule {
  static routes = admin;
}