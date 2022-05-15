import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {IProduct} from '@core/interfaces/product.inteface';
import {PlatformService} from '@core/services/platform.service';

@Component({
    selector: 'app-product-header',
    templateUrl: './product-header.component.html',
    styleUrls: ['./product-header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductHeaderComponent {
    @Input() data: IProduct | undefined = undefined;
    readonly pageSize$ = this.platformService.pageProductSize$;

    constructor(private readonly platformService: PlatformService) {
    }
}
