import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ContactsComponent} from './contacts.component';
import {IframeModule} from '../../shared/components/iframe/iframe.module';
import {RouterModule} from '@angular/router';


@NgModule({
    declarations: [
        ContactsComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([{
            path: '',
            component: ContactsComponent,
        }]),
        IframeModule
    ]
})
export class ContactsModule {
}
