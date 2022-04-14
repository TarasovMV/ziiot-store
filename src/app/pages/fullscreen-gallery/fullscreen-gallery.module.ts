import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FullscreenGalleryComponent} from './fullscreen-gallery.component';
import {RouterModule} from '@angular/router';
import {DialogWrapperModule} from '../../shared/components/dialog-wrapper/dialog-wrapper.module';
import {SwiperModule} from 'swiper/angular';


@NgModule({
    declarations: [
        FullscreenGalleryComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([{
            path: '',
            component: FullscreenGalleryComponent,
        }]),
        DialogWrapperModule,
        SwiperModule,
    ]
})
export class FullscreenGalleryModule {
}
