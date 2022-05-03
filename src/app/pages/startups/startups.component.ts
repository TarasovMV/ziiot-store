import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-startups',
    templateUrl: './startups.component.html',
    styleUrls: ['./startups.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StartupsComponent implements OnInit {

    constructor() {
    }

    ngOnInit(): void {
    }

}
