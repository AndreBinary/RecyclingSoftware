import { RouterModule, Routes } from '@angular/router';
import { errorRoutingModule } from '../../components/error/error.routes';
import { NgModule } from '@angular/core';
export const authen: Routes = [
    { path: '', children: [ 
        ...errorRoutingModule.routes
 ] },
 {
    path: 'auth/login',
    loadComponent: () =>
      import('../../authentication/login/login.component').then((m) => m.LoginComponent),
  },
   {
    path: 'auth/register-customer',
    loadComponent: () =>
      import('../../authentication/register-customer/register-customer.component').then((m) => m.RegisterCustomerComponent),
  }
]


@NgModule({
    imports: [RouterModule.forRoot(authen, {
        anchorScrolling: 'enabled',
        scrollPositionRestoration: 'top',
      })],
    exports: [RouterModule]
})
export class AuthenticationsRoutingModule { }