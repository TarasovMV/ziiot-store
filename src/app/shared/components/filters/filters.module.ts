import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltersComponent } from './filters.component';
import {AngularSvgIconModule} from 'angular-svg-icon';



@NgModule({
    declarations: [
        FiltersComponent
    ],
    exports: [
        FiltersComponent
    ],
    imports: [
        CommonModule,
        AngularSvgIconModule
    ]
})
export class FiltersModule { }
