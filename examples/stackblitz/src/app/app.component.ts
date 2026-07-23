import { Component } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { NgAsPipe } from 'ng-as';

interface Person {
  name: string;
}

@Component({
  selector: 'app-root',
  imports: [NgTemplateOutlet, NgAsPipe],
  template: `
    <ng-container *ngTemplateOutlet="tpl; context: { $implicit: person }" />

    <ng-template #tpl let-person>
      <!-- inside the outlet person is any; the cast puts the type back.
           try person.nmae with and without the pipe -->
      <p>Hello {{ (person | as: Person).name }}!</p>
    </ng-template>
  `,
})
export class AppComponent {
  Person!: Person; // publish the type into the template
  person: Person = { name: 'Simone' };
}
