import { NgModule } from '@angular/core';
import { NgAsDirective } from './ng-as.directive';
import { NgAsPipe } from './ng-as.pipe';


@NgModule({
  imports: [NgAsDirective, NgAsPipe],
  exports: [NgAsDirective, NgAsPipe]
})
export class NgAsModule { }
