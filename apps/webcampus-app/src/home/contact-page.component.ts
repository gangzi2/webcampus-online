import { Component } from '@angular/core';
import { ContactFormComponent } from './contact-form/contact-form.component';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [ContactFormComponent],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-background via-muted to-background py-16 px-4">
      <div class="max-w-4xl mx-auto">
        <!-- Header -->
        <div class="text-center mb-12">
          <h1 class="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Restez en contact avec nous
          </h1>
          <p class="text-lg text-muted-foreground max-w-2xl mx-auto">
            Avez-vous des questions ou des commentaires ? Nous aimerions vous entendre.
            N'hésitez pas à nous contacter à propos de n'importe quoi.
          </p>
        </div>

        <!-- Contact Form -->
        <div class="grid md:grid-cols-3 gap-8">
          <!-- Formulaire -->
          <div class="md:col-span-2">
            <app-contact-form></app-contact-form>
          </div>

          <!-- Informations de contact -->
          <div class="space-y-6">
            <!-- Email -->
            <div class="p-6 bg-card rounded-lg border border-border">
              <div class="flex items-start gap-4">
                <div class="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span class="text-xl">✉️</span>
                </div>
                <div>
                  <h3 class="font-semibold text-foreground mb-2">Email</h3>
                  <a href="mailto:contact@webcampus.com" class="text-primary hover:underline">
                    contact@webcampus.com
                  </a>
                </div>
              </div>
            </div>

            <!-- Téléphone -->
            <div class="p-6 bg-card rounded-lg border border-border">
              <div class="flex items-start gap-4">
                <div class="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span class="text-xl">📞</span>
                </div>
                <div>
                  <h3 class="font-semibold text-foreground mb-2">Téléphone</h3>
                  <a href="tel:+33123456789" class="text-primary hover:underline">
                    +33 (0) 1 23 45 67 89
                  </a>
                </div>
              </div>
            </div>

            <!-- Adresse -->
            <div class="p-6 bg-card rounded-lg border border-border">
              <div class="flex items-start gap-4">
                <div class="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span class="text-xl">📍</span>
                </div>
                <div>
                  <h3 class="font-semibold text-foreground mb-2">Adresse</h3>
                  <p class="text-sm text-muted-foreground">
                    123 Rue de la Tech<br />
                    75000 Paris<br />
                    France
                  </p>
                </div>
              </div>
            </div>

            <!-- Horaires -->
            <div class="p-6 bg-card rounded-lg border border-border">
              <div class="flex items-start gap-4">
                <div class="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span class="text-xl">🕐</span>
                </div>
                <div>
                  <h3 class="font-semibold text-foreground mb-2">Horaires</h3>
                  <p class="text-sm text-muted-foreground">
                    Lun - Ven: 9:00 - 18:00<br />
                    Sam - Dim: Fermé
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class ContactPageComponent {}
