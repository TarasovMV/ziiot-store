import {ChangeDetectionStrategy, Component, EventEmitter, Output} from '@angular/core';
import {PlatformService} from '@core/services/platform.service';
import {Router} from "@angular/router";

@Component({
    selector: 'app-product-control',
    templateUrl: './product-control.component.html',
    styleUrls: ['./product-control.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductControlComponent {
    readonly pageSize$ = this.platformService.pageProductSize$;
    isRussian = false;

    @Output() readonly presentation = new EventEmitter();
    @Output() readonly cost = new EventEmitter();
    @Output() readonly back = new EventEmitter();

    constructor(private readonly platformService: PlatformService, private router: Router) {}

    ngOnInit() {
        this.isRussian = !this.router.url.startsWith("/en");
    }
}
