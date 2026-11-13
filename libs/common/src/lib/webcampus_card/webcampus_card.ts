import { Component, input } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { HlmCardDescription, HlmCardTitle } from '@spartan-ng/helm/card';
@Component({
  selector: 'lib-webcampus-card',
  imports: [NgIcon, HlmCardTitle, HlmCardDescription],
  templateUrl: './webcampus_card.html',
  styleUrl: './webcampus_card.scss',
})
export class WebcampusCard {
  title = input<string>('');
  description = input<string>('');
  iconName = input<string>('');
  imageUrl = input<string>(''); // Nouveau signal pour l'image
  linkText = input<string>('');
  badgeText = input<string>('');
  // Nouvel input pour définir la couleur de fond (par défaut 'bg-white')
  bgColor = input<string>('bg-white');
}
