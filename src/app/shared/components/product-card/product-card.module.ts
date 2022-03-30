import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductCardComponent} from './product-card.component';
import {ImageUrlPipeModule} from '../../pipes/image-url.module';
import {AngularSvgIconModule} from 'angular-svg-icon';


@NgModule({
    declarations: [
        ProductCardComponent
    ],
    exports: [
        ProductCardComponent
    ],
    imports: [
        CommonModule,
        ImageUrlPipeModule,
        AngularSvgIconModule
    ]
})
export class ProductCardModule {
}
