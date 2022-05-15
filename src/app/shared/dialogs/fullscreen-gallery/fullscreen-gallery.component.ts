import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import SwiperCore, {Navigation, Pagination} from "swiper";
import {BehaviorSubject} from 'rxjs';
import {DIALOG} from '@core/tokens';
import {Dialog} from '@core/interfaces/dialog.interface';

SwiperCore.use([Navigation, Pagination]);

@Component({
    selector: 'app-fullscreen-gallery',
    templateUrl: './fullscreen-gallery.component.html',
    styleUrls: ['./fullscreen-gallery.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FullscreenGalleryComponent implements OnInit {
    readonly images$ = new BehaviorSubject<string[]>([]);

    constructor(
        @Inject(DIALOG) private readonly dialog: Dialog<{images: string[], idx: number}, never>,
    ) {
    }

    ngOnInit() {
        const data = this.dialog.data;
        const gallery = [data.images[data.idx], ...data.images.filter((_, i) => i !== data.idx)];
        this.images$.next(gallery);
    }
}
