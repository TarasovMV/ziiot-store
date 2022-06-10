import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
    selector: 'app-product-contacts',
    templateUrl: './product-contacts.component.html',
    styleUrls: ['./product-contacts.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductContactsComponent {
    isRussian = false;
    @Input() email: string | undefined = '';
    @Input() tel: string | undefined = '';

    constructor(private router: Router) {
        this.isRussian = !this.router.url.startsWith("/en");
    }
}
