import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../environements/environement';
import { ContactFormComponent } from './contact-form.component';

describe('ContactFormComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ContactFormComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
  });

  it('envoie le formulaire et attend la réponse avant de confirmer', () => {
    const component = TestBed.createComponent(ContactFormComponent).componentInstance;
    const http = TestBed.inject(HttpTestingController);
    component.contactForm.setValue({
      name: 'Jean Dupont', email: 'jean@example.com', phone: '',
      subject: 'Question', message: 'Bonjour, voici une question.',
    });
    component.onSubmit();
    expect(component.isSubmitting()).toBe(true);
    expect(component.submittedSuccessfully()).toBe(false);
    const request = http.expectOne(`${environment.apiUrl}/api/contact`);
    expect(request.request.method).toBe('POST');
    expect(request.request.body.message).toBe('Bonjour, voici une question.');
    request.flush(null, { status: 204, statusText: 'No Content' });
    expect(component.submittedSuccessfully()).toBe(true);
    expect(component.contactForm.controls.name.value).toBe('');
    http.verify();
  });

  it("conserve le message en cas d'échec", () => {
    const component = TestBed.createComponent(ContactFormComponent).componentInstance;
    const http = TestBed.inject(HttpTestingController);
    component.contactForm.setValue({
      name: 'Jean Dupont', email: 'jean@example.com', phone: '',
      subject: 'Question', message: 'Bonjour, voici une question.',
    });
    component.onSubmit();
    http.expectOne(`${environment.apiUrl}/api/contact`)
      .flush(null, { status: 503, statusText: 'Service Unavailable' });
    expect(component.isSubmitting()).toBe(false);
    expect(component.submittedSuccessfully()).toBe(false);
    expect(component.submitError()).toBeTruthy();
    expect(component.contactForm.controls.message.value).toBe('Bonjour, voici une question.');
    http.verify();
  });
});
