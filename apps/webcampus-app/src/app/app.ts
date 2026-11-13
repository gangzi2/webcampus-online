import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LandingHeader } from '@webcampus2/common';
import { HomePage } from '../home/home-page';
@Component({
  imports: [RouterModule, LandingHeader, HomePage],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'webcampus-app';
}
