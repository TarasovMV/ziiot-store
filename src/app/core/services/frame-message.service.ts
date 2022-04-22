import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FrameMessageService {
    readonly data$ = new Subject();

    constructor() {
        this.listenMessages();
    }

    requestDialog() {
        const messageObj = {
            type: 'dialog-request',
        }

        this.sendMessage(JSON.stringify(messageObj));
    }

    sendDialog<T>(url: string, data: T) {
        const messageObj = {
            type: 'dialog',
            body: {
                url, data
            }
        }

        this.sendMessage(JSON.stringify(messageObj));
    }

    sendCloseDialog() {
        const messageObj = {
            type: 'dialog-close',
        }

        this.sendMessage(JSON.stringify(messageObj));
    }

    sendHeight(height: number) {
        if (!height) {
            return;
        }

        const messageObj = {
            type: 'view',
            body: { height }
        }

        this.sendMessage(JSON.stringify(messageObj));
    }

    sendCardUrl(url: string) {
        if (!url) {
            return;
        }

        const messageObj = {
            type: 'redirect',
            body: { url }
        }

        this.sendMessage(JSON.stringify(messageObj));
    }

    sendMessage(message: string) {
        console.log('sendMessage', message)
        parent.postMessage(message, '*');
    }

    private listenMessages() {
        const eventMethod = !!window.addEventListener
            ? "addEventListener"
            : "attachEvent";
        // @ts-ignore
        const eventer = window[eventMethod];
        const messageEvent = eventMethod === "attachEvent"
            ? "onmessage"
            : "message";

        eventer(messageEvent, (e: any) => {
            try {
                if (!e?.data || e.data === 'undefined') {
                    return;
                }
                this.data$.next(JSON.parse(e.data));
            } catch {}
        });
    }
}
