import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryCardComponent } from './category-card.component';
import {AngularSvgIconModule} from 'angular-svg-icon';



@NgModule({
    declarations: [
        CategoryCardComponent
    ],
    exports: [
        CategoryCardComponent
    ],
    imports: [
        CommonModule,
        AngularSvgIconModule
    ]
})
export class CategoryCardModule { }
