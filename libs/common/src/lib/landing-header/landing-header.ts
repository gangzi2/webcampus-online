import { Component, signal } from '@angular/core';
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
export class LandingHeader {
  menuOpen = signal<boolean>(false);
}
