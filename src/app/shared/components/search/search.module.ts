import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search.component';
import {AngularSvgIconModule} from 'angular-svg-icon';
import {ReactiveFormsModule} from '@angular/forms';



@NgModule({
    declarations: [
        SearchComponent
    ],
    exports: [
        SearchComponent
    ],
    imports: [
        CommonModule,
        AngularSvgIconModule,
        ReactiveFormsModule
    ]
})
export class SearchModule { }
