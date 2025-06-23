import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const admin: Routes = [
  {
    path: '',
    children: [
      {
        path: 'crm',
        loadComponent: () =>
          import('../crm/crm.component').then((m) => m.CRMComponent),
        title: 'CRM Dashboard',
      },
      {
        path: 'crm/companies',
        loadComponent: () =>
          import('./companies/companies.component').then((m) => m.CompaniesComponent),
        title: 'CRM Companies',
      },
      {
        path: 'crm/contacts',
        loadComponent: () =>
          import('./contacts/contacts.component').then((m) => m.ContactsComponent),
        title: 'CRM Contacts',
      },
      {
        path: 'crm/deals',
        loadComponent: () =>
          import('./deals/deals.component').then((m) => m.DealsComponent),
        title: 'CRM Deals',
      },
      {
        path: 'crm/leads',
        loadComponent: () =>
          import('./leads/leads.component').then((m) => m.LeadsComponent),
        title: 'CRM Leads',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(admin)],
  exports: [RouterModule],
})
export class crmRoutingModule {
  static routes = admin;
}