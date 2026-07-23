import { NgModule } from '@angular/core';
import { NgAsDirective } from './ng-as.directive';
import { NgAsAliasPipe, NgAsPipe } from './ng-as.pipe';

@NgModule({
  imports: [NgAsDirective, NgAsPipe, NgAsAliasPipe],
  exports: [NgAsDirective, NgAsPipe, NgAsAliasPipe],
})
export class NgAsModule {}
