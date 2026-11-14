import { Component } from '@angular/core';

@Component({
  selector: 'app-legal-notice-page',
  template: `
    <section class="relative overflow-hidden bg-background px-6 py-16 sm:py-24 lg:px-12">
      <div aria-hidden="true" class="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div class="relative mx-auto max-w-4xl">
        <h1 class="leading-tight text-foreground">Mentions légales</h1>
        <div class="mt-10 space-y-8 text-slate-300">
          <section class="rounded-2xl border border-border bg-slate-900/60 p-7">
            <h2 class="border-0 p-0 text-xl text-foreground">Éditeur du site</h2>
            <p class="mt-4 leading-relaxed">
              WebCampus<br />
              Société à responsabilité limitée (SARL)<br />
              4 rue Paul Vallier<br />
              38400 Saint-Martin-d'Hères, France<br />
              <a class="text-primary hover:underline" href="mailto:contact@webcampus-online.fr">contact&#64;webcampus-online.fr</a>
            </p>
            <p class="mt-4 leading-relaxed">Les informations d'identification de la société et du directeur de publication sont à compléter.</p>
          </section>
          <section class="rounded-2xl border border-border bg-slate-900/60 p-7">
            <h2 class="border-0 p-0 text-xl text-foreground">Hébergement</h2>
            <p class="mt-4 leading-relaxed">Les coordonnées de l'hébergeur sont à compléter.</p>
          </section>
        </div>
      </div>
    </section>
  `,
})
export class LegalNoticePageComponent {}
