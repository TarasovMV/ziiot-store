import {ChangeDetectionStrategy, Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {IFRAME_DIALOG} from '../../../core/tokens/iframe-dialog.token';
import {IFrameDialogStrategy} from '../../../core/interfaces/iframe-dialog.interface';
import {FrameMessageService} from '../../../core/services/frame-message.service';
import {filter} from 'rxjs';

@Component({
    selector: 'app-dialog-wrapper',
    templateUrl: './dialog-wrapper.component.html',
    styleUrls: ['./dialog-wrapper.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogWrapperComponent implements OnInit {
    @Output() load = new EventEmitter();

    constructor(
        @Inject(IFRAME_DIALOG) private readonly dialogStrategy: IFrameDialogStrategy,
        private readonly frameMessage: FrameMessageService,
    ) {
    }

    public ngOnInit() {
        this.frameMessage.requestDialog();
        this.frameMessage.data$.pipe(filter((x: any) => x.type === 'dialog')).subscribe((x: any) => this.load.emit(x.data));
    }

    close() {
        this.dialogStrategy.close();
    }
}
