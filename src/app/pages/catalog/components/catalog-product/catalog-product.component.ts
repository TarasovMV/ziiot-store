import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {IProductCard} from '@core/interfaces/product-card.interface';
import {ImageUrlPipe} from '@shared/pipes/image-url.pipe';
import {Router} from "@angular/router";

@Component({
    selector: 'app-catalog-product',
    templateUrl: './catalog-product.component.html',
    styleUrls: ['./catalog-product.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CatalogProductComponent {
    @Input() product!: IProductCard;
    isRussian = false;

    get link(): string {
        if (this.product.url) {
            if (this.isRussian) {
                return '/product/' + this.product.url.split('/').slice(-1)[0];
            }
            else {
                return '/en/product/' + this.product.url.split('/').slice(-1)[0];
            }

        }

        if (this.product.document) {
            return this.imageUrlPipe.transform(this.product.document);
        }

        return '';
    }

    constructor(private readonly imageUrlPipe: ImageUrlPipe, private router: Router) {}

    ngOnInit() {
        this.isRussian = !this.router.url.startsWith("/en");
    }
}
