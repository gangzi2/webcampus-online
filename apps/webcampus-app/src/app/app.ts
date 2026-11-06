import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LandingHeader } from '@webcampus2/common';
import { VrSceneComponent } from '../core/threejs/mainComponent';
@Component({
  imports: [RouterModule, VrSceneComponent, LandingHeader],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'webcampus-app';
}
