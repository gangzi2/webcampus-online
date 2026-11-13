import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import {
  inject,
  InjectionToken,
  Injector,
  Service,
  signal,
  Signal,
  Type,
} from '@angular/core';
import { HlmDialogService } from '@spartan-ng/helm/dialog';
export const DIALOG_DATAS = new InjectionToken<any>('DIALOG_DATA');
@Service()
export class DialogService {
  private overlay = inject(Overlay);
  private injector = inject(Injector);
  private readonly _dialogService = inject(HlmDialogService);
  async openLazy<TData>(
    loadComponent: () => Promise<Type<unknown>>,
    dataSignal: Signal<TData | null> = signal<TData | null>(null),
  ) {
    // 1. Chargement dynamique du composant
    const component = await loadComponent();

    // 2. Création de l'overlay (identique à avant)
    const overlayRef = this.overlay.create({
      positionStrategy: this.overlay
        .position()
        .global()
        .centerHorizontally()
        .centerVertically(),
      hasBackdrop: true,
    });

    overlayRef.backdropClick().subscribe(() => overlayRef.dispose());

    // 3. Injection et attachement
    const injector = Injector.create({
      providers: [
        { provide: OverlayRef, useValue: overlayRef },
        { provide: DIALOG_DATAS, useValue: dataSignal },
      ],
      parent: this.injector,
    });

    const portal = new ComponentPortal(component, null, injector);
    overlayRef.attach(portal);

    return overlayRef;
  }
}
