import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideCode2,
  lucideGlasses,
  lucideGraduationCap,
} from '@ng-icons/lucide';
import { VrSceneComponent } from '../../core/threejs/mainComponent';
@Component({
  selector: 'app-landing-section',
  imports: [VrSceneComponent, NgIcon],
  providers: [
    provideIcons({ lucideGraduationCap, lucideGlasses, lucideCode2 }),
  ],
  templateUrl: './landing-section.html',
  styleUrl: './landing-section.scss',
})
export class LandingSection {}
