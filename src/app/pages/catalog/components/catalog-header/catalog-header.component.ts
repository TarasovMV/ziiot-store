import {ChangeDetectionStrategy, Component, EventEmitter, Output} from '@angular/core';
import {ProductType} from '../../../../core/enums';
import {inOutAnimation} from '../../../../shared/animations/in-out.animation';

@Component({
    selector: 'app-catalog-header',
    templateUrl: './catalog-header.component.html',
    styleUrls: ['./catalog-header.component.scss'],
    animations: [inOutAnimation],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CatalogHeaderComponent {
    @Output() connect = new EventEmitter<string>();
    readonly productType = ProductType;
}
