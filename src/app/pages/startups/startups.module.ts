import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StartupsComponent} from './startups.component';
import {RouterModule} from '@angular/router';
import {IframeModule} from '@shared/components/iframe/iframe.module';


@NgModule({
    declarations: [
        StartupsComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([{
            path: '',
            component: StartupsComponent,
        }]),
        IframeModule,
    ]
})
export class StartupsModule {
}
