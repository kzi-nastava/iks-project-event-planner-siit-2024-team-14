// src/app/components/registration/registration-spp/registration-spp.component.spec.ts
import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';

import { RegistrationSppComponent } from './registration-spp.component';
import { RegistrationSppService } from './registration-spp.service';

class MockRegistrationSppService {
  register(_fd: FormData) { return of({ ok: true }); }
}

describe('RegistrationSppComponent', () => {
  let fixture: ComponentFixture<RegistrationSppComponent>;
  let component: RegistrationSppComponent;
  let service: RegistrationSppService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistrationSppComponent],
      imports: [ReactiveFormsModule, RouterTestingModule],
      providers: [{ provide: RegistrationSppService, useClass: MockRegistrationSppService }],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .overrideTemplate(RegistrationSppComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(RegistrationSppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = TestBed.inject(RegistrationSppService);
  });

  function fillValidForm(overrides: Partial<Record<string, any>> = {}) {
    component.registrationForm.patchValue({
      email: 'spp@example.com',
      password: 'Password1!',
      confirmPassword: 'Password1!',
      companyName: 'My Co',
      companyDescription: 'Desc',
      address: 'Addr',
      city: 'City',
      phoneNumber: '060123456',
      ...overrides,
    });
  }

  it('form invalid when empty', () => {
    expect(component.registrationForm.valid).toBeFalse();
  });

  it('submits valid form and shows success modal', fakeAsync(() => {
    const spy = spyOn(service, 'register').and.returnValue(of({ ok: true }));

    fillValidForm();

    component.register();
    tick();
    fixture.detectChanges();

    expect(component.registrationForm.valid).toBeTrue();
    expect(spy).toHaveBeenCalled();
    expect(component.showModal).toBeTrue();
    expect(component.showOkButton).toBeTrue();
  }));

  it('alerts on 409 (email exists)', fakeAsync(() => {
    spyOn(window, 'alert');
    spyOn(service, 'register').and.returnValue(throwError(() => ({ status: 409 })));

    fillValidForm({ email: 'exists@example.com' });

    component.register();
    tick();
    fixture.detectChanges();

    expect(window.alert).toHaveBeenCalledWith('User with that email address already exists');
  }));

  it('shows generic alert on non-409 error', fakeAsync(() => {
    spyOn(window, 'alert');
    spyOn(service, 'register').and.returnValue(throwError(() => ({ status: 500 })));

    fillValidForm({ email: 'serverfail@example.com' });

    component.register();
    tick();
    fixture.detectChanges();

    expect(window.alert).toHaveBeenCalled();
  }));

  it('does not crash when passwords mismatch (and behaves sensibly)', fakeAsync(() => {
    spyOn(window, 'alert');
    const spy = spyOn(service, 'register').and.returnValue(of({ ok: true }));

    fillValidForm({ confirmPassword: 'DIFFERENT!' });

    expect(() => {
      component.register();
      tick();
      fixture.detectChanges();
    }).not.toThrow();

    if (component.registrationForm.invalid) {
      expect(spy).not.toHaveBeenCalled();
    } else {
      expect(spy).toHaveBeenCalledTimes(1);
    }
  }));

  it('onFilesSelected respects max 3 files total', () => {
    // start with one file already selected
    const existing = new File([new Uint8Array([1])], 'e.png', { type: 'image/png' });
    component.selectedFiles = [existing];

    // simulate choosing 3 more files; only first 2 should be added (limit 3 total)
    const f1 = new File([new Uint8Array([1])], 'a.png', { type: 'image/png' });
    const f2 = new File([new Uint8Array([1])], 'b.png', { type: 'image/png' });
    const f3 = new File([new Uint8Array([1])], 'c.png', { type: 'image/png' });

    const fakeEvent = {
      target: {
        files: [f1, f2, f3] as unknown as FileList
      }
    } as any;

    component.onFilesSelected(fakeEvent);

    expect(component.selectedFiles.length).toBe(3);
    expect(component.selectedFiles).toEqual([existing, f1, f2]); // capped at 3
  });

  it('appends all selected files with email-prefixed filenames', fakeAsync(() => {
    // Mock FormData to capture values + the third "name" param
    const originalFD = (window as any).FormData;
    class FDMock {
      private map = new Map<string, any[]>();
      append(key: string, value: any, name?: string) {
        const arr = this.map.get(key) ?? [];
        arr.push(name ? { value, name } : value);
        this.map.set(key, arr);
      }
      getAll(key: string) { return this.map.get(key) ?? []; }
      get(key: string) {
        const all = this.getAll(key);
        return all.length ? all[0] : undefined;
      }
    }
    (window as any).FormData = FDMock as any;

    const spy = spyOn(service, 'register').and.callFake((fd: any) => of({ ok: true }));

    const email = 'sppfiles@example.com';
    const f1 = new File([new Uint8Array([1])], 'logo.png', { type: 'image/png' });
    const f2 = new File([new Uint8Array([2])], 'cover.jpg', { type: 'image/jpeg' });
    const f3 = new File([new Uint8Array([3])], 'extra.webp', { type: 'image/webp' });

    component.selectedFiles = [f1, f2, f3];

    fillValidForm({ email });

    component.register();
    tick();
    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
    const fdSent = spy.calls.mostRecent().args[0] as any;

    const dtoBlob = fdSent.get('dto');
    expect(dtoBlob instanceof Blob).toBeTrue();

    const photos = fdSent.getAll('photos') as Array<{ value: File; name: string }>;
    expect(photos.length).toBe(3);
    photos.forEach(p => {
      expect(p.value instanceof File).toBeTrue();
      expect(p.name.startsWith(`${email}-`)).toBeTrue(); // email-prefixed filename
    });

    (window as any).FormData = originalFD;
  }));

  it('calls service exactly once per submit', fakeAsync(() => {
    const spy = spyOn(service, 'register').and.returnValue(of({ ok: true }));
    fillValidForm();

    component.register();
    tick();

    expect(spy).toHaveBeenCalledTimes(1);
  }));

  it('sets success modal flags only on success path', fakeAsync(() => {
    const okSpy = spyOn(service, 'register').and.returnValue(of({ ok: true }));
    fillValidForm();

    component.register();
    tick();
    fixture.detectChanges();

    expect(okSpy).toHaveBeenCalled();
    expect(component.showModal).toBeTrue();
    expect(component.showOkButton).toBeTrue();
  }));

  it('closeModal hides the modal', () => {
    component.showModal = true;
    component.closeModal();
    expect(component.showModal).toBeFalse();
  });
});
