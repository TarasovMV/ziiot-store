import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-partners',
    templateUrl: './partners.component.html',
    styleUrls: ['./partners.component.scss'],
    // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PartnersComponent implements OnInit {

    constructor() {
    }

    ngOnInit(): void {
    }

}
