import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/components/login/login.component';
import { RegisterComponent } from './features/auth/components/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { authGuard } from './shared/guards/auth.guard';
import { commonGuard } from './shared/guards/common.guard';

export const routes: Routes = [
    {path: '', component: HomeComponent, canActivate: [authGuard]},
    {path: 'login', component: LoginComponent, canActivate: [commonGuard]},
    {path: 'register', component: RegisterComponent, canActivate: [commonGuard]}
];
