import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CategoriesComponent } from './categories/categories.component';
import { ExamComponent } from './exam/exam.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: LoginComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'detail/:id', component: ExamComponent },
];
