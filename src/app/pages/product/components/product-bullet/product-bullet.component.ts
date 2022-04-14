import {ChangeDetectionStrategy, Component, Input} from '@angular/core';


type ProductBulletStyle = 'digit' | 'bullet' | 'check';

@Component({
    selector: 'app-product-bullet',
    templateUrl: './product-bullet.component.html',
    styleUrls: ['./product-bullet.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductBulletComponent {
    @Input() name = '';
    @Input() type: ProductBulletStyle = 'bullet';
    @Input() set data(value: string) {
        this.items = value.split(`\n`).filter(x => !!x);
    }

    items: string[] = [];
}
