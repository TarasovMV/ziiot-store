import {Injectable} from '@angular/core';
import {BehaviorSubject, fromEvent} from 'rxjs';


const MOBILE_BREAKPOINT = 750;

@Injectable({
    providedIn: 'root'
})
export class PlatformService {
    readonly isMobile$ = new BehaviorSubject<boolean>(this.isMobile);
    private readonly windowResize$ = fromEvent(window, 'resize');

    constructor() {
        this.windowResize$.subscribe(x => this.isMobile$.next(this.isMobile));
    }

    private get isMobile(): boolean {
        return document.body.getBoundingClientRect()?.width < MOBILE_BREAKPOINT;
    }
}
