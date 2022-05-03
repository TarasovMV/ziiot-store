import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
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
        window.open('https://www.dropbox.com/s/t5337c33rb0n4f4/%D0%9F%D0%BB%D0%B0%D1%82%D1%84%D0%BE%D1%80%D0%BC%D0%B0.pdf?dl=1');
        const payload = {
            type: 'ziiot-download',
            body: {}
        }
        this.frameMessage.sendMessage(JSON.stringify(payload));
    }

    kipiaClick() {
        window.open('https://www.dropbox.com/s/jzxjcga43kvbnbx/%D0%9A%D0%B0%D1%82%D0%B0%D0%BB%D0%BE%D0%B3%20%D0%BF%D1%80%D0%BE%D0%B4%D1%83%D0%BA%D1%82%D0%BE%D0%B2.pdf?dl=1');
        const payload = {
            type: 'kipia-download',
            body: {}
        }
        this.frameMessage.sendMessage(JSON.stringify(payload));
    }
}
