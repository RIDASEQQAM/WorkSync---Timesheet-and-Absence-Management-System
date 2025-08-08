// app.routes.ts
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { TimesheetComponent } from './timesheet/timesheet.component';
import { AuthGuard } from './auth.guard';
import { AdminComponent } from './features/admin/admin.component';
import { ApprobateurComponent } from './features/approbateur/approbateur.component';
import { FeuilleDeTempsComponent } from './features/employe/feuille-de-temps/feuille-de-temps.component';

export const routes: Routes = [
        // Définir les routes ici
        { path: '', component: HomeComponent },
        { path: '', redirectTo: '/home', pathMatch: 'full' },
        { path: 'home', component: HomeComponent },
        { path: 'admin', component: AdminComponent /* , canActivate: [AdminGuard] */ },
        { path: 'approbateur', component: ApprobateurComponent /* , canActivate: [ApprobateurGuard] */ },
        { path: 'feuille-de-temps', component: FeuilleDeTempsComponent /* , canActivate: [EmployeGuard] */ },
        { path: 'login', component: LoginComponent },
        { path: '', redirectTo: '/login', pathMatch: 'full' },
        { path: 'timesheet', component: TimesheetComponent },
];
