import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-iframe',
    templateUrl: './iframe.component.html',
    styleUrls: ['./iframe.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IframeComponent implements OnInit {
    @Input() url: string = 'https://ziiotstore.ru/page27394160.html';

    constructor() {
    }

    ngOnInit(): void {
    }

}
