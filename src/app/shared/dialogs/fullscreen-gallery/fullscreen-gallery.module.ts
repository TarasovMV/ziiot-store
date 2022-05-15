import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FullscreenGalleryComponent} from './fullscreen-gallery.component';
import {RouterModule} from '@angular/router';
import {DialogWrapperModule} from '../../components/dialog-wrapper/dialog-wrapper.module';
import {SwiperModule} from 'swiper/angular';
import {IframeModule} from '../../components/iframe/iframe.module';


@NgModule({
    declarations: [
        FullscreenGalleryComponent
    ],
    imports: [
        CommonModule,
        DialogWrapperModule,
        SwiperModule,
        IframeModule,
    ]
})
export class FullscreenGalleryModule {
}
