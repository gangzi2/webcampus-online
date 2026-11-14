import { Route } from '@angular/router';
import { HomePage } from '../home/home-page';

export const appRoutes: Route[] = [
  { path: '', component: HomePage, pathMatch: 'full', title: 'WebCampus' },
  {
    path: 'contact',
    loadComponent: () => import('../home/contact-page.component').then((m) => m.ContactPageComponent),
    title: 'Contact | WebCampus',
  },
  {
    path: 'a-propos',
    loadComponent: () => import('../home/about-page.component').then((m) => m.AboutPageComponent),
    title: 'À propos | WebCampus',
  },
];
