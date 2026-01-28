import { Routes } from '@angular/router';
import { ButtonsPageComponent } from './buttons-page/buttons-page.component';
import { CategoryPageComponent } from './category-page/category-page.component';

export const routes: Routes = [
  { path: '', component: ButtonsPageComponent },        // root / → buttons page
  { path: 'category', component: CategoryPageComponent }, // /category → category page
  { path: '**', redirectTo: '' }                        // fallback
];
