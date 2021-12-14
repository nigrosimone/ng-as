import { Component } from '@angular/core';


interface Person {
  name: string;
  age: number;
}

class Product {
  name!: string;
}

type Car = {
  name: string;
}

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-root',
  template: `
  {{ ($any(person) | as: Person).name }} age {{ ($any(person) | as: Person).age }}<br />
  {{ ($any(product) | as: Product).name }} {{ ($any(car) | as: Car).name }}<br />
  `,
})
export class AppComponent {

  Person!: Person;
  Product!: Product;
  Car!: Car;

  person: any = { name: 'Simone', age: 18 };
  product: any = { name: 'car' };
  car: any = { name: 'Mazda' };
}
