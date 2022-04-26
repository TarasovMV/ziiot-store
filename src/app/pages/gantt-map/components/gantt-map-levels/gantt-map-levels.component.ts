import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-gantt-map-levels',
    templateUrl: './gantt-map-levels.component.html',
    styleUrls: ['./gantt-map-levels.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GanttMapLevelsComponent implements OnInit {
    @Input() activeIdx = 0;
    readonly levels = ['SCM', 'MES', 'ZIIoT', 'КИПиА'];

    constructor() {
    }

    ngOnInit(): void {
    }
}
