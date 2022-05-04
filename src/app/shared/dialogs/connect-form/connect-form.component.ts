import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {DIALOG} from '../../../core/tokens';
import {Dialog} from '../../../core/interfaces/dialog.interface';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-connect-form',
    templateUrl: './connect-form.component.html',
    styleUrls: ['./connect-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConnectFormComponent implements OnInit {
    readonly form = new FormGroup({
        fio: new FormControl('', [Validators.required]),
        phone: new FormControl('7'),
        email: new FormControl(''),
        agreement: new FormControl(false, [Validators.requiredTrue])
    });

    isChecked = false;

    constructor(
        @Inject(DIALOG) private readonly dialog: Dialog<any, any>,
    ) {
    }

    ngOnInit() {
        console.log('dialog.data', this.dialog.data);
    }

    sendData() {
        this.isChecked = true;

        if (this.form.valid) {
            console.log('send');
        }
    }

    close() {
        this.dialog.close();
    }
}
