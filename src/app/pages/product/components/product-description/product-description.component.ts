import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-product-description',
    templateUrl: './product-description.component.html',
    styleUrls: ['./product-description.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDescriptionComponent {
    @Input() description = '';
}
