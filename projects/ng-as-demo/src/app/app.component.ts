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
  <ng-container *ngTemplateOutlet="pipeTemplate; context: {$implicit: person}"></ng-container>
  <ng-container *ngTemplateOutlet="methodTemplate; context: {$implicit: person}"></ng-container>
  <ng-container *ngTemplateOutlet="directiveTemplate; context: {$implicit: person}"></ng-container>

  <ng-template #pipeTemplate let-person>
    <p>Hello {{ (person | as: Person).name }}!</p>
  </ng-template>

  <ng-template #methodTemplate let-person>
    <p>Hello {{ $ngAs(person, Person).name }}!</p>
  </ng-template>

  <ng-template #directiveTemplate [ngAs]="Person" let-person>
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
