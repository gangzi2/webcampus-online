import { Component } from '@angular/core';
import { LandingSection } from './landing-section/landing-section';

@Component({
  selector: 'app-home-page',
  imports: [LandingSection],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {}
