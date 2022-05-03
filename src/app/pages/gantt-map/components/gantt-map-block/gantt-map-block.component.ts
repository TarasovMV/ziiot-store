import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {IProductCard} from '../../../../core/interfaces/product-card.interface';
import {ImageUrlPipe} from '../../../../shared/pipes/image-url.pipe';
import {PlatformService} from '../../../../core/services/platform.service';

@Component({
    selector: 'app-gantt-map-block',
    templateUrl: './gantt-map-block.component.html',
    styleUrls: ['./gantt-map-block.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GanttMapBlockComponent {
    @Input() set data(value: IProductCard) {
        this.title = value?.name;
        this.description = value?.interlinear;
        this.url = value?.url;
        this.icon = value?.icon;

        if (value.url) {
            this.link =  '/product/' + value.url.split('/').slice(-1)[0];
        }

        if (value.document) {
            this.link = this.imageUrlPipe.transform(value.document);
        }
    }

    icon = '';
    title = '';
    description = '';
    url = '';
    link = '';

    readonly pageSize$ = this.platform.pageMapSize$;

    constructor(
        private readonly imageUrlPipe: ImageUrlPipe,
        private readonly platform: PlatformService,
    ) {}
}
