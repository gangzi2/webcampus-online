import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideLinkedin, lucideMail, lucideYoutube } from '@ng-icons/lucide';

@Component({
  selector: 'app-site-footer',
  imports: [RouterLink, NgIcon],
  providers: [provideIcons({ lucideLinkedin, lucideMail, lucideYoutube })],
  template: `
    <footer class="border-t border-slate-900 bg-slate-950 px-6 py-8 text-slate-400 lg:px-12">
      <div class="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 lg:flex-row">
        <div class="flex items-center gap-3">
          <div class="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-lg font-bold text-white">W</div>
          <div>
            <span class="text-lg font-bold tracking-tight text-white">WebCampus</span>
            <div class="text-[10px] tracking-wider text-slate-400">VR » Moodle | Formations immersives</div>
          </div>
        </div>
        <nav aria-label="Navigation de pied de page" class="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-medium text-slate-300">
          <a href="/#accueil" class="transition-colors hover:text-primary">Accueil</a>
          <a href="/#expertises" class="transition-colors hover:text-primary">Formations VR</a>
          <a href="/#fonctionnalites" class="transition-colors hover:text-primary">Fonctionnalités</a>
          <a href="/#moodle" class="transition-colors hover:text-primary">Moodle</a>
          <a href="/#tarifs" class="transition-colors hover:text-primary">Tarifs</a>
          <a routerLink="/a-propos" class="transition-colors hover:text-primary">À propos</a>
          <a routerLink="/contact" class="transition-colors hover:text-primary">Contact</a>
        </nav>
        <div class="flex items-center gap-6 text-xs text-slate-500">
          <div class="flex items-center gap-4 text-slate-400">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" class="transition-colors hover:text-primary">
              <ng-icon name="lucideLinkedin" class="text-base" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube" class="transition-colors hover:text-primary">
              <ng-icon name="lucideYoutube" class="text-base" />
            </a>
            <a href="mailto:contact@webcampus-online.fr" aria-label="Email" class="transition-colors hover:text-primary">
              <ng-icon name="lucideMail" class="text-base" />
            </a>
          </div>
          <span class="border-l border-slate-800 pl-4 text-[11px]">© 2026 WebCampus. Tous droits réservés.</span>
        </div>
      </div>
    </footer>
  `,
})
export class SiteFooterComponent {}
