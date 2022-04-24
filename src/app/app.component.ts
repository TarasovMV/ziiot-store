import {ChangeDetectionStrategy, Component, Inject, PLATFORM_ID} from '@angular/core';
import {isPlatformServer} from "@angular/common";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
    readonly isServer = isPlatformServer(this.platformId);

    constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
}
