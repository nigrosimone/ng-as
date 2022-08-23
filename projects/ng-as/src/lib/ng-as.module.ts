import { NgModule } from '@angular/core';
import { NgAsDirective } from './ng-as.directive';
import { NgAsPipe } from './ng-as.pipe';

@NgModule({
  declarations: [NgAsPipe, NgAsDirective],
  imports: [],
  exports: [NgAsPipe, NgAsDirective],
  providers: []
})
export class NgAsModule { }
