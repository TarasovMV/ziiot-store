import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {FrameMessageService} from '../../../../core/services/frame-message.service';

enum Buttons {
    Default,
    ZIIoT,
    KIPiA
}

@Component({
    selector: 'app-gantt-map-thead',
    templateUrl: './gantt-map-thead.component.html',
    styleUrls: ['./gantt-map-thead.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GanttMapTheadComponent {
    @Input() set type(value: string) {
        this.data = this.mocks.find(x => x.type === value);
    };
    data: any;
    private readonly mocks = [
        {
            type: 'SCM',
            descriptionHtml: '<span class="description__blue">Управление</span> компанией<br>цепочкой поставок',
            buttons: Buttons.Default
        },
        {
            type: 'MES',
            descriptionHtml: '<span class="description__blue">Управление</span><br>производством',
            buttons: Buttons.Default
        },
        {
            type: 'ZIIoT',
            descriptionHtml: '<span class="description__green">Цифровая платформа</span><br>для разработки бизнес-приложений',
            buttons: Buttons.ZIIoT
        },
        {
            type: 'КИПиА',
            descriptionHtml: '<span class="description__blue">Управление</span><br>технологическим процессом',
            buttons: Buttons.KIPiA
        },
    ]

    constructor(private readonly frameMessage: FrameMessageService) {}

    ziiotClick() {
        const payload = {
            type: 'ziiot-download',
            body: {}
        }
        this.frameMessage.sendMessage(JSON.stringify(payload));
    }

    kipiaClick() {
        const payload = {
            type: 'kipia-download',
            body: {}
        }
        this.frameMessage.sendMessage(JSON.stringify(payload));
    }
}
