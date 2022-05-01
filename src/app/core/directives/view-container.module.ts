import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { ViewContainerDirective } from './view-container.directive';


@NgModule({
    declarations: [
        ViewContainerDirective,
    ],
    imports: [
        CommonModule,
    ],
    exports: [
        ViewContainerDirective,
    ],
})
export class ViewContainerModule {
}
