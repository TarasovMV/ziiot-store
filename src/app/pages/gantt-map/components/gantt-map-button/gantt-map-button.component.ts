import {ChangeDetectionStrategy, Component} from '@angular/core';
import {AppRoutes} from '../../../../core/enums';


@Component({
    selector: 'app-gantt-map-button',
    templateUrl: './gantt-map-button.component.html',
    styleUrls: ['./gantt-map-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GanttMapButtonComponent {
    readonly catalogLink = AppRoutes.Catalog;
}
