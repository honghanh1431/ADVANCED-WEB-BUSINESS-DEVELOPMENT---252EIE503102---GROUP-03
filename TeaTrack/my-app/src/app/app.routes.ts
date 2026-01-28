import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'blog', pathMatch: 'full' },
  { path: 'blog', loadComponent: () => import('./Pages/blog/blog-list/blog-list').then(m => m.BlogList) },
  { path: 'blog/:id', loadComponent: () => import('./Pages/blog/blog-detail/blog-detail').then(m => m.BlogDetail) },
];
