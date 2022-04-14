import {inject, InjectFlags, InjectionToken} from '@angular/core';
import {FrameMessageService} from '../services/frame-message.service';
import {IFrameDialogStrategy} from '../interfaces/iframe-dialog.interface';

export const IFRAME_DIALOG = new InjectionToken<IFrameDialogStrategy>('iframe dialog strategy', {
    providedIn: 'root',
    factory: () => {
        const frameMessage = inject(FrameMessageService, InjectFlags.Optional);
        return {
            close: () => frameMessage?.sendCloseDialog(),
        }
    }
})
