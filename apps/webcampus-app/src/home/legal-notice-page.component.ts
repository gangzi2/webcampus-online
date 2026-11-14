import { Component } from '@angular/core';

@Component({
  selector: 'app-legal-notice-page',
  template: `
    <section
      class="relative overflow-hidden bg-background px-6 py-16 sm:py-24 lg:px-12"
    >
      <div
        aria-hidden="true"
        class="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]"
      ></div>
      <div class="relative mx-auto max-w-4xl">
        <h1 class="leading-tight text-foreground">Mentions légales</h1>
        <div class="mt-10 space-y-8 text-slate-300">
          <section class="rounded-2xl border border-border bg-slate-900/60 p-7">
            <h2 class="border-0 p-0 text-xl text-foreground">
              Éditeur du site
            </h2>
            <p class="mt-4 leading-relaxed">
              WEBCAMPUS<br />
              EURL (SARL unipersonnelle) au capital de 1 000 €<br />
              4 rue Paul Vallier<br />
              38400 Saint-Martin-d'Hères, France<br />
              <a
                class="text-primary hover:underline"
                href="mailto:contact@webcampus-online.fr"
                >contact&#64;webcampus-online.fr</a
              >
            </p>
            <p class="mt-4 leading-relaxed">
              SIREN : 105 345 565<br />
              SIRET : 105 345 565 00011<br />
              RCS : Grenoble<br />
              TVA intracommunautaire : FR37 105345565<br />
              Activité : programmation informatique<br />
              Code APE : 62.01Z
            </p>
          </section>
          <section class="rounded-2xl border border-border bg-slate-900/60 p-7">
            <h2 class="border-0 p-0 text-xl text-foreground">
              Directeur de publication
            </h2>
            <p class="mt-4 leading-relaxed">
              Chenggang WANG, gérant de WEBCAMPUS.
            </p>
          </section>
          <section class="rounded-2xl border border-border bg-slate-900/60 p-7">
            <h2 class="border-0 p-0 text-xl text-foreground">Hébergement</h2>
            <p class="mt-4 leading-relaxed">
              OVHcloud (OVH SAS)<br />
              2 rue Kellermann<br />
              59100 Roubaix, France<br />
              Téléphone :
              <a class="text-primary hover:underline" href="tel:1007">1007</a
              ><br />
              Site web :
              <a
                class="text-primary hover:underline"
                href="https://www.ovhcloud.com"
                >https://www.ovhcloud.com</a
              >
            </p>
          </section>
        </div>
      </div>
    </section>
  `,
})
export class LegalNoticePageComponent {}
