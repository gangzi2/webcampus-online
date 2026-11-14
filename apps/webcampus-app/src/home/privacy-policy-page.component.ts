import { Component } from '@angular/core';

@Component({
  selector: 'app-privacy-policy-page',
  template: `
    <section class="relative overflow-hidden bg-background px-6 py-16 sm:py-24 lg:px-12">
      <div aria-hidden="true" class="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div class="relative mx-auto max-w-4xl">
        <h1 class="leading-tight text-foreground">Politique de confidentialité</h1>
        <div class="mt-10 space-y-8 text-slate-300">
          <section class="rounded-2xl border border-border bg-slate-900/60 p-7">
            <h2 class="border-0 p-0 text-xl text-foreground">Formulaire de contact</h2>
            <p class="mt-4 leading-relaxed">
              Lorsque vous nous contactez, le formulaire recueille votre nom, votre adresse e-mail,
              votre numéro de téléphone si vous le renseignez, le sujet et votre message.
              Ces informations sont utilisées pour traiter votre demande et vous répondre.
            </p>
          </section>
          <section class="rounded-2xl border border-border bg-slate-900/60 p-7">
            <h2 class="border-0 p-0 text-xl text-foreground">Vos droits</h2>
            <p class="mt-4 leading-relaxed">
              Vous pouvez demander l'accès à vos données, leur rectification ou leur effacement,
              et exercer vos autres droits applicables en écrivant à
              <a class="text-primary hover:underline" href="mailto:contact@webcampus-online.fr">contact&#64;webcampus-online.fr</a>.
              Vous pouvez également introduire une réclamation auprès de la
              <a class="text-primary hover:underline" href="https://www.cnil.fr/">CNIL</a>.
            </p>
          </section>
          <section class="rounded-2xl border border-border bg-slate-900/60 p-7">
            <h2 class="border-0 p-0 text-xl text-foreground">Informations complémentaires</h2>
            <p class="mt-4 leading-relaxed">
              Les informations relatives au responsable du traitement, à la base légale,
              aux destinataires, à la durée de conservation et aux éventuels transferts
              de données restent à compléter.
            </p>
          </section>
        </div>
      </div>
    </section>
  `,
})
export class PrivacyPolicyPageComponent {}
