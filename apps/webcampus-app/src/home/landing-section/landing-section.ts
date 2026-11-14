import { Component, inject, signal } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideBoxes,
  lucideCode2,
  lucideGlasses,
  lucideGraduationCap,
  lucideShieldCheck,
  lucideWrench,
} from '@ng-icons/lucide';

import { WebcampusCard } from '@webcampus2/common';
import { DialogService } from '../../core/dialog/dialog-service';
import { VrSceneComponent } from '../../core/threejs/mainComponent';
@Component({
  selector: 'app-landing-section',
  imports: [VrSceneComponent, NgIcon, WebcampusCard],
  providers: [
    provideIcons({
      lucideGraduationCap,
      lucideGlasses,
      lucideCode2,
      lucideWrench,
      lucideBoxes,
      lucideShieldCheck,
    }),
  ],
  templateUrl: './landing-section.html',
  styleUrl: './landing-section.scss',
})
export class LandingSection {
  protected readonly error = signal<string | null>(null);
  dialogService = inject(DialogService);

  protected async openContactForm(): Promise<void> {
    this.error.set(null);
    await this.dialogService.openLazy(
      () =>
        import('../contact-form/contact-form.component').then(
          (m) => m.ContactFormComponent,
        ),
    );
  }
}
