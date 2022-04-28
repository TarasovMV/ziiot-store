import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FrameMessageService} from '../../../../core/services/frame-message.service';

@Component({
    selector: 'app-gantt-map-button',
    templateUrl: './gantt-map-button.component.html',
    styleUrls: ['./gantt-map-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GanttMapButtonComponent {

    constructor(private readonly frameMessage: FrameMessageService) {
    }

    mainRedirect() {
        const payload = {
            type: 'main-redirect',
            body: {}
        }
        this.frameMessage.sendMessage(JSON.stringify(payload));
    }
}
