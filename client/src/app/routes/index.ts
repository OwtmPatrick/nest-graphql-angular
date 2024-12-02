import { Routes } from '@angular/router';
import { HomeComponent } from '../../pages/home/ui/home/home.component';
import { PropertyComponent } from '../../pages/property/ui/property.component';
import { LoginComponent } from 'src/pages/login/ui/login.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'property', component: PropertyComponent },
  { path: 'login', component: LoginComponent },
];
