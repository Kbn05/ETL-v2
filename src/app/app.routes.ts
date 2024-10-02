import { Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { AdminComponent } from './views/admin/admin.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: AdminComponent },
];
