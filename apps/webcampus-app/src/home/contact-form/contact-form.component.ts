import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCheckCircle, lucideSendHorizontal } from '@ng-icons/lucide';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmInput } from '@spartan-ng/helm/input';
import { HlmTextarea } from '@spartan-ng/helm/textarea';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    NgIcon,
    HlmButton,
    HlmInput,
    HlmTextarea,
  ],
  providers: [
    provideIcons({
      lucideSendHorizontal,
      lucideCheckCircle,
    }),
  ],
  template: `
    <div
      class="w-full max-w-2xl mx-auto p-6 bg-background rounded-lg border border-border shadow-sm"
    >
      <div class="mb-8">
        <h2 class="text-2xl font-bold text-foreground mb-2">Nous contacter</h2>
        <p class="text-muted-foreground">Envoyez-nous un message.</p>
      </div>
      <!-- Message de succès -->

      @if (submittedSuccessfully()) {
        <div
          class="mb-6 p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg flex gap-3"
        >
          <ng-icon
            name="lucideCheckCircle"
            class="text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0"
          ></ng-icon>
          <div>
            <h3 class="font-semibold text-green-900 dark:text-green-100">
              Message envoyé avec succès!
            </h3>
            <p class="text-sm text-green-800 dark:text-green-200">
              Nous vous recontacterons dès que possible.
            </p>
          </div>
        </div>
      }

      <form [formGroup]="contactForm" (ngSubmit)="onSubmit()" class="space-y-6">
        <!-- Nom -->
        <div class="space-y-2">
          <label for="name" class="block text-sm font-medium text-foreground"
            >Nom complet *</label
          >
          <input
            hlmInput
            id="name"
            type="text"
            formControlName="name"
            placeholder="Jean Dupont"
            [attr.aria-invalid]="isFieldInvalid('name')"
          />

          @if (isFieldInvalid('name')) {
            <div class="text-sm text-destructive">
              {{ getFieldError('name') }}
            </div>
          }
        </div>

        <!-- Email -->
        <div class="space-y-2">
          <label for="email" class="block text-sm font-medium text-foreground"
            >Adresse email *</label
          >
          <input
            hlmInput
            id="email"
            type="email"
            formControlName="email"
            placeholder="jean@example.com"
            [attr.aria-invalid]="isFieldInvalid('email')"
          />

          @if (isFieldInvalid('email')) {
            <div class="text-sm text-destructive">
              {{ getFieldError('email') }}
            </div>
          }
        </div>

        <!-- Téléphone -->
        <div class="space-y-2">
          <label for="phone" class="block text-sm font-medium text-foreground"
            >Téléphone</label
          >
          <input
            hlmInput
            id="phone"
            type="tel"
            formControlName="phone"
            placeholder="+33 6 12 34 56 78"
            [attr.aria-invalid]="isFieldInvalid('phone')"
          />
          @if (isFieldInvalid('phone')) {
            <div class="text-sm text-destructive">
              {{ getFieldError('phone') }}
            </div>
          }
        </div>

        <!-- Sujet -->
        <div class="space-y-2">
          <label for="subject" class="block text-sm font-medium text-foreground"
            >Sujet *</label
          >
          <input
            hlmInput
            id="subject"
            type="text"
            formControlName="subject"
            placeholder="Comment pouvons-nous vous aider ?"
            [attr.aria-invalid]="isFieldInvalid('subject')"
          />
          @if (isFieldInvalid('subject')) {
            <div class="text-sm text-destructive">
              {{ getFieldError('subject') }}
            </div>
          }
        </div>

        <!-- Message -->
        <div class="space-y-2">
          <label for="message" class="block text-sm font-medium text-foreground"
            >Message *</label
          >
          <textarea
            hlmTextarea
            id="message"
            formControlName="message"
            placeholder="Décrivez votre demande en détail..."
            rows="6"
            [attr.aria-invalid]="isFieldInvalid('message')"
          ></textarea>
          @if (isFieldInvalid('message')) {
            <div class="text-sm text-destructive">
              {{ getFieldError('message') }}
            </div>
          }
        </div>

        <!-- Bouton soumettre -->
        <div class="flex gap-3 pt-4">
          <button
            hlmBtn
            type="submit"
            [disabled]="contactForm.invalid || isSubmitting()"
            class="gap-2"
          >
            @if (!isSubmitting()) {
              <ng-icon name="lucideSendHorizontal"></ng-icon>
              <span>Envoyer le message</span>
            } @else {
              <span>Envoi en cours...</span>
            }
          </button>
          <button
            hlmBtn
            type="button"
            variant="outline"
            (click)="onReset()"
            [disabled]="isSubmitting()"
          >
            Réinitialiser
          </button>
        </div>
      </form>

      <p class="text-xs text-muted-foreground mt-6">
        * Les champs marqués d'un astérisque sont obligatoires.
      </p>
    </div>
  `,
  styleUrl: './contact-form.component.scss',
})
export class ContactFormComponent {
  contactForm: FormGroup;
  isSubmitting = signal(false);
  submittedSuccessfully = signal(false);
  fb: FormBuilder = inject(FormBuilder);
  constructor() {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.pattern(/^[\d\s+().-]*$/)]],
      subject: ['', [Validators.required, Validators.minLength(3)]],
      message: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  onSubmit(): void {
    if (this.contactForm.invalid) {
      return;
    }

    this.isSubmitting.set(true);
    const formData = this.contactForm.value;

    setTimeout(() => {
      console.log('Formulaire soumis:', formData);
      this.isSubmitting.set(false);
      this.submittedSuccessfully.set(true);
      this.contactForm.reset();

      setTimeout(() => {
        this.submittedSuccessfully.set(false);
      }, 5000);
    }, 1500);
  }

  onReset(): void {
    this.contactForm.reset();
    this.submittedSuccessfully.set(false);
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getFieldError(fieldName: string): string {
    const field = this.contactForm.get(fieldName);
    if (!field || !field.errors) return '';

    if (field.errors['required']) return 'Ce champ est obligatoire.';
    if (field.errors['email'])
      return 'Veuillez entrer une adresse email valide.';
    if (field.errors['minlength']) {
      const minLength = field.errors['minlength'].requiredLength;
      return `Minimum ${minLength} caractères requis.`;
    }
    if (field.errors['pattern']) return 'Format invalide pour ce champ.';

    return 'Erreur de validation.';
  }
}
