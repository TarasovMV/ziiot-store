import {Injectable} from '@angular/core';
import {BehaviorSubject, fromEvent} from 'rxjs';


const MOBILE_BREAKPOINT = 850;
const TAB_BREAKPOINT = 1150;

@Injectable({
    providedIn: 'root'
})
export class PlatformService {
    readonly isMobile$ = new BehaviorSubject<boolean>(this.isMobile);
    readonly isTab$ = new BehaviorSubject<boolean>(this.isTab);
    private readonly windowResize$ = fromEvent(window, 'resize');

    constructor() {
        this.windowResize$.subscribe(x => {
            this.isMobile$.next(this.isMobile);
            this.isTab$.next(this.isTab);
        });
    }

    private get isMobile(): boolean {
        return document.body.getBoundingClientRect()?.width < MOBILE_BREAKPOINT;
    }

    private get isTab(): boolean {
        return document.body.getBoundingClientRect()?.width < TAB_BREAKPOINT;
    }
}
