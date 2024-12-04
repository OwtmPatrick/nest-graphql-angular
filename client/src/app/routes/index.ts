import { Routes } from '@angular/router';
import { HomeComponent } from '../../pages/home/ui/home/home.component';
import { PropertyComponent } from '../../pages/property/ui/property.component';
import { RegisternComponent } from 'src/pages/register/ui/register.component';
import { LoginComponent } from 'src/pages/login/ui/login.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'property', component: PropertyComponent },
  { path: 'register', component: RegisternComponent },
  { path: 'login', component: LoginComponent },
];
