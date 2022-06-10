import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
    selector: 'app-product-description',
    templateUrl: './product-description.component.html',
    styleUrls: ['./product-description.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDescriptionComponent {
    @Input() description = '';
    isRussian = false;

    constructor(private router: Router) {
    }

    ngOnInit() {
        this.isRussian = !this.router.url.startsWith("/en");
    }
}
