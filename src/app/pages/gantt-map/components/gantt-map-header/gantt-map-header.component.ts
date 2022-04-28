import {ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ProductType} from '../../../../core/enums';
import {inOutAnimation} from '../../../../shared/animations/in-out.animation';

@Component({
    selector: 'app-gantt-map-header',
    templateUrl: './gantt-map-header.component.html',
    styleUrls: ['./gantt-map-header.component.scss'],
    animations: [inOutAnimation],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GanttMapHeaderComponent implements OnInit {
    @Output() select = new EventEmitter<ProductType>();
    @Output() connect = new EventEmitter();
    readonly productType = ProductType;

    constructor() {
    }

    ngOnInit(): void {
    }

}
