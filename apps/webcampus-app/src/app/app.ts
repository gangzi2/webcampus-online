import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { VrSceneComponent } from '../core/threejs/mainComponent';
@Component({
  imports: [RouterModule, VrSceneComponent],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'webcampus-app';
}
