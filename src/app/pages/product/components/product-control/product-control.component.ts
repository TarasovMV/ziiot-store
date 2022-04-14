import {ChangeDetectionStrategy, Component, EventEmitter, Output} from '@angular/core';
import {PlatformService} from '../../../../core/services/platform.service';

@Component({
    selector: 'app-product-control',
    templateUrl: './product-control.component.html',
    styleUrls: ['./product-control.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductControlComponent {
    readonly pageSize$ = this.platformService.pageProductSize$;

    @Output() readonly presentation = new EventEmitter();
    @Output() readonly cost = new EventEmitter();
    @Output() readonly back = new EventEmitter();

    constructor(private readonly platformService: PlatformService) {}
}
