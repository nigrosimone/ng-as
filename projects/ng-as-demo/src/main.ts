import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideZonelessChangeDetection } from '@angular/core';

void bootstrapApplication(AppComponent, {
  providers: [provideZonelessChangeDetection()],
});
