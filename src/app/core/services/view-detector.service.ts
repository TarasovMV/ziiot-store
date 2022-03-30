import {Injectable} from '@angular/core';
import {debounceTime, filter, finalize, fromEvent, map, merge, Subject, tap} from 'rxjs';
import {FrameMessageService} from './frame-message.service';

@Injectable({
    providedIn: 'root'
})
export class ViewDetectorService {
    private height = 0;

    private readonly setView$ = new Subject<boolean>();
    private readonly windowResize$ = fromEvent(window, 'resize');

    constructor(private readonly frameMessage: FrameMessageService) {
        merge(this.setView$, this.windowResize$).pipe(
            debounceTime(50),
            map(() => document.body.getBoundingClientRect().height),
            filter((x) => x !== this.height),
            tap((x) => this.height = x),
        ).subscribe((height) => this.frameMessage.sendHeight(height));
    }

    setView() {
        this.setView$.next(true);
    }
}
