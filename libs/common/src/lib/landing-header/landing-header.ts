import { AfterViewInit, Component, signal } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideArrowRight,
  lucideChevronDown,
  lucideGraduationCap,
  lucideMenu,
  lucideX,
} from '@ng-icons/lucide';
@Component({
  selector: 'lib-landing-header',
  imports: [NgIcon],
  providers: [
    provideIcons({
      lucideGraduationCap,
      lucideChevronDown,
      lucideMenu,
      lucideX,
      lucideArrowRight,
    }),
  ],
  templateUrl: './landing-header.html',
  styleUrl: './landing-header.scss',
})
export class LandingHeader implements AfterViewInit {
  menuOpen = signal<boolean>(false);
  activeMenu = signal<string>('accueil');

  ngAfterViewInit() {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.slice(1) || 'accueil';
      this.activeMenu.set(hash);

      window.addEventListener('hashchange', () => {
        const hash = window.location.hash.slice(1) || 'accueil';
        this.activeMenu.set(hash);
      });
    }
  }

  isActive(section: string): boolean {
    return this.activeMenu() === section;
  }
}
