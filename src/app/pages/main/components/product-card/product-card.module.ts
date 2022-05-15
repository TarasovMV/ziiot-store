import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductCardComponent} from './product-card.component';
import {ImageUrlPipeModule} from '@shared/pipes/image-url.module';
import {AngularSvgIconModule} from 'angular-svg-icon';
import {RouterModule} from '@angular/router';


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
        AngularSvgIconModule,
        RouterModule
    ]
})
export class ProductCardModule {
}
