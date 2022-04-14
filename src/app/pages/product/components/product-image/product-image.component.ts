import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-product-image',
    templateUrl: './product-image.component.html',
    styleUrls: ['./product-image.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductImageComponent {
    @Input() img: string | undefined;
}
