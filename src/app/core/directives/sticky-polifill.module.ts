import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StickyPolyfillDirective} from './sticky-polifill.directive';


@NgModule({
    declarations: [
        StickyPolyfillDirective,
    ],
    imports: [
        CommonModule,
    ],
    exports: [
        StickyPolyfillDirective,
    ],
})
export class StickyPolifillModule {
}
