import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-product-contacts',
    templateUrl: './product-contacts.component.html',
    styleUrls: ['./product-contacts.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductContactsComponent {
    @Input() email: string | undefined = '';
    @Input() tel: string | undefined = '';
}
