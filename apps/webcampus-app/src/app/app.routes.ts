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
  {
    path: 'mentions-legales',
    loadComponent: () => import('../home/legal-notice-page.component').then((m) => m.LegalNoticePageComponent),
    title: 'Mentions légales | WebCampus',
  },
  {
    path: 'politique-de-confidentialite',
    loadComponent: () => import('../home/privacy-policy-page.component').then((m) => m.PrivacyPolicyPageComponent),
    title: 'Politique de confidentialité | WebCampus',
  },
];
