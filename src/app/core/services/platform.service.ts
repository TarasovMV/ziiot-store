import {Injectable} from '@angular/core';
import {BehaviorSubject, fromEvent} from 'rxjs';


type PageProductSize = 'l' | 's' | 'm';

const PAGE_PRODUCT_L = 1920;
const PAGE_PRODUCT_M = 1160;
const PAGE_PRODUCT_S = 610;

const MOBILE_BREAKPOINT = 850;
const TAB_BREAKPOINT = 1150;

@Injectable({
    providedIn: 'root'
})
export class PlatformService {
    readonly pageProductSize$ = new BehaviorSubject<PageProductSize>(this.pageProductSize);
    readonly isMobile$ = new BehaviorSubject<boolean>(this.isMobile);
    readonly isTab$ = new BehaviorSubject<boolean>(this.isTab);
    private readonly windowResize$ = fromEvent(window, 'resize');

    constructor() {
        this.windowResize$.subscribe(() => this.viewChange());
    }

    viewChange() {
        this.isMobile$.next(this.isMobile);
        this.isTab$.next(this.isTab);
        this.pageProductSize$.next(this.pageProductSize);
        document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
        document.documentElement.style.setProperty('--page-h', `${document.getElementById('page-wrapper')?.getBoundingClientRect().height ?? 0}px`);
    }

    private get isMobile(): boolean {
        return document.body.getBoundingClientRect()?.width < MOBILE_BREAKPOINT;
    }

    private get isTab(): boolean {
        return document.body.getBoundingClientRect()?.width < TAB_BREAKPOINT;
    }

    private get pageProductSize(): PageProductSize {
        const width = document.body.getBoundingClientRect()?.width;

        if (width < PAGE_PRODUCT_M) {
            if (width < PAGE_PRODUCT_S) {
                return 's';
            }
            return 'm';
        }
        return 'l';
    }
}
