import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PartnersComponent} from './partners.component';
import {IframeModule} from '@shared/components/iframe/iframe.module';
import {RouterModule} from '@angular/router';


@NgModule({
    declarations: [
        PartnersComponent
    ],
    imports: [
        CommonModule,
        IframeModule,
        RouterModule.forChild([{
            path: '',
            component: PartnersComponent,
        }]),
    ]
})
export class PartnersModule {
}
