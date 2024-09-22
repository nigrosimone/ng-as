# NgAs [![Build Status](https://app.travis-ci.com/nigrosimone/ng-as.svg?branch=main)](https://app.travis-ci.com/nigrosimone/ng-as) [![Coverage Status](https://coveralls.io/repos/github/nigrosimone/ng-as/badge.svg?branch=main)](https://coveralls.io/github/nigrosimone/ng-as?branch=main) [![NPM version](https://img.shields.io/npm/v/ng-as.svg)](https://www.npmjs.com/package/ng-as)

Angular pipe and directive for type casting template variables.

## Description

Sometime there is a need to cast variable into component template as some type. 
This library has pipe and directive for type casting template variables and improve IDE suggestion and refactoring.

See the [stackblitz demo](https://stackblitz.com/edit/demo-ng-as?file=src%2Fapp%2Fapp.component.ts).


## Get Started

*Step 1*: install `ng-as`

```bash
npm i ng-as
```

*Step 2*: usage

type casting template variables with directive eg.:

```ts
import { Component } from '@angular/core';
import { NgAsDirective } from 'ng-as';

// your interface, but also work with any typescript type (class, type, etc.)
interface Person {
  name: string;
}

@Component({
  selector: 'app-root',
  imports: [NgAsDirective],
  template: `
  <ng-container *ngTemplateOutlet="personTemplate; context: {$implicit: person}"></ng-container>

  <ng-template #personTemplate [ngAs]="Person" let-person>
    <span>Hello {{ person.name }}!</span>
  </ng-template>
  `,
})
export class AppComponent {
  // NOTE: If you have "strictPropertyInitialization" enabled, 
  // you will need to add a non-null assertion (!)
  public Person!: Person; // publish your interface into html template
  person: Person = { name: 'Simone' }; // the data
}
```

type casting template variables with pipe eg.:

```ts
import { Component } from '@angular/core';
import { NgAsPipe } from 'ng-as';

// your interface, but also work with any typescript type (class, type, etc.)
interface Person {
  name: string;
}

@Component({
  selector: 'app-root',
  imports: [NgAsPipe],
  template: `
  <ng-container *ngTemplateOutlet="personTemplate; context: {$implicit: person}"></ng-container>

  <ng-template #personTemplate let-person>
    <span>Hello {{ (person | as: Person).name }}!</span>
  </ng-template>
  `,
})
export class AppComponent {
  // NOTE: If you have "strictPropertyInitialization" enabled, 
  // you will need to add a non-null assertion (!)
  public Person!: Person; // publish your interface into html template
  person: Person = { name: 'Simone' }; // the data
}
```

### That's all!

![alt text](https://github.com/nigrosimone/ng-as/blob/main/help.gif?raw=true)

## Example: MatTable

`matCellDef` cannot infer the type of its parent's input. But with `ng-as` you can strong-type its template variable.

```ts
import { Component } from '@angular/core';
import { NgAsPipe } from 'ng-as';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'table-basic-example',
  imports: [NgAsPipe],
  template: `
  <table mat-table [dataSource]="dataSource" class="mat-elevation-z8">

    <ng-container matColumnDef="position">
      <th mat-header-cell *matHeaderCellDef> No. </th>
      <td mat-cell *matCellDef="let element"> {{(element | as: PeriodicElement).position}} </td>
    </ng-container>

    <ng-container matColumnDef="name">
      <th mat-header-cell *matHeaderCellDef> Name </th>
      <td mat-cell *matCellDef="let element"> {{(element | as: PeriodicElement).name}} </td>
    </ng-container>

    <ng-container matColumnDef="weight">
      <th mat-header-cell *matHeaderCellDef> Weight </th>
      <td mat-cell *matCellDef="let element"> {{(element | as: PeriodicElement).weight}} </td>
    </ng-container>

    <ng-container matColumnDef="symbol">
      <th mat-header-cell *matHeaderCellDef> Symbol </th>
      <td mat-cell *matCellDef="let element"> {{(element | as: PeriodicElement).symbol}} </td>
    </ng-container>

    <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
    <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
  </table>
  `,
})
export class TableBasicExample {
  PeriodicElement!: PeriodicElement;
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;
}
```

## Support

This is an open-source project. Star this [repository](https://github.com/nigrosimone/ng-as), if you like it, or even [donate](https://www.paypal.com/paypalme/snwp). Thank you so much! 

## My other libraries

I have published some other Angular libraries, take a look:

 - [NgSimpleState: Simple state management in Angular with only Services and RxJS](https://www.npmjs.com/package/ng-simple-state)
 - [NgHttpCaching: Cache for HTTP requests in Angular application](https://www.npmjs.com/package/ng-http-caching)
 - [NgGenericPipe: Generic pipe for Angular application for use a component method into component template.](https://www.npmjs.com/package/ng-generic-pipe)
 - [NgLet: Structural directive for sharing data as local variable into html component template](https://www.npmjs.com/package/ng-let)
 - [NgForTrackByProperty: Angular global trackBy property directive with strict type checking](https://www.npmjs.com/package/ng-for-track-by-property)
