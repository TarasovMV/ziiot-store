import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DialogWrapperComponent} from './dialog-wrapper.component';
import {ViewContainerModule} from '../../directives/view-container.module';


@NgModule({
    declarations: [
        DialogWrapperComponent,
    ],
    imports: [
        CommonModule,
        ViewContainerModule
    ]
})
export class DialogWrapperModule {
}
