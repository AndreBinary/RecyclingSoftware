import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const agentPortalRoutes: Routes = [
  {
    path: 'agent-portal',
    loadComponent: () => import('./agent-portal.component').then(m => m.AgentPortalComponent),
    title: 'Agent Portal'
  }
];

@NgModule({
  imports: [RouterModule.forChild(agentPortalRoutes)],
  exports: [RouterModule],
})
export class AgentPortalRoutingModule {
  static routes = agentPortalRoutes;
}
