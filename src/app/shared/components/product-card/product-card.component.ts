import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {IProductCard} from '../../../core/interfaces/product-card.interface';

@Component({
    selector: 'app-product-card',
    templateUrl: './product-card.component.html',
    styleUrls: ['./product-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardComponent {
    @Input() product!: IProductCard;
}
