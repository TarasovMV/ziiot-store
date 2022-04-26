import {ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ProductType} from '../../../../core/enums';

@Component({
    selector: 'app-gantt-map-header',
    templateUrl: './gantt-map-header.component.html',
    styleUrls: ['./gantt-map-header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GanttMapHeaderComponent implements OnInit {
    @Output() select = new EventEmitter<ProductType>();
    readonly productType = ProductType;

    constructor() {
    }

    ngOnInit(): void {
    }

}
