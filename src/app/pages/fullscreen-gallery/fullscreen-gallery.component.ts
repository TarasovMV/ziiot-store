import {ChangeDetectionStrategy, Component} from '@angular/core';
import SwiperCore, {Navigation, Pagination} from "swiper";
import {BehaviorSubject} from 'rxjs';

SwiperCore.use([Navigation, Pagination]);

@Component({
    selector: 'app-fullscreen-gallery',
    templateUrl: './fullscreen-gallery.component.html',
    styleUrls: ['./fullscreen-gallery.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FullscreenGalleryComponent {
    readonly images$ = new BehaviorSubject<string[]>([]);

    constructor() {
    }

    onLoad(data: {images: string[], idx: number}) {
        const gallery = [data.images[data.idx], ...data.images.filter((_, i) => i !== data.idx)];
        this.images$.next(gallery);
    }
}
