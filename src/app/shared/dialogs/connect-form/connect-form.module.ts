import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConnectFormComponent} from './connect-form.component';
import {NgxMaskModule} from 'ngx-mask';
import {ReactiveFormsModule} from '@angular/forms';
import {AngularSvgIconModule} from 'angular-svg-icon';


@NgModule({
    declarations: [
        ConnectFormComponent
    ],
    imports: [
        CommonModule,
        NgxMaskModule,
        ReactiveFormsModule,
        AngularSvgIconModule,
    ]
})
export class ConnectFormModule {
}
