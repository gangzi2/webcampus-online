import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideSearch } from '@ng-icons/lucide';
import { HlmBreadcrumbImports } from '@spartan-ng/helm/breadcrumb';
import { HlmInputGroupImports } from '@spartan-ng/helm/input-group';
import { HlmSeparatorImports } from '@spartan-ng/helm/separator';
import { HlmSidebarImports } from '@spartan-ng/helm/sidebar';

@Component({
  selector: 'lib-header',
  imports: [
    RouterModule,
    NgIcon,
    HlmSidebarImports,
    HlmSeparatorImports,
    HlmBreadcrumbImports,
    HlmInputGroupImports,
  ],
  providers: [
    provideIcons({
      lucideSearch,
    }),
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {}
