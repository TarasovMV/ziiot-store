import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogWrapperComponent } from './dialog-wrapper.component';
import {AngularSvgIconModule} from 'angular-svg-icon';



@NgModule({
    declarations: [
        DialogWrapperComponent
    ],
    exports: [
        DialogWrapperComponent
    ],
    imports: [
        CommonModule,
        AngularSvgIconModule
    ]
})
export class DialogWrapperModule { }
