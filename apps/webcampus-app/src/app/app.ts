import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LandingHeader } from '@webcampus2/common';
import { VrSceneComponent } from '../core/threejs/mainComponent';
import { HomePage } from '../home/home-page';
@Component({
  imports: [RouterModule, VrSceneComponent, LandingHeader, HomePage],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'webcampus-app';
}
