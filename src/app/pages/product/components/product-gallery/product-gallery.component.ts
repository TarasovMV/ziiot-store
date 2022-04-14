import {ChangeDetectionStrategy, Component, Input, ViewEncapsulation} from '@angular/core';
import SwiperCore, {Navigation, Pagination} from "swiper";

SwiperCore.use([Navigation, Pagination]);

@Component({
    selector: 'app-product-gallery',
    templateUrl: './product-gallery.component.html',
    styleUrls: ['./product-gallery.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductGalleryComponent {
    @Input() gallery: string[] = [];
}
