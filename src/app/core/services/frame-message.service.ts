import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class FrameMessageService {

    constructor() {
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
}
