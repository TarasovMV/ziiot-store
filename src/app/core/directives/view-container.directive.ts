import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[viewContainer]'
})
export class ViewContainerDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
