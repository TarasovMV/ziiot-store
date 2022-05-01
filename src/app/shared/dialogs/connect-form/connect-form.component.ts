import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {DIALOG} from '../../../core/tokens';
import {Dialog} from '../../../core/interfaces/dialog.interface';

@Component({
    selector: 'app-connect-form',
    templateUrl: './connect-form.component.html',
    styleUrls: ['./connect-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConnectFormComponent implements OnInit {

    constructor(@Inject(DIALOG) private readonly dialog: Dialog<any, any>) {
    }

    ngOnInit() {
        console.log('dialog.data', this.dialog.data);
        setTimeout(() => this.dialog.close('hello from dialog'));
    }

}
