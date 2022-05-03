import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-product-form',
    templateUrl: './product-form.component.html',
    styleUrls: ['./product-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductFormComponent implements OnInit {

    constructor() {
    }

    ngOnInit(): void {
    }

}
