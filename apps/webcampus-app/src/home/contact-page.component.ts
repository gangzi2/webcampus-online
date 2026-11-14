import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideMail, lucideMapPin, lucideMessagesSquare } from '@ng-icons/lucide';
import { ContactFormComponent } from './contact-form/contact-form.component';

@Component({
  selector: 'app-contact-page',
  imports: [ContactFormComponent, NgIcon],
  providers: [provideIcons({ lucideMail, lucideMapPin, lucideMessagesSquare })],
  template: `
    <section class="relative overflow-hidden bg-background px-6 py-16 sm:py-24 lg:px-12">
      <div aria-hidden="true" class="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div class="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[2fr_3fr] lg:gap-16">
        <div>
          <p class="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Contact</p>
          <h1 class="mt-5 max-w-xl leading-tight text-foreground">Parlons de votre <span class="text-primary">projet.</span></h1>
          <p class="mt-6 max-w-lg text-lg leading-relaxed text-slate-300">
            Formation immersive, plateforme e-learning ou application sur mesure :
            racontez-nous vos besoins et échangeons sur votre projet.
          </p>

          <div class="mt-10 space-y-4">
            <div class="flex items-start gap-4 rounded-xl border border-border bg-slate-900/60 p-5">
              <span class="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <ng-icon name="lucideMail" size="22" />
              </span>
              <div>
                <h2 class="border-0 p-0 text-base font-semibold text-foreground">Écrivez-nous</h2>
                <a class="mt-1 inline-block break-all text-slate-300 hover:text-primary" href="mailto:contact@webcampus-online.fr">contact&#64;webcampus-online.fr</a>
              </div>
            </div>
            <div class="flex items-start gap-4 rounded-xl border border-border bg-slate-900/60 p-5">
              <span class="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <ng-icon name="lucideMapPin" size="22" />
              </span>
              <div>
                <h2 class="border-0 p-0 text-base font-semibold text-foreground">Adresse postale</h2>
                <p class="mt-1 text-slate-300">4 rue Paul Vallier<br />38400 Saint-Martin-d'Hères<br />France</p>
              </div>
            </div>
            <div class="flex items-start gap-4 rounded-xl border border-border bg-slate-900/60 p-5">
              <span class="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <ng-icon name="lucideMessagesSquare" size="22" />
              </span>
              <div>
                <h2 class="border-0 p-0 text-base font-semibold text-foreground">Une question ?</h2>
                <p class="mt-1 text-slate-300">Utilisez le formulaire pour nous présenter votre demande.</p>
              </div>
            </div>
          </div>
        </div>
        <app-contact-form></app-contact-form>
      </div>
    </section>
  `,
})
export class ContactPageComponent {}
