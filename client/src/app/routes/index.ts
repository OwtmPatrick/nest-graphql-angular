import { Routes } from '@angular/router';
import { HomeComponent } from '../../pages/home/ui/home/home.component';
import { PropertyComponent } from '../../pages/property/property.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'property', component: PropertyComponent },
];
