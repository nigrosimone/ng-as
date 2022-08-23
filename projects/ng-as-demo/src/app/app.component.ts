import { Component } from '@angular/core';
import { ngAs } from 'projects/ng-as/src/public-api';

// your interface, but also work with any typescript type (class, type, etc.)
interface Person {
  name: string;
}

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-root',
  template: `
  <ng-container *ngTemplateOutlet="personTemplate1; context: {$implicit: person}"></ng-container>
  <ng-container *ngTemplateOutlet="personTemplate2; context: {$implicit: person}"></ng-container>
  <ng-container *ngTemplateOutlet="personTemplate3; context: {$implicit: person}"></ng-container>

  <ng-template #personTemplate1 let-person>
    <p>Hello {{ (person | as: Person).name }}!</p>
  </ng-template>

  <ng-template #personTemplate2 let-person>
    <p>Hello {{ $ngAs(person, Person).name }}!</p>
  </ng-template>

  <ng-template #personTemplate3 [ngAs]="Person" let-person>
    <p>Hello {{ person.name }}!</p>
  </ng-template>
  `,
})
export class AppComponent {

  // NOTE: If you have "strictPropertyInitialization" enabled, 
  // you will need to add a non-null assertion (!)
  public Person!: Person; // publish your interface into html template

  person: Person = { name: 'Simone' }; // the unknown data type
  
  public readonly $ngAs = ngAs;
}
