import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';

enum Buttons {
    Default,
    ZIIoT
}

@Component({
    selector: 'app-gantt-map-thead',
    templateUrl: './gantt-map-thead.component.html',
    styleUrls: ['./gantt-map-thead.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GanttMapTheadComponent implements OnInit {
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
            buttons: Buttons.Default
        },
    ]

    constructor() {
    }

    ngOnInit(): void {
    }

}
