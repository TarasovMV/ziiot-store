import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {IProductCard} from '../../../../core/interfaces/product-card.interface';

@Component({
    selector: 'app-gantt-map-block',
    templateUrl: './gantt-map-block.component.html',
    styleUrls: ['./gantt-map-block.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GanttMapBlockComponent {
    @Input() set data(value: IProductCard) {
        this.title = value?.name;
    }

    title = '';

    constructor() {
    }
}
