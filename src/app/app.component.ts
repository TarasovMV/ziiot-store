import {ChangeDetectionStrategy, Component, Inject, PLATFORM_ID} from '@angular/core';
import {isPlatformServer} from "@angular/common";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
    title = 'ziot-store';
    isServer: boolean;

    constructor(@Inject(PLATFORM_ID) private platformId: any) {
        this.isServer = isPlatformServer(platformId);
    }
}
