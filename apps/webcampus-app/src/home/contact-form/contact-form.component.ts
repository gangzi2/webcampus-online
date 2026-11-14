import { CommonModule } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { OverlayRef } from '@angular/cdk/overlay';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideCheckCircle,
  lucideSendHorizontal,
  lucideX,
} from '@ng-icons/lucide';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmInput } from '@spartan-ng/helm/input';
import { HlmTextarea } from '@spartan-ng/helm/textarea';
import { finalize } from 'rxjs';
import { environment } from '../../environements/environement';

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
      lucideX,
    }),
  ],
  template: `
    <div
      class="w-full max-w-none mx-auto p-6 sm:p-10 bg-background rounded-lg border border-border shadow-sm"
    >
        <div class="mb-8 flex items-start justify-between gap-4">
          <div>
            <h2 class="text-3xl font-bold text-foreground mb-2">Nous contacter</h2>
            <p class="text-muted-foreground">Envoyez-nous un message.</p>
          </div>
          @if (overlayRef) {
            <button
              type="button"
              aria-label="Fermer le formulaire de contact"
              class="inline-flex size-10 shrink-0 items-center justify-center rounded-full text-muted-foreground transition hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              (click)="closeForm()"
            >
              <ng-icon name="lucideX" size="20"></ng-icon>
            </button>
          }
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

      @if (submitError()) {
        <div
          role="alert"
          class="mb-6 rounded-lg border border-destructive p-4 text-sm text-destructive"
        >
          {{ submitError() }}
        </div>
      }

      <form [formGroup]="contactForm" (ngSubmit)="onSubmit()" class="space-y-8">
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
            class="h-12"
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
            class="h-12"
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
            class="h-12"
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
            class="h-12"
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
            rows="8"
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
  readonly overlayRef = inject(OverlayRef, { optional: true });
  private readonly http = inject(HttpClient);
  private readonly destroyRef = inject(DestroyRef);
  private readonly fb = inject(FormBuilder).nonNullable;
  readonly isSubmitting = signal(false);
  readonly submittedSuccessfully = signal(false);
  readonly submitError = signal<string | null>(null);
  readonly contactForm = this.fb.group({
    name: [
      '',
      [Validators.required, Validators.minLength(2), Validators.maxLength(120)],
    ],
    email: [
      '',
      [Validators.required, Validators.email, Validators.maxLength(254)],
    ],
    phone: [
      '',
      [Validators.pattern(/^[\d\s+().-]*$/), Validators.maxLength(40)],
    ],
    subject: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(200),
        Validators.pattern(/^[^\r\n]+$/),
      ],
    ],
    message: [
      '',
      [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10000),
      ],
    ],
  });

  closeForm(): void {
    this.overlayRef?.dispose();
  }

  onSubmit(): void {
    if (this.contactForm.invalid || this.isSubmitting()) {
      this.contactForm.markAllAsTouched();
      return;
    }

    const values = this.contactForm.getRawValue();
    const payload = {
      name: values.name.trim(),
      email: values.email.trim(),
      phone: values.phone.trim(),
      subject: values.subject.trim(),
      message: values.message.trim(),
    };
    if (
      payload.name.length < 2 ||
      payload.subject.length < 3 ||
      payload.message.length < 10
    ) {
      this.submitError.set(
        'Veuillez remplir les champs obligatoires avec un contenu valide.',
      );
      return;
    }

    this.isSubmitting.set(true);
    this.submitError.set(null);
    this.submittedSuccessfully.set(false);
    this.http
      .post<void>(`${environment.apiUrl}/api/Contact`, payload)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.isSubmitting.set(false)),
      )
      .subscribe({
        next: () => {
          this.submittedSuccessfully.set(true);
          this.contactForm.reset();
        },
        error: (error: HttpErrorResponse) => {
          this.submitError.set(
            error.status === 429
              ? 'Trop de tentatives. Veuillez réessayer dans une minute.'
              : "L'envoi a échoué. Veuillez réessayer ultérieurement.",
          );
        },
      });
  }

  onReset(): void {
    this.contactForm.reset();
    this.submittedSuccessfully.set(false);
    this.submitError.set(null);
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
    if (field.errors['maxlength']) {
      const maxLength = field.errors['maxlength'].requiredLength;
      return `Maximum ${maxLength} caractères autorisés.`;
    }
    if (field.errors['pattern']) return 'Format invalide pour ce champ.';

    return 'Erreur de validation.';
  }
}
