import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {IProductCard} from '@core/interfaces/product-card.interface';
import {ImageUrlPipe} from '@shared/pipes/image-url.pipe';

@Component({
    selector: 'app-product-card',
    templateUrl: './product-card.component.html',
    styleUrls: ['./product-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardComponent {
    @Input() product!: IProductCard;

    get link(): string {
        if (this.product.url) {
            return '/product/' + this.product.url.split('/').slice(-1)[0];
        }

        if (this.product.document) {
            return this.imageUrlPipe.transform(this.product.document);
        }

        return '';
    }

    constructor(private readonly imageUrlPipe: ImageUrlPipe) {}
}
