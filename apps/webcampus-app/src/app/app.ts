import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LandingHeader } from '@webcampus2/common';
import { SiteFooterComponent } from './site-footer.component';
@Component({
  imports: [RouterModule, LandingHeader, SiteFooterComponent],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'webcampus-app';
}
