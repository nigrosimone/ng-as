import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('greets through the pipe, the helper and the directive alike', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    const greetings = (fixture.nativeElement as HTMLElement).textContent ?? '';
    expect(greetings.match(/Hello Simone!/g)).toHaveLength(4);
  });
});
