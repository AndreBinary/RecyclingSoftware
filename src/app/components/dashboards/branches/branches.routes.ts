import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const admin: Routes = [
  {
    path: '',
    children: [
      {
        path: 'branches',
        loadComponent: () =>
          import('../branches/branches.component').then((m) => m.BranchesComponent),
        title: 'Branches Dashboard',
      },
      {
        path: 'branches/overview',
        loadComponent: () =>
          import('./overview/overview.component').then((m) => m.OverviewComponent),
        title: 'Branches Overview',
      },

      {
        path: 'branches/branch/:id',
        loadComponent: () =>
          import('./branch-details/branch-details.component').then((m) => m.BranchDetailsComponent),
        title: 'Branches Details',
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(admin)],
  exports: [RouterModule],
})
export class branchesRoutingModule {
  static routes = admin;
}