import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IframeComponent } from './iframe.component';
import {SafeUrlPipeModule} from '../../pipes/safe-url.module';



@NgModule({
    declarations: [
        IframeComponent
    ],
    exports: [
        IframeComponent
    ],
    imports: [
        CommonModule,
        SafeUrlPipeModule
    ]
})
export class IframeModule { }
