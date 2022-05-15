import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GanttMapComponent} from './gantt-map.component';
import {RouterModule} from '@angular/router';
import { GanttMapTheadComponent } from './components/gantt-map-thead/gantt-map-thead.component';
import { GanttMapBlockComponent } from './components/gantt-map-block/gantt-map-block.component';
import { GanttMapLevelsComponent } from './components/gantt-map-levels/gantt-map-levels.component';
import { GanttMapButtonComponent } from './components/gantt-map-button/gantt-map-button.component';
import {AngularSvgIconModule} from 'angular-svg-icon';
import {StickyPolifillModule} from '@core/directives/sticky-polifill.module';
import { GanttMapHeaderComponent } from './components/gantt-map-header/gantt-map-header.component';
import {ImageUrlPipeModule} from '@shared/pipes/image-url.module';
import {FooterModule} from '@shared/components/footer/footer.module';
import {ConnectFormModule} from '@shared/dialogs/connect-form/connect-form.module';


@NgModule({
    declarations: [
        GanttMapComponent,
        GanttMapTheadComponent,
        GanttMapBlockComponent,
        GanttMapLevelsComponent,
        GanttMapButtonComponent,
        GanttMapHeaderComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([{
            path: '',
            component: GanttMapComponent,
        }]),
        AngularSvgIconModule,
        StickyPolifillModule,
        ImageUrlPipeModule,
        FooterModule,
        ConnectFormModule,
    ]
})
export class GanttMapModule {
}
