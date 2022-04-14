import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductComponent} from './product.component';
import {ProductHeaderComponent} from './components/product-header/product-header.component';
import {ProductGalleryComponent} from './components/product-gallery/product-gallery.component';
import {ProductImageComponent} from './components/product-image/product-image.component';
import {ProductDescriptionComponent} from './components/product-description/product-description.component';
import {ProductBulletComponent} from './components/product-bullet/product-bullet.component';
import {RouterModule} from '@angular/router';
import { ProductContactsComponent } from './components/product-contacts/product-contacts.component';
import {AngularSvgIconModule} from 'angular-svg-icon';
import {ImageUrlPipeModule} from '../../shared/pipes/image-url.module';
import {SwiperModule} from 'swiper/angular';
import { ProductControlComponent } from './components/product-control/product-control.component';
import {NgDompurifyModule} from '@tinkoff/ng-dompurify';


@NgModule({
    declarations: [
        ProductComponent,
        ProductHeaderComponent,
        ProductGalleryComponent,
        ProductImageComponent,
        ProductDescriptionComponent,
        ProductBulletComponent,
        ProductContactsComponent,
        ProductControlComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([{
            path: '',
            component: ProductComponent,
        }]),
        AngularSvgIconModule,
        ImageUrlPipeModule,
        SwiperModule,
        NgDompurifyModule
    ]
})
export class ProductModule {
}
