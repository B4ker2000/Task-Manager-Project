import { Routes } from '@angular/router';
import { LoginComponent } from './Components/login.component';
import { DashboardComponent } from './Components/dashboard.component';
import { TaskBoardComponent } from './Components/task-board.component';
import { AuthGuard } from './guards/auth.guard';
import { AnonGuard } from './guards/anon.guard';
import { UserProfileComponent } from './Components/user-profile.component';
import { RegisterComponent } from './Components/register.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' }, // Auto-redirect to login screen on startup
    { path: 'login', component: LoginComponent, canActivate: [AnonGuard] },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] }, // ```canActivate: [authGuard]``` forces our dashboard to only load if "authGuard" returns true!
    { path: 'projects/:id/board', component: TaskBoardComponent, canActivate: [AuthGuard] }, // ":id" will be changed to the actual id number in the url! We also add the same "authGuard" method to also lock down our Task Board route!
    { path: 'profile', component: UserProfileComponent, canActivate: [AuthGuard] },
    { path: 'register', component: RegisterComponent, canActivate: [AnonGuard] }
];