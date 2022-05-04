import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {DIALOG} from '../../../core/tokens';
import {Dialog} from '../../../core/interfaces/dialog.interface';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../../../core/services/api.service';
import {IFormDto} from '../../../core/interfaces/form-dto.interface';

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
        @Inject(DIALOG) private readonly dialog: Dialog<{ product: string | undefined }, any>,
        private readonly api: ApiService,
    ) {
    }

    ngOnInit() {
        console.log('dialog.data', this.dialog.data);
    }

    sendData() {
        this.isChecked = true;

        if (!this.form.valid) {
            return;
        }

        const product = this.dialog.data.product;
        const body: IFormDto = {
            type: !!product ? '2' : '1',
            description: !!product
                ? 'Форма по продукту'
                : 'Форма по каталогу',
            formData: [
                {
                    name: 'fio',
                    description: 'ФИО',
                    value: this.form.value.fio,
                },
                {
                    name: 'phone',
                    description: 'Номер телефона',
                    value: this.form.value.phone,
                },
                {
                    name: 'email',
                    description: 'Почта',
                    value: this.form.value.email,
                },
            ]
        };

        if (product) {
            body.formData.push({
                name: 'product',
                value: product,
                description: 'Продукт',
            });
        }

        this.api.sendForm(body).subscribe();
        this.dialog.close();
    }

    close() {
        this.dialog.close();
    }
}
