import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const admin: Routes = [
    {path:'',children:[ {
        path: 'CRM',
        loadComponent: () =>
          import('../crm/crm.component').then((m) => m.CRMComponent),
          title: 'CRM Dashboard',
          children:[
            {
            path: 'Companies',
            loadComponent: () =>
              import('../crm/companies/companies.component').then((m) => m.CompaniesComponent),
              title: 'CRM Companies'

          },
          {
            path: 'Contacts',
            loadComponent: () =>
              import('../crm/contacts/contacts.component').then((m) => m.ContactsComponent),
              title: 'CRM Contacts'
          },
          {
            path: 'Deals',
            loadComponent: () =>
              import('../crm/deals/deals.component').then((m) => m.DealsComponent),
              title: 'CRM Deals'
          },
          {
            path: 'Leads',
            loadComponent: () =>
              import('../crm/leads/leads.component').then((m) => m.LeadsComponent),
              title: 'CRM Leads'
          }]
      },
    ]
      }
]
@NgModule({
    imports: [RouterModule.forChild(admin)],
    exports: [RouterModule],
  })
  export class crmRoutingModule {
    static routes = admin;
  }