import { Routes } from '@angular/router';
import { content } from './shared/routes/content.routes';
import { authen } from './shared/routes/auth.routes';
import { AuthenticationLayoutComponent } from './shared/layouts/authentication-layout/authentication-layout.component';
import { ContentLayoutComponent } from './shared/layouts/content-layout/content-layout.component';

export const routes: Routes = [
      
    { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
    { path: '', component: ContentLayoutComponent, children: content },
    { path: '', component: AuthenticationLayoutComponent, children: authen },
    { path: '**', redirectTo: '/error/error404', pathMatch: 'full' },
    
];
   