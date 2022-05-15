import {AfterViewInit, ChangeDetectionStrategy, Component, Inject, PLATFORM_ID} from '@angular/core';
import {PlatformService} from '@core/services/platform.service';
import {isPlatformServer} from "@angular/common";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements AfterViewInit {
    readonly isServer = isPlatformServer(this.platformId);

    constructor(
        @Inject(PLATFORM_ID) private readonly platformId: Object,
        private readonly platform: PlatformService,
    ) {}

    ngAfterViewInit() {
        this.platform.viewChange();
    }
}
