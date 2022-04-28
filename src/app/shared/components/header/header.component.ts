import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {inOutAnimation} from '../../animations/in-out.animation';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    animations: [inOutAnimation],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
    isMenu = false;

    constructor() {
    }

    ngOnInit(): void {
    }

}
