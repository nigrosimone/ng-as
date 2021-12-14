import { Component } from '@angular/core';

// your interface, but also work with any typescript type (class, type, etc.)
interface Person {
  name: string;
}

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-root',
  template: `
  <ng-container *ngTemplateOutlet="personTemplate; context: person"></ng-container>

  <ng-template #personTemplate let-person><span>Hello {{ (person | as: Person).name }}!</span></ng-template>
  `,
})
export class AppComponent {

  // NOTE: If you have "strictPropertyInitialization" enabled, 
  // you will need to add a non-null assertion (!)
  public Person!: Person; // publish your interface into html template

  person: Person = { name: 'Simone' }; // the unknown data type
  
}
