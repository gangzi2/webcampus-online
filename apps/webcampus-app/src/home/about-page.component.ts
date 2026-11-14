import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCode2, lucideGlasses, lucideGraduationCap } from '@ng-icons/lucide';

@Component({
  selector: 'app-about-page',
  imports: [RouterLink, NgIcon],
  providers: [provideIcons({ lucideCode2, lucideGlasses, lucideGraduationCap })],
  template: `
    <section class="relative overflow-hidden bg-background px-6 py-16 sm:py-24 lg:px-12">
      <div aria-hidden="true" class="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div class="relative mx-auto max-w-6xl">
        <div class="max-w-3xl">
          <p class="text-sm font-semibold uppercase tracking-[0.18em] text-primary">À propos de WebCampus</p>
          <h1 class="mt-5 leading-tight text-foreground">La technologie au service de <span class="text-primary">l'apprentissage.</span></h1>
          <p class="mt-7 text-lg leading-relaxed text-slate-300">
            Agence digitale basée à Saint-Martin-d'Hères, WebCampus accompagne les entreprises et les organismes
            de formation dans la création d'expériences d'apprentissage numériques.
          </p>
        </div>

        <div class="mt-12 rounded-2xl border border-border bg-slate-900/60 p-7">
          <h2 class="border-0 p-0 text-xl text-foreground">Notre entreprise</h2>
          <dl class="mt-5 grid gap-5 text-slate-300 sm:grid-cols-2">
            <div>
              <dt class="text-sm font-semibold text-foreground">Forme juridique</dt>
              <dd class="mt-1">Société à responsabilité limitée (SARL)</dd>
            </div>
            <div>
              <dt class="text-sm font-semibold text-foreground">Adresse postale</dt>
              <dd class="mt-1">4 rue Paul Vallier<br />38400 Saint-Martin-d'Hères<br />France</dd>
            </div>
          </dl>
        </div>

        <div class="mt-16 grid gap-6 md:grid-cols-3">
          <article class="rounded-2xl border border-border bg-slate-900/60 p-7">
            <span class="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary"><ng-icon name="lucideGraduationCap" size="24" /></span>
            <h2 class="mt-6 border-0 p-0 text-xl text-foreground">Plateformes e-learning</h2>
            <p class="mt-3 text-sm leading-6 text-slate-300">Des plateformes LMS et Moodle adaptées aux besoins pédagogiques et aux parcours de formation.</p>
          </article>
          <article class="rounded-2xl border border-border bg-slate-900/60 p-7">
            <span class="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary"><ng-icon name="lucideGlasses" size="24" /></span>
            <h2 class="mt-6 border-0 p-0 text-xl text-foreground">Réalité virtuelle 3D</h2>
            <p class="mt-3 text-sm leading-6 text-slate-300">Des environnements immersifs et des simulations interactives pour apprendre autrement.</p>
          </article>
          <article class="rounded-2xl border border-border bg-slate-900/60 p-7">
            <span class="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary"><ng-icon name="lucideCode2" size="24" /></span>
            <h2 class="mt-6 border-0 p-0 text-xl text-foreground">Développement sur mesure</h2>
            <p class="mt-3 text-sm leading-6 text-slate-300">Des applications web et solutions métiers conçues autour des besoins de chaque projet.</p>
          </article>
        </div>

        <div class="mt-16 flex flex-col gap-6 rounded-2xl border border-primary/30 bg-primary/10 p-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 class="border-0 p-0 text-2xl text-foreground">Un projet de formation numérique ?</h2>
            <p class="mt-2 text-slate-300">Parlons de vos objectifs et de vos besoins.</p>
          </div>
          <a routerLink="/contact" class="inline-flex shrink-0 items-center justify-center rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground transition hover:opacity-90">Nous contacter</a>
        </div>
      </div>
    </section>
  `,
})
export class AboutPageComponent {}
