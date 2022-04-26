import {AfterViewInit, Directive, ElementRef} from '@angular/core';
import * as Stickyfill from 'stickyfilljs';


@Directive({
    selector: '[stickyPolyfill]'
})
export class StickyPolyfillDirective implements AfterViewInit {

    constructor(private elementRef: ElementRef) { }

    ngAfterViewInit() {
        Stickyfill.addOne(this.elementRef.nativeElement);
    }
}
