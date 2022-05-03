import {AfterViewInit, ChangeDetectionStrategy, Component} from '@angular/core';
import {PlatformService} from './core/services/platform.service';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements AfterViewInit {
    constructor(
        private readonly platform: PlatformService
    ) {}

    ngAfterViewInit() {
        this.platform.viewChange();
    }
}
